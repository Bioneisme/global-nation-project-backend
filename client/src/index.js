import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux"
import {Toaster} from 'react-hot-toast';
import store from "./store"
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'
import {PrivateRoute, AdminRoute} from './routes'

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login"
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile"
import CourseCreate from "./pages/CourseCreate";
import CourseEditor from "./pages/CourseEditor";

import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

const persist = persistStore(store);

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path='/admin' element={<AdminRoute><Admin/></AdminRoute>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/registration' element={<SignUp/>}/>
                    <Route path='/new_course' element={<PrivateRoute><CourseCreate/></PrivateRoute>}/>
                    <Route path='/edit_course/:id' element={<PrivateRoute><CourseEditor/></PrivateRoute>}/>
                    <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>}/>
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