import React from 'react';
import toast from 'react-hot-toast';
import {useForm} from 'react-hook-form';

import "./coursecreate.css"
import API from "../../api";

function CourseCreate() {
    const {register, handleSubmit} = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await API.post('/createCourse', data)
            window.location.href = '/edit_course/' + response.data.id
            toast(response.data.message)
        } catch (e) {
            toast(e.response.data.message)
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="justify-content-center d-flex my-4">
                    <div className="col-9">
                        <fieldset className="p-2">
                            <h4>Course Description</h4>
                            <div className="formik col-5">
                                <form method="post"
                                      onSubmit={handleSubmit(onSubmit)}
                                >
                                    <label>Category</label>
                                    <input type="text"
                                           placeholder="Information Technologies"
                                           className="form-control"
                                           {...register("category")}
                                    />

                                    <label>Title</label>
                                    <input type="text"
                                           placeholder="AMSdN3234"
                                           className="form-control"
                                           required
                                           {...register("title")}
                                    />

                                    <label>Difficulty</label>
                                    <input type="text"
                                           placeholder="Medium"
                                           className="form-control"
                                           {...register("difficulty")}
                                    />

                                    <label>Language</label>
                                    <input type="text"
                                           placeholder="English"
                                           className="form-control"
                                           {...register("language")}
                                    />

                                    <label>Cost (USD)</label>
                                    <input type="number"
                                           placeholder="10$"
                                           className="form-control"
                                           {...register("cost")}
                                    />

                                    <label>What course teaches?</label>
                                    <textarea placeholder="Description"
                                              className="form-control"
                                              {...register("teaches")}
                                    />

                                    <label>Course requirements</label>
                                    <textarea placeholder="Description"
                                              className="form-control"
                                              {...register("requirements")}
                                    />

                                    <label>Shortly description</label>
                                    <textarea placeholder="Description"
                                              className="form-control"
                                              {...register("shortly")}
                                    />

                                    <label>Course Status</label>
                                    <input type="text"
                                           placeholder="Private"
                                           className="form-control"
                                           {...register("status")}
                                    />

                                    <button type="submit" className="btn btn-primary">Continue</button>
                                </form>
                            </div>
                            <br/><br/>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseCreate;