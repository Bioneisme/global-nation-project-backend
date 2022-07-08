import React from 'react';
import {useSelector} from "react-redux";
import {userSelector} from "../../store/slices/userSlice";

import "../../styles/profile.css"

function Profile() {
    const {currentUser} = useSelector(userSelector)

    return (
        <div className="container-fluid">
            <h1 className="display-6 mx-3">Profile</h1>
            <div className="row mx-3">
                <div className="col-4 border border-2">
                    <br />
                    <p className="fields">
                        Email: {currentUser.email}
                    </p>
                    <hr />
                    <p className="fields">
                        Nickname: {currentUser.nickname}
                    </p>
                    <hr />
                    <p className="fields">
                        First Name: {currentUser.first_name}
                    </p>
                    <hr />
                    <p className="fields">
                        Last Name: {currentUser.last_name}
                    </p>
                    <br />
                </div>
            </div>
        </div>
    );
}

export default Profile;