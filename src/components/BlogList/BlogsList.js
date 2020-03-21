import React from 'react';
import Pagination from "react-js-pagination";
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

import BlogCardAdmin from './BlogCardAdmin'
import AppNavbar from '../AppNavbar';


class BlogsList extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            blogList: [],
            csrfToken: cookies.get('XSRF-TOKEN'),
            isLoading: true,
            activePage: 1,
            totalPages: null,
            itemsCountPerPage: null,
            totalItemsCount: null
        };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.fetchURL(this.state.activePage -  1);
    }

    async fetchURL(page) {
        this.setState({isLoading: true});
        this.setState({activePage: page + 1});
        await fetch(`http://localhost:8080/api/blogs?page=${page}&size=5`, {credentials: 'include'})
            .then(response => response.json())
            .then(data => {

                    const totalPages = data.totalPages;
                    const itemsCountPerPage = data.size;
                    const totalItemsCount = data.totalElements;
                    const results = data.content;
                    this.setState({
                        totalPages: totalPages,
                        totalItemsCount: totalItemsCount,
                        itemsCountPerPage: itemsCountPerPage,
                        blogList: results, isLoading: false
                    });

                }
            ).catch(() => this.props.history.push('/'));
    }

    async remove(id) {
        await fetch(`http://localhost:8080/api/blog/${id}`, {
            method: 'DELETE',
            headers: {
                'X-XSRF-TOKEN': this.state.csrfToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(() => {
            let updatedGroups = [...this.state.blogList].filter(blog => blog.id !== id);
            this.setState({blogList: updatedGroups});
        });
    }

     handlePageChange = pageNumber => {
        console.log(`active page is ${this.state.activePage}`);
        this.fetchURL(pageNumber - 1);
    };


    render() {
        const {blogList, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const groupList = blogList.map(blog => {
            return <BlogCardAdmin key={blog.id} blog={blog}/>
        });

        return (
            <div>
                <AppNavbar isAuthenticated={true}/>
                <div className="m-5 add-blog">
                    <Button color="success" tag={Link} to="/blog/new">New Blog</Button>
                </div>

                <div className="container p-5">
                    {groupList}
                </div>

                <div className="d-flex justify-content-center">
                    <Pagination
                        hideNavigation
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={5}
                        itemClass='page-item'
                        linkClass='btn btn-light'
                        onChange={this.handlePageChange}
                    />
                </div>

            </div>
        );
    }
}

export default withCookies(BlogsList);
