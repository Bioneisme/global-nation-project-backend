import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {userSelector, clearState, loginUser} from '../../store/slices/userSlice';
import toast from 'react-hot-toast';
import {useForm} from 'react-hook-form';


function Login() {
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const {isSuccess, isError, errorMessage} = useSelector(
        userSelector
    );
    const onSubmit = (data) => {
        dispatch(loginUser(data));
    };

    useEffect(() => {
        if (isError) {
            toast.error(errorMessage);
            dispatch(clearState());
        }

        if (isSuccess) {
            dispatch(clearState())
            window.location.href = "/profile"
        }
    }, [isError, isSuccess]);

    return (
        <div className="container-fluid">
            <h1 className="display-6 text-center">Login Here</h1>
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
                           type="password"
                           placeholder="Password"
                           {...register("password")}
                           autoComplete="on"
                           required/>
                    <br/>
                    <button className="btn btn-outline-dark col-12" type="submit"> Log In</button>
                    <br/>
                    <a href="#" style={{textDecoration: "none"}}>Forgot Password?</a>
                </form>
            </div>
        </div>
    );
}

export default Login;