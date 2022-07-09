import React from 'react';
import API from "../../api";
import {useForm} from "react-hook-form";
import toast from 'react-hot-toast';

function DeleteUser() {
    const {register, handleSubmit} = useForm();
    const onSubmit = async (data) => {
        try {
            const response = await API.post('/deleteUser', data)
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
                <label>Delete User by Email</label>
                <input className="form-control"
                       type="email"
                       placeholder="Email"
                       {...register("email")}
                       required
                /> <br/>
                <input className="btn btn-danger"
                       type="submit"
                />
            </form>
        </div>
    );
}

export default DeleteUser;