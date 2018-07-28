import React from "react";
import { User } from "./user.jsx";


export class UserList extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="usersList">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr className="table-primary">
                            <th scope="col">#</th>
                            <th scope="col">Имя</th>
                            <th scope="col">Статус</th>
                            <th scope="col">Последний вход</th>
                            <th scope="col" className="right">Удалить</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.USER.fetching ?
                                <b>Loading ...</b> :

                                this.props.USER.users.map((user, index) => {
                                    return <User
                                        removeUser={this.props.USER.removeUser}
                                        key={user.id}
                                        id={user.id}
                                        index={index + 1}
                                        username={user.username}
                                        status={user.status}
                                        last_login={user.last_login}
                                    />;
                                })
                        }
                    </tbody>
                </table>
            </div>
        );
    };
};