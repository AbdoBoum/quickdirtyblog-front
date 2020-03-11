import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import BlogList from "./BlogList/BlogList";
import Home from "./Home";
import AddBlog from "./AddBlog";
import BlogDetail from "./BlogDetail/BlogDetail";

class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/blogs' exact={true} component={BlogList}/>
                    <Route path='/blogs/new' exact={true} component={AddBlog}/>
                    <Route exact path="/blogs/:id" component={BlogDetail}/>
                </Switch>
            </Router>
        );
    }
}

export default App;
