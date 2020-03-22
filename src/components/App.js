import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';

import Home from "./Home";
import BlogDetail from "./BlogDetail/BlogDetail";
import BlogsList from "./BlogList/BlogsList";
import AddBlog from "./ManageBlog/AddBlog";
import EditBlog from "./ManageBlog/EditBlog";
import AppNavbar from "./AppNavbar";
import Footer from "./utils/Footer";

class App extends Component {

    render() {
        return (
            <CookiesProvider>
                <Router>
                    <React.Fragment>
                        <AppNavbar/>
                        <Switch>
                            <Route path='/' exact={true} component={Home}/>
                            <Route path='/blogs' exact={true} component={BlogsList}/>
                            <Route path='/blog/new' exact={true} component={AddBlog}/>
                            <Route path='/blog/edit/:id' exact={true} component={EditBlog}/>
                            <Route exact path="/blog/:id" component={BlogDetail}/>
                        </Switch>
                    </React.Fragment>
                </Router>
                <Footer/>
            </CookiesProvider>
        );
    }
}

export default App;
