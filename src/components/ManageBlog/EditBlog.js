import React from "react";
import "react-quill/dist/quill.snow.css";
import {instanceOf} from 'prop-types';
import {Cookies, withCookies} from 'react-cookie';

import "../BlogList/style.css";
import ManageBlogForm from "./ManageBlogForm";
import {withRouter} from "react-router-dom";

class EditBlog extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    oldBlog = {
        title: "",
        date: "",
        content: "",
        tags: "",
        author: "",
        draft: true
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            blog: this.oldBlog,
            csrfToken: cookies.get('XSRF-TOKEN')
        };
        this.handleChange = this.handleChange.bind(this);
        this.saveToDB = this.saveToDB.bind(this);
    }

    async componentDidMount() {
        try {
            const blog = await (await fetch(`http://localhost:8080/api/blog/${this.props.match.params.id}`,
                {credentials: 'include'})).json();
            this.setState({blog});
        } catch (e) {
            this.props.history.push('/');
        }

    }

    handleChange(value, delta, source, editor) {
        let blog = {...this.state.blog};
        blog["content"] = value;
        blog["date"] = this.getDate();
        this.setState({blog});
    }

    saveDraft = async event => {
        event.preventDefault();
        const {blog, csrfToken} = this.state;
        await fetch(`http://localhost:8080/api/blog/${this.props.match.params.id}`, {
            method: 'PUT',
            headers: {
                'X-XSRF-TOKEN': csrfToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(blog),
            credentials: 'include'
        }).then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));

        this.props.history.push("/blogs");

    };

    saveToDB = async event => {
        event.preventDefault();
        let blog = {...this.state.blog};
        blog["draft"] = false;
        this.setState({blog});
        const {csrfToken} = this.state;

        await fetch(`http://localhost:8080/api/blog/${this.props.match.params.id}`, {
            method: 'PUT',
            headers: {
                'X-XSRF-TOKEN': csrfToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blog),
            credentials: 'include'
        });
        this.props.history.push("/blogs");
    };


    handleBlogChange = (event) => {
        let blog = {...this.state.blog};
        blog[event.target.name] = event.target.value;
        this.setState({blog});
    };

    cancelSubmit = () => {
        this.props.history.push("/blogs")
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
            <ManageBlogForm blog={this.state.blog} handleChange={this.handleChange}
                            handleBlogChange={this.handleBlogChange}
                            cancel={this.cancelSubmit}
                            saveToDB={this.saveToDB}
                            draft={this.saveDraft}/>
        );
    }
}

export default withCookies(withRouter(EditBlog));
