import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {userSelector} from "./store/slices/userSlice";


export const PrivateRoute = ({children}) => {
    const {isAuth} = useSelector(userSelector)

    return isAuth ? children : <Navigate to="/login"/>;
};

export const AdminRoute = ({children}) => {
    const {isAuth, currentUser} = useSelector(userSelector)
    if (!isAuth) return <Navigate to="/login"/>

    const userRoles = currentUser.roles
    let isAdmin = false
    userRoles.forEach(role => {
        if ('ADMIN'.includes(role)) {
            isAdmin = true
        }
    })

    return isAdmin ? children : <Navigate to="/profile"/>;
};