import React from 'react'
import '../../css/routes/signup.css'
import { withRouter } from "react-router-dom";


class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {
                "email": null,
                "password": null,
            }
        };
    }

    render() {
        return (
            <div className="signup">
                <div className="body">
                    <h1>조인 어스</h1>
                    <div className="input-box">
                        <input type="text" placeholder="email"/>
                        <input type="text" placeholder="password"/>
                        <input type="text" placeholder="repeat password"/>
                    </div>
                    <button onClick={this.props.testChangeComponent}>회원가입</button>
                </div>
            </div>
        );
    }
}

export default withRouter(Signup);