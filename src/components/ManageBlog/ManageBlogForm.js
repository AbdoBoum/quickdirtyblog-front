import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Interweave from 'interweave';
import {Link} from "react-router-dom";

import "../BlogList/style.css";

class ManageBlogForm extends React.Component {

    modules = {
        toolbar: [
            [{header: [1, 2, false]}],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                {list: "ordered"},
                {list: "bullet"},
                {indent: "-1"},
                {indent: "+1"}
            ],
            ["link", "image"],
            [{align: []}],
            ["clean"]
        ]
    };

    formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "align"
    ];

    render() {
        return (
            <div className="m-5 row">
                <div className="col-md-6">
                    <form onSubmit={this.props.saveToDB}
                          className="text-center border border-light mx-auto">

                        <input type="text" className="form-control mb-3" id="blogTitle"
                               placeholder="Blog title"
                               onChange={e => this.props.handleBlogChange("title", e.target.value)}
                               value={this.props.blog.title}/>

                        <ReactQuill
                            theme="snow"
                            defaultValue={this.props.oldEditorContent}
                            value={this.props.blog.content}
                            onChange={this.props.handleChange}
                            modules={this.modules}
                            formats={this.formats}
                        />
                        <input type="text" className="form-control my-3" id="tags"
                               placeholder="Enter tags separated by a comma : ','" aria-describedby="tagsHelp"
                               onChange={e => this.props.handleBlogChange("tags", e.target.value)}
                               value={this.props.blog.tags}/>

                        <div className="form-group">
                            <button className="btn btn-success" type="submit">
                                Publish
                            </button>
                            <button className="btn btn-secondary ml-2" tag={Link} to="/blogs">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-md-6 border border-secondary preview">
                    <h1>{this.props.blog.title}</h1>
                    <Interweave content={this.props.blog.content}/>
                </div>
            </div>
        );
    }
}

export default ManageBlogForm;
