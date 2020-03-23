import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';

import AdminHome from "./AdminHome";
import BlogDetail from "./BlogDetail/BlogDetail";
import BlogsList from "./BlogList/BlogsList";
import AddBlog from "./ManageBlog/AddBlog";
import EditBlog from "./ManageBlog/EditBlog";
import AppNavbar from "./AppNavbar";
import Footer from "./utils/Footer";
import NotFoundPage from "./utils/NotFoundPage";

class App extends Component {

    render() {
        return (
            <CookiesProvider>
                <Router>
                    <React.Fragment>
                        <AppNavbar/>
                        <Switch>
                            <Route exact path='/' component={BlogsList}/>
                            <Route exact path='/admin' component={AdminHome}/>
                            <Route exact path='/admin/blogs' component={BlogsList}/>
                            <Route exact path='/admin/blog/new' component={AddBlog}/>
                            <Route exact path='/admin/blog/edit/:id'  component={EditBlog}/>
                            <Route exact path="/blog/:id" component={BlogDetail}/>
                            <Route path="*" component={NotFoundPage} />
                        </Switch>
                    </React.Fragment>
                </Router>
                <Footer/>
            </CookiesProvider>
        );
    }
}

export default App;
