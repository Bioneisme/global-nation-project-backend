import React, {useState} from 'react';
import API from "../../api";
import {useForm} from "react-hook-form";
import toast from 'react-hot-toast';
import EditUser from "../EditUser";

function EditUserInput() {
    const {register, handleSubmit} = useForm();
    const [editUser, setEditUser] = useState(null)

    const showEditUser = (data) => {
        setEditUser(editUser => <EditUser>{data}</EditUser>)
    }
    const onSubmit = async (data) => {
        try {
            const response = await API.get('/getUser/' + data.email)
            showEditUser(response)
        }
        catch (e) {
            toast(e.response.data.message)
        }
    };
    return (
        <div>
            <form method="post" onSubmit={handleSubmit(onSubmit)}>
                <label>Edit User by Email</label>
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
            <div>
                {editUser}
            </div>
        </div>
    );
}

export default EditUserInput;