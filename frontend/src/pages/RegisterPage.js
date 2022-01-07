import React from 'react';
import '../styles/registerpage.css';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
    }

    componentDidMount() {
        document.getElementById('submit-btn').addEventListener('click', (event) => {
            event.preventDefault();
        });
        
        if (this.props.currUser != null) {
            document.getElementById('login-link').innerHTML = 'Logout';
            document.getElementById('login-link').onclick = () => {
                this.props.changeUser(null);
            }
        } else {
            document.getElementById('login-link').innerHTML = 'Login';
        }
        
        document.getElementById('submit-btn').onclick = () => {
            if (!document.getElementById('confirm-box').checked) {
                document.getElementById('checkbox-warning').className = 'warning-on';
            } else {
                let fullNameInput = document.getElementById('user-full-name');
                let userNameInput = document.getElementById('user');
                let passwordInput = document.getElementById('pass');
                let passwordAgainInput = document.getElementById('pass-again');
                let emailInput = document.getElementById('email');
                let balanceInput = document.getElementById('balance');

                let options = {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
        
                fetch('http://localhost:3001/profile/' + userNameInput.value, options).then(res => res.json()).then(userData => {
                    this.validateInput(fullNameInput, userNameInput, passwordInput, passwordAgainInput, emailInput, balanceInput, userData.userInfo)
                });
        
                
            }
        }
    }

    validateInput(fullNameInput,userNameInput,passwordInput, passwordAgainInput, emailInput, balanceInput, hasUser) {
        if (!hasUser && !(/&|=|_|'|-|\+|,|<|>/.test(userNameInput.value)) && 
        userNameInput.value.length > 0 && passwordInput.value.length > 0 && 
        passwordInput.value === passwordAgainInput.value && /@\w+.com$/.test(emailInput.value) &&
        balanceInput.value >= 0.00 && /\d+.\d\d/.test(balanceInput.value)) {

            //Prepares data to be POSTed
            let data = {
                userName : userNameInput.value, 
                password : passwordInput.value,
                email : emailInput.value,
                name: fullNameInput.value,
                balance : balanceInput.value,
                todaysDate: this.getDate()
            };
            
            let options = {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            fetch('http://localhost:3001/register/', options);

            window.location.href="login-page.html";
        } else {
            document.getElementById('cred-invalid').className = 'warning-on';
            document.getElementById('cred-invalid-list').className = 'warning-on';
        }
    }
    
    getDate() {
        let date = new Date();
        let yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = String(date.getDate());
        return mm + '/' + dd + '/' + yyyy;
    }

    render() {
        return(
            <div id="register-pg">
                <h1> Register </h1>
                <h4 id="cred-invalid" className="warning-off"> One or more credentials are invalid </h4>
                <ul id="cred-invalid-list" className="warning-off"> 
                    <li> Username can't contain !,&,=,_,',-,+,{"<"}, {">"} or commas </li>
                    <li> Password must match password in Re-Type Password </li>
                    <li> Email must contain an address {"("}i.e., bob@gmail.com{")"}</li> 
                    <li> One or more fields is/are blank </li>
                    <li> Balance must be a number in currency format {"("}i.e., 5.00{")"} </li>
                    <li> Username must be unique. Someone has that username you entered. </li>
                </ul>
                <div id="parent-container">
                    <form>
                        <div id="user-full-name-input-lbl"> 
                            <label htmlFor="user-full-name"> Full Name </label>
                        </div>
                        <div id="user-full-name-input-fd">
                            <input type="text" id="user-full-name" name="user-full-name" className="user-input" />
                        </div>
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
                        <div id="pass-again-input-lbl">
                            <label htmlFor="pass-again"> Re-Type Password </label>
                        </div>
                        <div id="pass-again-input-fd">
                            <input type="password" id="pass-again" name="pass-again" className="user-input" />
                        </div>
                        <div id="email-lbl"> 
                            <label htmlFor="email"> Email </label>
                        </div>
                        <div id="email-fd">
                            <input type="email" id="email" name="email" className="user-input" />
                        </div>
                        <div id="balance-lbl"> 
                            <label htmlFor="balance"> Balance </label>
                        </div>
                        <div id="balance-fd">
                            <input type="text" id="balance" name="balance" className="user-input" />
                        </div>
                        <div id="confirm-input-container">
                            <label htmlFor="confirm" id="confirm-input-lbl"> Is the information correct? </label>
                            <input type="checkbox" id="confirm-box" />
                            <h4 id="checkbox-warning" className="warning-off"> Please click on the checkbox above and submit again </h4> 
                        </div>
                        <input type="submit" id="submit-btn" />
                    </form>
                </div>
            </div>
        );
    }
}

export default RegisterPage;