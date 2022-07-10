import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {userSelector} from "../../store/slices/userSlice";

import "./profile.css"
import API from "../../api";
import {toast} from "react-hot-toast";

function Profile() {
    const {currentUser} = useSelector(userSelector)
    const [courses, setCourses] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await API.get('/getUserCourses')
                setCourses(response.data)
            } catch (e) {
                toast(e.response.data.message)
            }
        }

        fetchData().then()
    }, [])

    return (
        <div className="container-fluid">
            <div className="row mx-3">
                <div className="col-4 border border-2">
                    <h4>Profile</h4>
                    <br/>
                    <p className="fields">
                        Email: {currentUser.email}
                    </p>
                    <hr/>
                    <p className="fields">
                        Nickname: {currentUser.nickname}
                    </p>
                    <hr/>
                    <p className="fields">
                        First Name: {currentUser.first_name}
                    </p>
                    <hr/>
                    <p className="fields">
                        Last Name: {currentUser.last_name}
                    </p>
                    <br/>
                </div>
                <div className="col-1" />
                <div className="col-3 border border-2">
                    <h4>My Courses</h4>
                    <br/>
                    <div>
                        {courses.map(function (course) {
                            return (
                                <div>
                                    <a className="lead"
                                       style={{textDecoration: "none"}}
                                       href={'edit_course/' + course._id}
                                    >
                                        {course.title}
                                    </a>
                                    <hr/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;