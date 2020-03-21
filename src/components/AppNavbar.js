import React from 'react';
import {Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import { Link } from 'react-router-dom';

class AppNavbar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {

        const login = !this.props.isAuthenticated ?
            <Button onClick={this.props.login}>
                login
            </Button>
            :
            <Button onClick={this.props.logout}>
                Logout
            </Button>;


        return <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">QuickDirtyBlog</NavbarBrand>
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    {login}
                </Nav>
            </Collapse>
        </Navbar>;
    }
}

export default AppNavbar;
