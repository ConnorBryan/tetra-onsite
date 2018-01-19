import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { registerUser } from "src/services/UserService";
import { withTetraAuth } from 'src/utils/Auth';
import { setTheme } from 'src/utils/Theme';
import { formatPhoneNumber } from "src/utils/PhoneUtil";
import "./styles.scss";

const ensureMultipleNames = fullName => {
    if (!fullName.split(' ').length >= 2) {
        throw Error();
    }
}

class RegistrationPage extends Component {
    state = {
        fullName: "",
        email: "",
        password: "",
        phone: "",
        activeField: null
    };

    setFullName = ({ target: { value: fullName } }) => this.setState({ fullName });
    setEmail = ({ target: { value: email } }) => this.setState({ email });
    setPassword = ({ target: { value: password } }) => this.setState({ password });
    setPhone = ({ target: { value: phone } }) => this.setState({ phone: formatPhoneNumber(phone) });

    setActive = activeField => this.setState({ activeField });

    register = async e => {
        try {
            e.preventDefault();

            const { history, tetraAuth: { update } } = this.props;
            const { fullName, email, password, phone } = this.state;
            
            ensureMultipleNames(fullName);

            const [firstName, lastName] = fullName.split(' ');
            const { token } = await registerUser({
                firstName,
                lastName,
                email,
                password,
                phone
            });

            update(token);

            history.push("/verify");
        } catch (e) {   
            console.error(e)
        }
    };

    render() {
        const { fullName, email, password, phone, activeField } = this.state;
        console.log(this.props.history)
        return <form onSubmit={this.register}>
            <div>
                <fieldset>
                    <input type="text" placeholder="Full name" value={fullName} onFocus={() => this.setActive("fullName")} onChange={this.setFullName} />
                    {activeField === "fullName" && (
                        <div className="clearButton" onClick={() => this.setState({ fullName: "" })}>
                            x
                        </div>
                    )}
                </fieldset>
                <fieldset>
                    <input type="email" placeholder="Email" value={email} onFocus={() => this.setActive("email")} onChange={this.setEmail} />
                    {activeField === "email" && (
                        <div className="clearButton" onClick={() => this.setState({ email: "" })}>
                            x
                        </div>
                    )}
                </fieldset>
                <fieldset>
                    <input type="password" placeholder="Password" value={password} onFocus={() => this.setActive("password")} onChange={this.setPassword} />
                    {activeField === "password" && (
                        <div className="clearButton" onClick={() => this.setState({ password: "" })}>
                            x
                        </div>
                    )}
                </fieldset>
                <fieldset>
                    <input type="text" placeholder="Phone" value={phone} onFocus={() => this.setActive("phone")} onChange={this.setPhone} />
                    {activeField === "phone" && (
                        <div className="clearButton" onClick={() => this.setState({ phone: "" })}>
                            x
                        </div>
                    )}
                    <label>
                        We will send a verification code to this number
                    </label>
                </fieldset>
                <fieldset>
                    <button type="submit">
                        Sign Up
                    </button>
                </fieldset>
            </div>
        </form>
    }
}

export default compose(
    withTetraAuth(),
    withRouter,
    setTheme('white')
)(RegistrationPage);