import React, {useState} from 'react';
import Users from '../../components/UsersList'
import DeleteUser from '../../components/DeleteUser'
import AddUser from '../../components/AddUser'
import EditUser from '../../components/EditUserInput'
import {Link} from "react-router-dom";

function Admin() {
    const [users, setUsers] = useState([])
    const [deleteUser, setDeleteUser] = useState(null)
    const [addUser, setAddUser] = useState(null)
    const [editUser, setEditUser] = useState(null)

    const showUsers = () => {
        setUsers(users => [<Users/>]);
    }
    const showDeleteUser = () => {
        setDeleteUser(deleteUser => <DeleteUser/>)
    }
    const showAddUser = () => {
        setAddUser(addUser => <AddUser/>)
    }
    const showEditUser = () => {
        setEditUser(editUser => <EditUser/>)
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <button className="btn btn-danger my-1">User Management</button>
                    <br/>
                    | <button className="btn btn-outline-danger my-1" onClick={showUsers}>All
                    Users</button> <br/>
                    | <button className="btn btn-outline-danger my-1" onClick={showAddUser}>Add User</button> <br/>
                    | <button className="btn btn-outline-danger my-1" onClick={showEditUser}>Edit User</button> <br/>
                    | <button className="btn btn-outline-danger my-1" onClick={showDeleteUser}>Delete User</button>
                    <br/>

                    <button className="btn btn-danger my-1">Project Management</button>
                    <br/>
                    | <Link to='/new_course'>
                    <button className="btn btn-outline-danger my-1">Create Course</button>
                </Link> <br/>
                </div>
                <div className="col-9">
                    <div>
                        {users.map((item, i) => (
                            <div key={i}>{item}</div>
                        ))}
                    </div>
                    <div>
                        {addUser}
                    </div>
                    <div>
                        {editUser}
                    </div>
                    <div>
                        {deleteUser}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;