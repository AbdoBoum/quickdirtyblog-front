import React from 'react';
import "./style.css";
import Interweave from 'interweave';
import {Link} from "react-router-dom";

class BlogDetail extends React.Component {

    defaultBlog = {
        title: "",
        detail: ""
    } ;

    state = {blog: this.defaultBlog}
    componentDidMount() {
        const blogId = this.props.match.params.id;
        fetch(`http://localhost:8080/api/blog/${blogId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.defaultBlog["title"] = data.title;
                this.defaultBlog["detail"] = data.content;
                this.setState({blog: this.defaultBlog})
            });
    }

    render() {
        return (
            <div className="container pt-5">
                <div className="row pb-4 head">
                    <div className="col-3">
                        <Link to={`/blogs`} className="m-2">
                            <i className="fas fa-arrow-left"/>
                        </Link>
                    </div>
                    <div className="col-9 text-right">
                        <span className="brand">QuickDirtyBlog</span>
                    </div>
                </div>
                <div className="content">
                    <Interweave content={this.state.blog.detail} />
                </div>
                <div className="px-5 py-4 text-center text-muted footer">
                    Made with passion by
                    <a href="https://www.linkedin.com/in/assalielmehdi/">El Mehdi ASSALI</a>
                    and
                    <a href="https://www.linkedin.com/in/abdo-boumahdi/"
                    >Abderrahim Boumahdi</a
                    >
                </div>
            </div>
        );
    }
}

export default BlogDetail;
