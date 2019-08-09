import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // console.log("this.state", this.state);
    }

    async upload(e) {
        console.log(e.target.files[0]);
        try {
            const file = e.target.files[0];
            var formData = new FormData();

            formData.append("file", file);
            // this.setState({ file: formData });

            const { data } = await axios.post("/upload", formData);
            console.log("data:", data);
            this.props.setImg(data);
            // this.setState({ image: data });
        } catch (err) {
            console.log("err in POST /upload", err);
        }
    }

    render() {
        return (
            <div className="uploader-container">
            <div className="uploader">
                <h4
                    className="closeUploader"
                    onClick={() => this.props.closeUploader()}
                >
                    X
                </h4>
                <h3 className="uploader-text">Change your profile picture?</h3>
                <input className="uploader-input"
                    name="file"
                    type="file"
                    accept="image/*"
                    onChange={e => this.upload(e)}
                />
                </div>
            </div>
        );
    }
}

// create a form, make Multer stuff, S3 stuff and formData
//
// here we make axios post to add image,
//
// insert image url
//
//
//
// 1. make ajax req with formData thing.
// when we select image, we won't need to click any button..
// as soon as image is chosen - just start upload
//
// make post with RETURNING url
//
// now uoploader need to give this information to the proifle pic: in appear    <Uploader done={image => this.setState({ image })} />
//
// after image is uploaded - we want uploader to automaticcly close
// and we close uploader with X too

//when we click on profile pic, that is a part of App, need to make uploader visible
//we make sure when iuploader is open - we can't click on anything, but X to close
