const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db");
const bc = require("./utils/bc");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const moment = require("moment");
const axios = require("axios");
//----------------------socket.io--------------------------------
//this has to happen after const app = express() line
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    origins: "localhost:8080 192.168.50.*:*"
});

//-------------has to be above the routes, handling file uploads
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3");
const config = require("./config");
const configUdemy = require("./configUdemy");

//-------- multer saves the file to uploads directory -------//

app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(compression());

//----------------------- cookies ----------------------------------
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always hungry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

//---multer saves the file to uploads directory ----//
//filename function tells multer to use as the file name the unique id generated by the call to uidSafe with the extension of the original file name appended to it//

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

//----------------------------------------------
app.post("/welcome", async (req, res) => {
    const { first, last, email, password, role } = req.body;
    try {
        let hash = await bc.hashPassword(password);
        let result = await db.newUser(first, last, email, hash, role);

        req.session.userId = result.rows[0].id;
        req.session.role = result.rows[0].role;
        console.log("cookie id", req.session.userId);
        console.log("cookie role", req.session.role);
        res.json({ success: true });
    } catch (err) {
        console.log("err in POST /welcome", err);
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        let result = await db.getPassword(email);
        console.log("result is:", result.rows[0]);
        if (result.rows.length == 0) {
            throw new Error("email is not registered");
        }
        let didMatch = await bc.checkPassword(
            password,
            result.rows[0].password
        );
        // console.log("didMatch", didMatch);
        req.session.userId = result.rows[0].id;
        req.session.role = result.rows[0].role;
        res.json({ didMatch });
    } catch (err) {
        console.log("err in POST /login", err);
        res.json({ didMatch: false });
    }
});

//----------------------logout--------------------------------
app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

//---------------------- career path -----------------------

app.get(`/career/:path.json`, async (req, res) => {
    try {
        let result = await db.getTeacher(req.params.path);
        // console.log("result is", result);
        res.json(result.rows);
    } catch (err) {
        console.log("err in GET career/:path", err);
    }
});

//--------------------------------------------------------------
app.get("/user", async (req, res) => {
    try {
        let result = await db.getUserInfo(req.session.userId);
        res.json(result.rows[0]);
    } catch (err) {
        console.log("err in GET /user", err);
    }
});
//--------------------------------------------------------------

app.post("/choice", async (req, res) => {
    if (req.body.expertise) {
        try {
            let result = await db.insertTeachersChoice(
                req.session.userId,
                req.body.expertise
            );
            console.log("result", result.rows);
            res.json(result.rows[0]);
        } catch (err) {
            console.log("err in GET /choice", err);
        }
    }
});

//--------------------------------------------------------
//single indicates that we are only expecting one file. The string passed to single is the name of the field in the request.

app.post("/upload", uploader.single("file"), s3.upload, async (req, res) => {
    // console.log("req.file: ", req.file);
    const url = config.s3Url + req.file.filename;
    try {
        const result = await db.insertImage(url, req.session.userId);
        res.json(result.rows[0].image);
    } catch (err) {
        console.log("err in POST /upload", err);
    }
});
///------------------adding bio to database------------------
app.post("/bio", async (req, res) => {
    try {
        const result = await db.addBio(req.session.userId, req.body.draftBio);
        res.json(result.rows[0].bio);
    } catch (err) {
        console.log("err in POST /bio", err);
    }
});

///------------------adding bio to database------------------
app.post("/offer", async (req, res) => {
    // console.log("BODY", req.body.draftOffer);
    try {
        const result = await db.addOffer(
            req.session.userId,
            req.body.draftOffer
        );
        res.json(result.rows[0].offer);
    } catch (err) {
        console.log("err in POST /offer", err);
    }
});

//------------------getting other user ------------------
app.get("/user/:id.json", async (req, res) => {
    try {
        if (req.params.id == req.session.userId) {
            throw new Error("same user");
        }
        const result = await db.getUserInfo(req.params.id);
        if (result.rows.length == 0) {
            res.json({
                noUser: true
            });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.log("err in get /user/id", err);
        res.json({
            sameUser: true
        });
    }
});

//------------------getting last 3 users --------------------

app.get("/users.json", async (req, res) => {
    try {
        const result = await db.latestUsers();
        // console.log(result.rows);
        res.json(result.rows);
    } catch (err) {
        console.log("err in GET /users", err);
    }
});

//------------------searching users --------------------

app.get("/search/:val.json", async (req, res) => {
    try {
        const result = await db.searchUser(req.params.val);
        // console.log(result.rows);
        res.json(result.rows);
    } catch (err) {
        console.log("err in GET /users", err);
        res.json({
            noResults: true
        });
    }
});

app.post(`/favorites/:teacherId`, async (req, res) => {
    try {
        let result = await db.addFavoriteTeacher(
            req.session.userId,
            req.params.teacherId
        );
        res.json({ button: "Remove from favorites" });
    } catch (err) {
        console.log("err in POST /favorites", err);
    }
});

//------------------------------- UDEMY API --------------------------

app.get("/courses/:course", function(req, res) {
    console.log("BODY", req.params.course);
    var url;
    if (req.params.course == "code") {
        url = `https://www.udemy.com/api-2.0/courses/?search=web%20development&price=price-free&instructional_level=beginner&ordering=highest-rated
    `;
    } else if (req.params.course == "design") {
        url = `https://www.udemy.com/api-2.0/courses/?search=web%20design&price=price-free&instructional_level=beginner&ordering=highest-rated
    `;
    } else if (req.params.course == "datascience") {
        url = `https://www.udemy.com/api-2.0/courses/?search=data%20science&price=price-free&instructional_level=beginner&ordering=highest-rated
    `;
    } else if (req.params.course == "marketing") {
        url = `https://www.udemy.com/api-2.0/courses/?search=digital%20marketing&price=price-free&instructional_level=beginner&ordering=highest-rated
`;
    } else if (req.params.course == "smm") {
        url = `https://www.udemy.com/api-2.0/courses/?search=social%20media%20management&price=price-free&instructional_level=beginner&ordering=highest-rated
`;
    } else if (req.params.course == "product") {
        url = `https://www.udemy.com/api-2.0/courses/?search=product%20management&price=price-free&instructional_level=beginner&ordering=highest-rated
`;
    }

    axios
        .get(url, configUdemy)
        .then(({ data }) => {
            // console.log("data from udemy", data);
            res.json(data.results);
        })
        .catch(err => {
            console.log("err in POST /favorites", err);
        });
});

//------------------------- adding course to favorites ---------------------
app.post("/fav-course", async (req, res) => {
    try {
        let result = await db.addFavCourse(
            req.session.userId,
            req.body.id,
            req.body.title,
            req.body.image_480x270,
            "https://www.udemy.com" + req.body.url
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.log("err in post /fav-course", err);
    }
});

//------------------ render favorite courses to profile --------------------

app.get("/get-fav-courses", async (req, res) => {
    try {
        let result = await db.getAllFavCourses(req.session.userId);
        res.json(result.rows);
    } catch (err) {
        console.log("err in post /get-fav-courses", err);
    }
});

//------------------ remove course from favorites -------------------

app.post("/delete-course", async (req, res) => {
    try {
        let result = await db.removeFromFav(
            req.session.userId,
            req.body.image_id
        );
        res.json({ deletedId: req.body.image_id });
    } catch (err) {
        console.log("err in post /delete-course", err);
    }
});

app.post("/friendship/:othProfId", async (req, res) => {
    try {
        if (req.body.button == "Add friend") {
            const result = await db.sendFriendRequest(
                req.session.userId,
                req.params.othProfId
            );
            // console.log("accepted", result.rows);
            res.json({ buttonText: "Cancel friend request" });
        } else if (req.body.button == "Accept friend request") {
            const results = await db.acceptFriendRequest(
                req.params.othProfId,
                req.session.userId
            );
            res.json({ buttonText: "Unfriend" });
        } else if (
            req.body.button == "Unfriend" ||
            req.body.button == "Cancel friend request"
        ) {
            const results = await db.deleteFriend(
                req.params.othProfId,
                req.session.userId
            );
            res.json({ buttonText: "Add friend" });
        }
    } catch (err) {
        console.log("err in GET /frienship", err);
    }
});

//---------------- Getting all friends------------------------
app.get("/friends.json", async (req, res) => {
    try {
        const friends = await db.getFriendsList(req.session.userId);
        // console.log("friends", friends);
        res.json(friends.rows);
    } catch (err) {
        console.log("err in GET /friends", err);
    }
});

///-------------- Do not delete this!!! ---------------------
//this route has to be after all get routes.
app.get("*", function(req, res) {
    if (!req.session.userId && req.url != "/welcome") {
        res.redirect("/welcome");
    } else if (req.session.userId && req.url == "/welcome") {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

server.listen(8080, function() {
    console.log("I'm listening");
});

//----------------- socket.io / chat --------------------------------
let usersConnectedNow = [];
//we pass to this function an object represents a connection between me and client
io.on("connection", async socket => {
    console.log(`A socket with the id ${socket.id} just connected.`);

    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    //here we're grabbing their userId
    let userId = socket.request.session.userId;

    const newUserConnected = {
        userid: userId,
        [userId]: socket.id
    };

    usersConnectedNow.push(newUserConnected);

    console.log("connected users:", usersConnectedNow);

    //--------------------- last private messages -------------------------
    //
    socket.on("get last private messages", async id => {
        const data = await db.lastPrivateMessages(id.receiver_id, userId);
        // console.log("last private messages", data.rows);

        io.emit("privateMessages", data.rows);
    });

    //--------------------- private messages -------------------------

    socket.on("private message", async (msg, id) => {
        console.log(
            `private message to ${id.receiver_id} from ${userId} is: ${msg}`
        );

        const privateMessage = await db.addPrivateMessage(
            msg,
            userId,
            id.receiver_id
        );
        const sender = await db.getUserInfo(userId);

        const dataForPm = { ...privateMessage.rows[0], ...sender.rows[0] };

        const newUserConnected = {
            userid: userId,
            [userId]: socket.id
        };

        let receiverId = usersConnectedNow.filter(
            i => i.userid == id.receiver_id
        );

        let senderId = usersConnectedNow.filter(i => i.userid == userId);

        // console.log("data for pm", dataForPm);

        receiverId.forEach(i =>
            io.to(i[id.receiver_id]).emit("newPrivateMessage", dataForPm)
        );

        senderId.forEach(i =>
            io.to(i[userId]).emit("newPrivateMessage", dataForPm)
        );
    });

    socket.on("disconnect", () => {
        console.log(`A socket with the id ${socket.id} just disconnected.`);
        const socketDisconnected = socket.id;
        // console.log("socketToRemove:", socketDisconnected);
        usersConnectedNow = usersConnectedNow.filter(
            i => i[userId] !== socketDisconnected
        );

        console.log("new users that are connected", usersConnectedNow);
    });
});
