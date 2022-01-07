import React from 'react';
import '../styles/userpage.css';

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            userName: null,
            password: null,
            email: null,
            plan: null,
            name: null,
            balance: null,
            todaysExpenses: null,
            allExpenses: null,
            todaysDate: null,
            todaysExpensesText: '',
            allExpensesText: ''
        }

        let options = {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch('http://localhost:3001/profile/' + this.props.currUser.userName, options).then(res => res.json()).then(userData => {

            if (userData.success === true) {
                this.setState({
                    userName: userData.userInfo.userName,
                    password: userData.userInfo.password,
                    email: userData.userInfo.email,
                    plan: userData.userInfo.plan,
                    name: userData.userInfo.name,
                    balance: userData.userInfo.balance,
                    todaysExpenses: userData.userInfo.todaysExpenses,
                    allExpenses: userData.userInfo.allExpenses,
                    todaysDate: userData.userInfo.todaysDate,
                });
                

                let todaysExpensesTextTemp = '';
                Object.keys(userData.userInfo.todaysExpenses).forEach((k) => {
                    todaysExpensesTextTemp += k + '= $' + userData.userInfo.todaysExpenses[k] + ' ';
                });

                let allExpensesTextTemp = '';
                Object.keys(userData.userInfo.allExpenses).forEach((k) => {
                    allExpensesTextTemp += k + ': ';

                    Object.keys(userData.userInfo.allExpenses[k]).forEach((prodName) => {
                        let productName = prodName;
                        let price = userData.userInfo.allExpenses[k][prodName];
                        allExpensesTextTemp += productName + ' = $' + price + ' ';
                    });

                });

                this.setState({todaysExpensesText: todaysExpensesTextTemp, allExpensesText: allExpensesTextTemp});
            }
        });
    }

    removeAccount = () => {
        let data = {userName: this.props.currUser.userName};
        let options = {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
        };

        fetch('http://localhost:3001/profile/', options).then(() => {
            this.props.changeUser(null);
            this.props.frontPg();
            document.getElementById('login-link').onclick = () => function() {
                
            }
            document.getElementById('login-link').innerHTML = 'Login';
        })
    }

    render() {
        return(
            <div id="user-pg">
                <h1 id="title-1"> User Information </h1> 
                <div id="title">
                <h1> Username: {this.state.userName} </h1> 
                    <button onClick = {this.removeAccount} id="delete-profile-btn"> DELETE ACCOUNT </button>
                </div> 
                <h3> Password: {this.state.password} </h3>
                <h3> Email: {this.state.email} </h3>
                <h3> Plan: {this.state.plan} </h3>
                <h3> Name: {this.state.name} </h3>
                <h3> Balance: ${this.state.balance} </h3>
                <h3> Today's Date: {this.state.todaysDate} </h3>
                <div> 
                    <h3> Today's Expenses </h3>
                    {this.state.todaysExpensesText} <br />
                    <h3> All Expenses </h3> 
                    {this.state.allExpensesText}
                </div>
            </div>
        );
    }
}

export default UserPage;