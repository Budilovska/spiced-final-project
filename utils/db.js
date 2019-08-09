var spicedPg = require("spiced-pg");
var db;

if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    db = spicedPg("postgres:postgres:postgres@localhost:5432/socialnetwork");
}

exports.newUser = function(first, last, email, password) {
    return db.query(
        "INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id",
        [first, last, email, password]
    );
};

exports.getPassword = function(email) {
    return db.query("SELECT password, id FROM users WHERE users.email=$1", [
        email
    ]);
};

exports.getUserInfo = function(id) {
    return db.query("SELECT * FROM users WHERE users.id=$1", [id]);
};

exports.insertImage = function(url, id) {
    return db.query(
        "UPDATE users SET image=$1 WHERE users.id=$2 RETURNING image",
        [url, id]
    );
};

exports.addBio = function(id, bio) {
    return db.query("UPDATE users SET bio=$2 WHERE users.id=$1 RETURNING bio", [
        id,
        bio
    ]);
};

exports.latestUsers = function() {
    return db.query("SELECT * FROM users ORDER BY id DESC LIMIT 3");
};

exports.searchUser = function(val) {
    return db.query("SELECT * FROM users WHERE first ILIKE $1", [val + "%"]);
};

exports.checkFriendship = function(sender_id, receiver_id) {
    return db.query(
        "SELECT * FROM friendships WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1);",
        [sender_id, receiver_id]
    );
};

exports.sendFriendRequest = function(sender_id, receiver_id) {
    return db.query(
        "INSERT INTO friendships (sender_id, receiver_id) VALUES ($1, $2) RETURNING *",
        [sender_id, receiver_id]
    );
};

exports.acceptFriendRequest = function(sender_id, receiver_id) {
    return db.query(
        "UPDATE friendships SET accepted = true WHERE sender_id = $1 AND receiver_id = $2 RETURNING *",
        [sender_id, receiver_id]
    );
};

exports.deleteFriend = function(sender_id, receiver_id) {
    return db.query(
        "DELETE FROM friendships WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1);",
        [sender_id, receiver_id]
    );
};

exports.getFriendsList = function(id) {
    return db.query(
        "SELECT users.id, first, last, image, accepted FROM friendships JOIN users ON (accepted = false AND receiver_id = $1 AND sender_id = users.id) OR (accepted = true AND receiver_id = $1 AND sender_id = users.id) OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)",
        [id]
    );
};

exports.addMessage = function(message, sender_id) {
    return db.query(
        "INSERT INTO chats (message, sender_id) VALUES ($1, $2) RETURNING *",
        [message, sender_id]
    );
};

exports.lastTenMessages = function() {
    return db.query(
        "SELECT chats.id, sender_id, chats.message, chats.created_at, users.first, users.last, users.image FROM chats LEFT JOIN users ON users.id = chats.sender_id ORDER BY chats.id DESC LIMIT 10"
    );
};

exports.addPrivateMessage = function(message, sender, receiver) {
    return db.query(
        "INSERT INTO private (message, sender_id, receiver_id) VALUES ($1, $2, $3) RETURNING *",
        [message, sender, receiver]
    );
};

exports.lastPrivateMessages = function(receiver_id, sender_id) {
    return db.query(
        "SELECT private.id, sender_id, receiver_id, private.message, private.created_at, users.first, users.last, users.image FROM private LEFT JOIN users ON users.id = private.sender_id WHERE (sender_id = $2 AND receiver_id = $1) OR (sender_id = $1 AND receiver_id = $2) ORDER BY private.id DESC LIMIT 10",
        [receiver_id, sender_id]
    );
};
