import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Interweave from 'interweave';

import "./BlogList/style.css";

class AddBlog extends React.Component {

    emptyBlog = {
        title: "",
        date: "",
        content: "",
        tags: "",
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
                attributes: {
                    header: 1,
                    bold: true
                },
                insert: "This is a Title\n"
            },
            {
                attributes: {
                    header: 2,
                    bold: true
                },
                insert: "This is a subtitle\n"
            },
            {
                attributes: {align: "justify"},
                insert: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n" +
                    "\n  "
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
        this.setState({oldEditorContent: this.defaultContent});
        //}
        console.log(this.state.oldEditorContent);
    }

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

    handleChange(value, delta, source, editor) {
        let blog = {...this.state.blog};
        blog["title"] = "New Blog";
        blog["content"] = value;
        blog["date"] = this.getDate();
        this.setState({blog});
        console.log(editor.getContents());
    }

    saveToDB = async event => {

        await fetch('http://localhost:8080/api/blog', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.blog),
        });

        //event.preventDefault();
        console.log(JSON.stringify(this.state.blog));
        this.props.history.push("/");
    };

    getDate = () => {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        return today.toString();
    };


    handleBlogChange = (property, value) => {
        let blog = {...this.state.blog};
        blog[property] = value;
        this.setState({blog});
    };

    render() {
        return (
            <div className="m-5 row">
                <div className="col-md-6">
                    <form onSubmit={this.saveToDB}
                          className="text-center border border-light mx-auto">

                        <input type="text" className="form-control mb-3" id="blogTitle"
                               placeholder="Blog title"
                               onChange={e => this.handleBlogChange("title", e.target.value)}/>

                        <ReactQuill
                            theme="snow"
                            defaultValue={this.state.oldEditorContent}
                            //value={this.state.content}
                            onChange={this.handleChange}
                            modules={this.modules}
                            formats={this.formats}
                        />
                            <input type="text" className="form-control my-3" id="tags"
                                   placeholder="Enter tags separated by a comma : ','" aria-describedby="tagsHelp"
                                   onChange={e => this.handleBlogChange("tags", e.target.value)}/>

                        <button className="btn btn-success" type="submit">
                            Publish
                        </button>
                    </form>
                </div>
                <div className="col-md-6 border border-secondary preview">
                    <Interweave content={this.state.blog.content}/>
                </div>
            </div>
        );
    }
}

export default AddBlog;
