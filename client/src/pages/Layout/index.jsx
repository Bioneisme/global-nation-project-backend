import React, {useEffect, useState} from "react";
import Index from "../../components/Navbar";
import {Outlet} from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux';
import {userSelector, getUser} from '../../store/slices/userSlice';

const Layout = () => {
    const {currentUser} = useSelector(userSelector)
    const [email, setEmail] = useState(null)

    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser) {
            setEmail(currentUser.email);
        }
        dispatch(getUser())
    }, [currentUser]);

    return (
        <>
            <Index
                email={email}
            />
            <Outlet/>
        </>
    );
};

export default Layout;