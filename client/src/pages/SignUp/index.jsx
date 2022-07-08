import React, {useEffect} from 'react';
import {clearState, userSelector, registerUser} from "../../store/slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";

function SignUp() {
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const {isSuccess, isError, errorMessage} = useSelector(
        userSelector
    );
    const onSubmit = (data) => {
        dispatch(registerUser(data));
    };

    useEffect(() => {
        if (isError) {
            toast.error(errorMessage);
            dispatch(clearState());
        }

        if (isSuccess) {
            dispatch(clearState())
            window.location.href = "/"
        }
    }, [isError, isSuccess]);


    return (
        <div className="container-fluid">
            <h1 className="display-6 text-center">Sign Up Here</h1>
            <div className="justify-content-center d-flex">
                <form className="login_form col-3"
                      onSubmit={handleSubmit(onSubmit)}
                      method="POST">
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
                    <button className="btn btn-outline-dark col-12" type="submit"> Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;