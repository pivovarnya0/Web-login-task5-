import { useEffect, useState } from "react";


function Users() {

    const [users, setUsers] = useState([]);
    const [selected, setSelected] = useState([]);
    const [message, setMessage] = useState("");


    const getUsers = () => {

        fetch("http://localhost:3000/users")
            .then(res => res.json())
            .then(data => {

                data.sort(
                    (a, b) =>
                        new Date(b.last_login || 0) -
                        new Date(a.last_login || 0)
                );

                setUsers(data);

            });

    };


    useEffect(() => {

        getUsers();

    }, []);




    const selectUser = (id) => {

        if (selected.includes(id)) {

            setSelected(
                selected.filter(item => item !== id)
            );

        } else {

            setSelected([
                ...selected,
                id
            ]);

        }

    };




    const selectAll = () => {

        if (selected.length === users.length) {

            setSelected([]);

        } else {

            setSelected(
                users.map(user => user.id)
            );

        }

    };





    const blockUsers = () => {

        fetch("http://localhost:3000/block", {

            method: "PATCH",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                ids: selected
            })

        })

        .then(res => res.json())

        .then(data => {

            setMessage(data.message);

            setSelected([]);

            getUsers();

        });

    };





    const unblockUsers = () => {

        fetch("http://localhost:3000/unblock", {

            method: "PATCH",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                ids: selected
            })

        })

        .then(res => res.json())

        .then(data => {

            setMessage(data.message);

            setSelected([]);

            getUsers();

        });

    };





    const deleteUsers = () => {

        fetch("http://localhost:3000/users", {

            method: "DELETE",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                ids: selected
            })

        })

        .then(res => res.json())

        .then(data => {

            setMessage(data.message);

            setSelected([]);

            getUsers();

        });

    };





    return (

        <div>

            <h1>
                User List
            </h1>


            <p>
                {message}
            </p>



            <div>

                <button сlassName="btn btn-danger">
                    Block
                </button>


                <button сlassName="btn btn-success">
                    Unblock
                </button>


                <button сlassName="btn btn-dark">
                    Delete
                </button>

            </div>



            <br />


            <table className="table table-striped table-bordered">

                <thead>

                    <tr>

                        <th>

                            <input
                                type="checkbox"
                                checked={
                                    selected.length === users.length &&
                                    users.length > 0
                                }
                                onChange={selectAll}
                            />

                        </th>


                        <th>Name</th>

                        <th>Email</th>

                        <th>Status</th>

                        <th>Last Login</th>


                    </tr>


                </thead>



                <tbody>


                    {
                        users.map(user => (

                            <tr key={user.id}>


                                <td>

                                    <input

                                        type="checkbox"

                                        checked={
                                            selected.includes(user.id)
                                        }

                                        onChange={() => selectUser(user.id)}

                                    />

                                </td>



                                <td>
                                    {user.name}
                                </td>


                                <td>
                                    {user.email}
                                </td>


                                <td>
                                    {user.status}
                                </td>


                                <td>
                                    {String(user.last_login)}
                                </td>


                            </tr>

                        ))
                    }


                </tbody>


            </table>


        </div>

    );


}


export default Users;