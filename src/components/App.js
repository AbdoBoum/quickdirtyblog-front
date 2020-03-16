import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from "./Home";
import BlogDetail from "./BlogDetail/BlogDetail";
import BlogsList from "./BlogList/BlogsList";
import AddBlog from "./ManageBlog/AddBlog";
import EditBlog from "./ManageBlog/EditBlog";

class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/blogs' exact={true} component={BlogsList}/>
                    <Route path='/blog/new' exact={true} component={AddBlog}/>
                    <Route path='/blog/edit/:id' exact={true} component={EditBlog}/>
                    <Route exact path="/blog/:id" component={BlogDetail}/>
                </Switch>
            </Router>
        );
    }
}

export default App;
