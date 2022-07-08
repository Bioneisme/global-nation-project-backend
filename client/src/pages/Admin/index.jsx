import React, {useState, useRef} from 'react';
import Users from '../../components/UsersList'

function Admin() {
    const [users, setUsers] = useState([])
    let btnUsers = useRef();

    const showUsers = () => {
        btnUsers.current.setAttribute("disabled", "disabled");
        setUsers(users => [...users, <Users/>]);
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <button className="btn btn-danger my-1">User Management</button>
                    <br/>
                    | <button ref={btnUsers} className="btn btn-outline-danger my-1" onClick={showUsers}>All
                    Users</button> <br/>
                    | <button className="btn btn-outline-danger my-1">Add User</button> <br/>
                    | <button className="btn btn-outline-danger my-1">Delete User</button> <br/>
                </div>
                <div className="col-6">
                    {users.map((item, i) => (
                        <div key={i}>{item}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Admin;