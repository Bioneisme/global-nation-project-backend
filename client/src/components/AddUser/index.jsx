import React from 'react';
import API from "../../api";
import {useForm} from "react-hook-form";
import toast from 'react-hot-toast';

function AddUser() {
    const {register, handleSubmit} = useForm();
    const onSubmit = async (data) => {
        try {
            const response = await API.post('/addUser', data)
            window.location.reload()
            toast(response.data.message)
        }
        catch (e) {
            toast(e.response.data.message)
        }
    };
    return (
        <div>
            <form method="post" onSubmit={handleSubmit(onSubmit)}>
                <label>Register new User</label>
                <input className="form-control"
                       type="email"
                       placeholder="Email"
                       {...register("email")}
                       required/>
                <br/>
                <input className="form-control"
                       type="text"
                       placeholder="Nickname"
                       {...register("nickname")}
                       required/>
                <br/>
                <input className="form-control"
                       type="text"
                       placeholder="First Name"
                       {...register("first_name")}
                       required/>
                <br/>
                <input className="form-control"
                       type="text"
                       placeholder="Last Name"
                       {...register("last_name")}
                       required/>
                <br/>
                <input className="form-control"
                       type="password"
                       placeholder="Password"
                       {...register("password")}
                       autoComplete="on"
                       required/>
                <br/>
                <button className="btn btn-outline-dark col-12" type="submit">Create</button>
            </form>
        </div>
    );
}

export default AddUser;