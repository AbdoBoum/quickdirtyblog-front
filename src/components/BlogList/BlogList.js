import React from 'react';
import BlogCard from './BlogCard'
import AppNavbar from '../AppNavbar';

import {Link} from 'react-router-dom';
import { Button } from 'reactstrap';


class BlogList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {blogList: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('http://localhost:8080/api/blogs')
            .then(response => response.json())
            .then(data => this.setState({blogList: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`http://localhost:8080/api/group/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedGroups = [...this.state.blogList].filter(blog => blog.id !== id);
            this.setState({blogList: updatedGroups});
        });
    }

    render() {
        const {blogList, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const groupList = blogList.map(blog => {
            return <BlogCard blog={blog} key={blog.id}/>
        });

        return (
            <div>
                <AppNavbar />
                <div className="m-5 add-blog">
                    <Button color="success" tag={Link} to="/blogs/new">New Blog</Button>
                </div>

                 <div class="container p-5">
                    {groupList}
                </div>
            </div>
        );
    }
}

export default BlogList;
