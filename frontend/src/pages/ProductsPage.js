import React from 'react';
import '../styles/productspage.css';

class ProductsPage extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    componentDidMount() {
        document.getElementById('submit-btn').addEventListener('click', function(event) {
            event.preventDefault();
        });
        
        if (this.props.currUser != null) {
            document.getElementById('login-link').innerHTML = 'Logout';
            document.getElementById('login-link').onclick = () => {
                this.props.changeUser(null);
            }
        
            document.getElementById('balance-lbl').innerHTML = 'Balance: $' + parseFloat(this.props.currUser.balance).toFixed(2);
            document.getElementById('submit-btn').onclick = () => {
                let plans = document.getElementsByClassName('price-plans');
                for (let i = 0; i < plans.length; i++){
                    if (plans.item(i).checked){
                        let plan = document.querySelector('label[for=' + plans.item(i).id + ']').innerHTML;
                        let price = 0.00;
                        // eslint-disable-next-line default-case
                        switch (plan.trim()) {
                            case 'Free':
                                plan = 'free';
                                price = 0.00;
                                break;
                            case 'Basic':
                                plan = 'basic';
                                price = 5.99;
                                break;
                            case 'Pro':
                                plan = 'pro';
                                price = 10.99;
                                break;
                            case 'Advanced':
                                plan = 'advanced';
                                price = 19.99;
                                break;
                        }
        
                        if (this.props.currUser.balance >= price) {
                            this.props.currUser.balance -= price;
                            this.props.currUser.plan = plan;
                            this.props.changeUser(this.props.currUser);

                            //Prepares data for put request to update user's plan
                            let data = {
                                userName: this.props.currUser.userName, 
                                plan: this.props.currUser.plan,
                                balance: this.props.currUser.balance  
                            };
                            let options = {
                                method: 'put',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(data)
                            }
                            fetch('http://localhost:3001/products/', options);

                            document.getElementById('balance-lbl').innerHTML = 'Balance: $' + parseFloat(this.props.currUser.balance).toFixed(2);
                            document.getElementById('balance-error').className = 'warning-off';
                            document.getElementById('purchase-error').className = 'purchase-msg-on';
                        } else {
                            document.getElementById('balance-error').className = 'warning-on';
                            document.getElementById('purchase-error').className = 'purchase-msg-off';
                        }
                        
                    }
                }
            }
        } else {
            document.getElementById('login-link').innerHTML = 'Login';
        }
    }

    render() {
        return(
            <div id="products-pg">
                <h2 id="title"> We Serve For All Different Customers </h2> 
                <div className="table">
                    <div className="col"> 
                        <h3> Free </h3>
                        <h4> $0.00/month </h4>
                        <ul> 
                            <li> Unlimited access to tracking your finances (Maximum 10 GB storage) </li>
                        </ul>
                    </div>
                    <div className="col">
                        <h3> Basic </h3>
                        <h4> $5.99/month </h4>
                        <ul> 
                            <li> Extra tools to help you save </li>
                        </ul>
                    </div>
                    <div className="col">
                        <h3> Pro </h3>
                        <h4> $10.99/month </h4>
                        <ul> 
                            <li> More education information to help you become a better budgeter </li>
                            <li> Includes all features in the Basic plan </li>
                        </ul>
                    </div>
                    <div className="col">
                        <h3> Advanced </h3>
                        <h4> $19.99/month </h4>
                        <ul> 
                            <li> Unlimited storage so you can keep track of your expenses for life </li>
                            <li> Access to the latest updates </li>
                            <li> Includes all features in the Pro plan </li> 
                        </ul>
                    </div>
                </div>

                <div> 
                    <h3> Select Plan </h3>
                    <form> 
                        <input type="radio" name="plan" id="free-checkbox" className="price-plans" />
                        <label htmlFor="free-checkbox" id="free-option"> Free </label>
                        <input type="radio" name="plan" id="basic-checkbox" className="price-plans" />
                        <label htmlFor="basic-checkbox" id="basic-option" > Basic </label>
                        <input type="radio" name="plan" id="pro-checkbox" className="price-plans" />
                        <label htmlFor="pro-checkbox" id="pro-option"> Pro </label>
                        <input type="radio" name="plan" id="advanced-checkbox" className="price-plans" />
                        <label htmlFor="advanced-checkbox" id="advanced-option"> Advanced </label>
                        <input type="submit" id="submit-btn" />
                    </form>

                    <div> 
                        <h4 id="balance-lbl"> Balance: N/A </h4>
                        <h4 id="balance-error" className="warning-off"> You don't have enough to purchase this plan </h4>
                        <h4 id="purchase-error" className="purchase-msg-off"> Purchase Successful </h4> 
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductsPage;