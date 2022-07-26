import React, {useEffect, useState} from 'react';
import API from "../../api";
import {useParams} from "react-router-dom";
import {toast} from "react-hot-toast";
import CreateLesson from "../../components/CreateLesson";

function CourseEditor() {
    const {id} = useParams()
    const [course, setCourse] = useState()
    const [lesson, setLesson] = useState(null)

    const showLesson = () => {
        setLesson(lesson => [<CreateLesson/>]);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await API.get('/getCourseToEdit/' + id)
                setCourse(response.data)
            } catch (e) {
                toast(e.response.data.message)
            }
        }

        fetchData().then()
    }, [])

    if (!course) return "Loading..."

    return (
        <div className="container-fluid">
            <h1 className="display-6 mx-3">Course</h1>
            <div className="row mx-3">
                <div className="col-4 border border-2">
                    <br/>
                    <p className="fields">
                        Title: {course.title}
                    </p>
                    <hr/>
                    <p className="fields">
                        Author: {course.author.email}
                    </p>
                    <hr/>
                    <p className="fields">
                        Category: {course.category}
                    </p>
                    <hr/>
                    <p className="fields">
                        Difficulty: {course.difficulty}
                    </p>
                    <hr/>
                    <p className="fields">
                        Language: {course.language}
                    </p>
                    <hr/>
                    <p className="fields">
                        Cost: {course.cost}
                    </p>
                    <hr/>
                    <p className="fields">
                        Teaches: {course.teaches}
                    </p>
                    <hr/>
                    <p className="fields">
                        Requirements: {course.requirements}
                    </p>
                    <hr/>
                    <p className="fields">
                        Shortly: {course.shortly}
                    </p>
                    <hr/>
                    <p className="fields">
                        Status: {course.status}
                    </p>
                </div>
                <div className="col-7 border border-2 mx-4">
                    <div className="justify-content-center d-flex">
                        <h3>Lessons</h3>
                    </div>
                    <hr/>
                    <button className="btn btn-outline-danger" onClick={showLesson}>Add new Lesson</button>
                    <div>
                        {lesson}
                    </div>
                </div>
            </div>
            <br/>
        </div>
    );
}

export default CourseEditor;