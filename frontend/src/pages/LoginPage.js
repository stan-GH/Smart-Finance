import React from 'react';
import '../styles/loginpage.css';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
    }

    componentDidMount() {
        document.getElementById('submit-btn').addEventListener('click', function(event) {
            event.preventDefault();
        });
        
        if(this.props.currUser != null) {
            document.getElementById('login-link').innerHTML = 'Logout';
        } else {
            document.getElementById('login-link').innerHTML = 'Login';
        }
        
        document.getElementById('submit-btn').onclick = () => {
            let userNameVal = document.getElementById('user');
            let passwordVal = document.getElementById('pass');
            let staySignedInVal = document.getElementById('confirm-box');
            let isInfoCorrectVal = document.getElementById('validate-box');
            
            //Makes a GET request to get user data
            let options = {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            let user = null;
            fetch('http://localhost:3001/login/' + userNameVal.value, options).then(res => res.json()).then(userData => {
                if (userData.success === true) {    
                    user = userData.userInfo;
                    this.validateUserInput(user, passwordVal, isInfoCorrectVal);
                } else {
                    document.getElementById('cred-invalid').className = 'warning-on';
                }
            });
        };
    }

    validateUserInput(user, passwordVal, isInfoCorrectVal) {
        if(user != null && user.password === passwordVal.value && isInfoCorrectVal.checked) {
            this.props.changeUser(user);
            document.getElementById('user-link-hidden').innerHTML = user.name;
            document.getElementById('user-link-hidden').id = 'user-link';
            document.getElementById('login-link').innerHTML = 'Logout';
            document.getElementById('login-link').onclick = () => function() {
                this.props.changeUser({currUser: null});
            }
            this.props.frontPg();
        } else if (!isInfoCorrectVal.checked && user != null && user.password === passwordVal.value) {
            document.getElementById('cred-invalid-2').className = 'warning-on';
            document.getElementById('cred-invalid').className = 'warning-off';
        } else if (isInfoCorrectVal.checked && !(user != null && user.password === passwordVal.value)) {
            document.getElementById('cred-invalid-2').className = 'warning-off';
            document.getElementById('cred-invalid').className = 'warning-on';
        } else {
            document.getElementById('cred-invalid-2').className = 'warning-on';
            document.getElementById('cred-invalid').className = 'warning-on';
        }
    }

    render() {
        return(
            <div id="login-pg">
                <h1> Login </h1>
                <h4 id="cred-invalid" className="warning-off"> Invalid Login or Password </h4> <br />
                <h4 id="cred-invalid-2" className="warning-off"> Please confirm information is correct by clicking the appropriate check box</h4> 
                
                <div id="parent-container">
                    <form>
                        <div id="user-input-lbl"> 
                            <label htmlFor="user"> Username </label>
                        </div>
                        <div id="user-input-fd">
                            <input type="text" id="user" name="user" className="user-input" />
                        </div>
                        <div id="pass-input-lbl">
                            <label htmlFor="pass"> Password </label>
                        </div>
                        <div id="pass-input-fd">
                            <input type="password" id="pass" name="pass" className="user-input" />
                        </div>
                        <div id="confirm-input-container">
                            <label htmlFor="confirm" id="confirm-input-lbl"> Stay signed in? </label>
                            <input type="checkbox" id="confirm-box" />
                            <label htmlFor="validate" id="validate-input-lbl"> Is this information correct? </label> 
                            <input type="checkbox" id="validate-box" />
                        </div>
                        <input type="submit" id="submit-btn" />
                    </form>

                    <div id="register-container"> 
                        <h3> Don't have an account? </h3>
                        <button name="register-btn" type="button" onClick={this.props.registerPg}> Register </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;