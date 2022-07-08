import ReactDOM from "react-dom/client";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Provider, useSelector} from "react-redux"
import {userSelector} from "./store/slices/userSlice";
import {Toaster} from 'react-hot-toast';
import store from "./store"
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login"
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile"

import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

const persist = persistStore(store);

const PrivateRoute = ({auth: {isAuthenticated}, children}) => {
    return isAuthenticated ? children : <Navigate to="/login"/>;
};

export default function App() {
    const {isAuth} = useSelector(userSelector)
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path='/admin' element={<Admin/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/registration' element={<SignUp/>}/>
                    <Route path='/profile' element={<PrivateRoute auth={{ isAuthenticated: isAuth }}><Profile/></PrivateRoute>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persist}>
            <App/>
            <Toaster/>
        </PersistGate>
    </Provider>
)