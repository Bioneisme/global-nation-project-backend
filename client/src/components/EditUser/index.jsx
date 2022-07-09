import React, {useEffect} from 'react';
import API from "../../api";
import {useForm} from "react-hook-form";
import toast from 'react-hot-toast';

function UpdateUser(data) {
    const {register, handleSubmit, setValue} = useForm();
    const onSubmit = async (data) => {
        try {
            const response = await API.post('/updateUser', data)
            window.location.reload()
            toast(response.data.message)
        } catch (e) {
            toast(e.response.data.message)
        }
    };

    useEffect(() => {
        const user = data.children.data
        setValue("id", user._id)
        setValue("email", user.email)
        setValue("nickname", user.nickname)
        setValue("first_name", user.first_name)
        setValue("last_name", user.last_name)
        setValue("roles", user.roles)
    }, [])

    return (
        <div>
            <form method="post" onSubmit={handleSubmit(onSubmit)}>
                <label>Update User</label>
                <input className="form-control"
                       type="text"
                       placeholder="ID"
                       {...register("id")}
                       disabled/>
                <br/>
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
                       type="text"
                       placeholder="Roles"
                       {...register("roles")}
                       required/>
                <br/>
                <button className="btn btn-outline-dark col-12" type="submit">Update</button>
            </form>
        </div>
    );
}

export default UpdateUser;