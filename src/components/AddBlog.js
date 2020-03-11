import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
//import { Link } from "react-router-dom";

class AddBlog extends React.Component {

    emptyBlog = {
        title: "",
        date: "",
        content: "",
        author: "Abderrahim BOUMAHDI"
    };

    constructor(props) {
        super(props);
        this.state = {
            blog: this.emptyBlog,
            oldEditorContent: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.saveToDB = this.saveToDB.bind(this);
    }

    defaultContent = {
        ops: [
            {
                insert: "The blog title "
            },
            {
                attributes: {
                    header: 1
                },
                insert: "default "
            },
            {
                attributes: {
                    bold: true
                },
                insert: "state"
            },
            {
                insert: "\nYou can write "
            },
            {
                attributes: {
                    bold: true
                },
                insert: "anything "
            },
            {
                insert: "with "
            },
            {
                attributes: {
                    strike: true
                },
                insert: "different "
            },
            {
                insert: "styling and "
            },
            {
                attributes: {
                    italic: true
                },
                insert: "all"
            },
            {
                insert: "."
            },
            {
                attributes: {
                    header: 1
                },
                insert: "\n"
            },
            {
                insert: "\nTry it for yourself !"
            },
            {
                attributes: {
                    align: "center"
                },
                insert: "\n"
            }
        ]
    };

    componentWillMount() {
/*
        if (typeof this.props.location.state != "undefined") {
            console.log("updating");
            this.setState({
                id: this.props.match.params.id,
                oldEditorContent: JSON.parse(this.props.location.state.oldEditorContent)
            });
        } else {
            console.log("creating");
*/
            this.setState({ oldEditorContent: this.defaultContent });
        //}
        console.log(this.state.oldEditorContent);
    }

    modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" }
            ],
            ["link", "image"],
            [{ align: [] }],
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

    handleChange(value, delta, source, editor) {
        let blog = {...this.state.blog};
        blog["title"] = "New Blog";
        blog["content"] = value;
        blog["date"] = this.getDate();
        this.setState({ blog });
        //console.log(editor.getContents());
    }

    saveToDB = async () => {
        await fetch('http://localhost:8080/api/blog', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.blog),
        });
        console.log(JSON.stringify(this.state.blog));
        //this.props.history.push("/");
    };

    getDate = () => {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        return today.toString();
    };

    render() {
        return (
            <React.Fragment>
                <ReactQuill
                    theme="snow"
                    defaultValue={this.state.oldEditorContent}
                    //value={this.state.content}
                    onChange={this.handleChange}
                    modules={this.modules}
                    formats={this.formats}
                />

                <button className="btn btn-success m-2" onClick={this.saveToDB}>
                    Publish
                </button>
            </React.Fragment>
        );
    }
}

export default AddBlog;
