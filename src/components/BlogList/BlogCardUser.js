import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

class BlogCard extends React.Component {

    render() {
        const {blog} = this.props;
        const tags = blog.tags ? blog.tags.split(",") : [];

        return(
            <div className={`card pt-3 pl-3 mb-3 ${blog.draft ? 'border border-danger': ''}`}>
                <div className="row">
                    <div className="col" id="main">
                        <div className="media listing-box">
                            <div className="media-body">
                                <h4 className="mt-0">
                                    <Link to={`/blog/${blog.id}`} className="m-2">
                                        {blog.title}
                                    </Link>
                                </h4>
                                <div className="post-meta">
                                    <div className="post-meta m-2">
                                        By {blog.author.name} |
                                        <time dateTime="2020-02-05T18:18:59+08:00"
                                        >{blog.date}</time
                                        >
                                        <div className="tags mr-2">
                                            {tags.map(tag => {
                                                return <span className="badge badge-pill badge-light">{tag.trim()}</span>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default BlogCard;
