import React from "react";
import "react-quill/dist/quill.snow.css";

import "../BlogList/style.css";
import ManageBlogForm from "./ManageBlogForm";

class AddBlog extends React.Component {

    emptyBlog = {
        title: "",
        date: "",
        content: "<h2><strong>This is a title</strong></h2><p class=\"ql-align-justify\">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><p class=\"ql-align-justify\"><br></p>",
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


    handleChange(value, delta, source, editor) {
        let blog = {...this.state.blog};
        blog["title"] = "New Blog";
        blog["content"] = value;
        blog["date"] = this.getDate();
        this.setState({blog});
        console.log(editor.getContents());
    }

    saveToDB = async event => {
        event.preventDefault();
        await fetch('http://localhost:8080/api/blog', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.blog),
        });
        console.log(JSON.stringify(this.state.blog));
        this.props.history.push("/blogs");
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
            <ManageBlogForm handleChange={this.handleChange}
                            handleBlogChange={this.handleBlogChange}
                            blog={this.state.blog} saveToDB={this.saveToDB}/>
        );
    }

}

export default AddBlog;
