import React from "react";


export class AddPanel extends React.Component {
    constructor(props) {
        super(props);

        this.addUser = this.addUser.bind(this);
    };

    addUser() {
        this.props.addUser({
            username: this.refs.username.value,
            password: this.refs.password.value
        });
        this.refs.username.value = "";
        this.refs.password.value = "";
    };

    render() {
        return (
            <div className="d-flex flex-row usersList">

                <div className="input-group col-5">
                    <div class="input-group-prepend">
                        <span className="input-group-text" itemID="login-input">Username</span>
                    </div>
                    <input ref="username" itemType="text" className="form-control" placeholder="Имя пользователя"
                        aria-label="Username" aria-describedby="login-input" />
                </div>

                <div className="input-group col-5">
                    <div class="input-group-prepend">
                        <span className="input-group-text" itemID="password-input">Password</span>
                    </div>
                    <input ref="password" itemType="text" className="form-control" placeholder="Пароль"
                        aria-label="Password" aria-describedby="password-input" />
                </div>

                <div className="input-group col-2 justify-content-center">
                    <button type="button" className="btn btn-primary" onClick={this.addUser}>Добавить</button>
                </div>
            </div>
        );
    };
};