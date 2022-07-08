import React, {useEffect, useState} from 'react';
import API from "../../api";

function List() {
    const [list, setList] = useState([])
    useEffect(() => {
        async function fetchData() {
            const response = await API.get('/getUsers')
            console.log(response.data)
            setList(response.data)
        }

        fetchData().then()
    }, [])

    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nickname</th>
                    <th scope="col">Email</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">isActivated</th>
                    <th scope="col">Roles</th>
                </tr>
                </thead>
                <tbody>
                {list.map(function (d, idx) {
                    return (
                        <tr>
                            <th scope="row">{idx}</th>
                            <td>{d.nickname}</td>
                            <td>{d.email}</td>
                            <td>{d.first_name}</td>
                            <td>{d.last_name}</td>
                            <td>{d.isActivated ? "✔" : "➖"}</td>
                            <td>{d.roles}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}

export default List;