import React from "react";
import "react-quill/dist/quill.snow.css";

import "../BlogList/style.css";
import ManageBlogForm from "./ManageBlogForm";

class EditBlog extends React.Component {


    oldBlog = {
        title: "",
        date: "",
        content: "",
        tags: "",
        author: "Abderrahim BOUMAHDI"
    };

    constructor(props) {
        super(props);
        this.state = {
            blog: this.oldBlog
        };
        this.handleChange = this.handleChange.bind(this);
        this.saveToDB = this.saveToDB.bind(this);
    }

    async componentWillMount() {
        const blog = await (await fetch(`http://localhost:8080/api/blog/${this.props.match.params.id}`)).json();
        this.setState({blog});
    }

    handleChange(value, delta, source, editor) {
        let blog = {...this.state.blog};
        blog["content"] = value;
        blog["date"] = this.getDate();
        this.setState({blog});
    }

    saveToDB = async event => {
        event.preventDefault();
        await fetch(`http://localhost:8080/api/blog/${this.props.match.params.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
            },

            body: JSON.stringify(this.state.blog),
        }).then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));

        this.props.history.push("/blogs");
    };

    handleBlogChange = (property, value) => {
        let blog = {...this.state.blog};
        blog[property] = value;
        this.setState({blog});
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
            <ManageBlogForm blog={this.state.blog} handleChange={this.handleChange} handleBlogChange={this.handleBlogChange}
                            saveToDB={this.saveToDB}/>
        );
    }
}

export default EditBlog;
