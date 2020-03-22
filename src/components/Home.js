import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withCookies} from "react-cookie";
import "./style.css";

class Home extends Component {

    state = {
        isAuthenticated: false,
        author: undefined
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state.csrfToken = cookies.get('XSRF-TOKEN');
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
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

    render() {
        const message = this.state.author ?
            <h2 className="mb-4 text-center">Welcome, {this.state.author.name}!</h2> :
            <h2 className="mb-4 text-center">Please login.</h2>;

        const button = this.state.isAuthenticated ?
            <div className="btn btn-outline-dark btn-lg" color="link"><Link to="/blogs">Manage Blog List</Link></div>
            :
            <div/>;

        return (
            <div className="view">
                <div className="mask rgba-black-light d-flex justify-content-center align-items-center">
                    <div className="text-center white-text mx-5 wow fadeIn">
                    {message}
                    {button}
                    </div>
                </div>
            </div>

        );
    }
}

export default withCookies(Home);
