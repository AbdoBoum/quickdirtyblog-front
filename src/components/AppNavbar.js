import React from 'react';
import {Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler} from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';
import {withCookies} from "react-cookie";

class AppNavbar extends React.Component {

    state = {
        isOpen: false,
        isLoading: true,
        isAuthenticated: false,
        author: undefined
    };


    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state.csrfToken = cookies.get('XSRF-TOKEN');
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8080/api/user', {credentials: 'include'});
        const body = await response.text();
        if (body === '') {
            this.setState(({isAuthenticated: false}))
        } else {
            this.setState({isAuthenticated: true, author: JSON.parse(body)})
        }
    }

    login() {
        let port = (window.location.port ? ':' + window.location.port : '');
        if (port === ':3000') {
            port = ':8080';
        }
        window.location.href = '//' + window.location.hostname + port + '/private';
    }

    logout() {
        fetch('http://localhost:8080/api/logout', {
            method: 'POST', credentials: 'include',
            headers: {'X-XSRF-TOKEN': this.state.csrfToken}
        }).then(res => res.json())
            .then(response => {
                window.location.href = response.logoutUrl + "?id_token_hint=" +
                    response.idToken + "&post_logout_redirect_uri=" + window.location.origin;
            });
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    render() {

        const login = !this.state.isAuthenticated ?
            <Button onClick={this.login}>
                login
            </Button>
            :
            <Button onClick={this.logout}>
                Logout
            </Button>;


        return <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link}
                         to={this.props.location.pathname.includes("/admin") ? '/admin' : '/'}>QuickDirtyBlog</NavbarBrand>
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    {this.props.location.pathname.includes("/admin") ? login : ''}
                </Nav>
            </Collapse>
        </Navbar>;
    }
}

export default withCookies(withRouter(AppNavbar));
