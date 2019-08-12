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
                    <h3 className="uploader-text">
                        Change your profile picture?
                    </h3>
                    <input
                        className="uploader-input"
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
