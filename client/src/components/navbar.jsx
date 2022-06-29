import React from "react";
import "./navbar.css"
// Stateless Functional Component

const NavBar = ({email}) => {
    return (
        <nav className="navbar navbar-light">
            <div className="navbar-brand">
                <a href="#">
                <span className="mx-3">
                Log In
                </span>
                </a>
                <a href="http://localhost:5000/api/google" className="google mx-3">
                    <i className="fa fa-google-plus m-2" aria-hidden="true"/>
                    Google
                </a>
                <a href="http://localhost:5000/api/facebook">
                <span className="mx-3">
                    <i className="fa fa-facebook m-2" aria-hidden="true"/>
                    Facebook
                </span>
                </a>
            </div>
            <div className="navbar-brand">
                <div>
                    <i className="fa fa-user-circle fa-lg m-2" aria-hidden="true"/>
                    {email}
                    <a href="http://localhost:5000/api/logout">
                        <i className="mx-2 fa fa-remove"/>
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;