import React from 'react';
import '../styles/profilepage.css';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    componentDidMount() {
        document.getElementById('add-item-btn').addEventListener('click', (event) => {
            event.preventDefault();
        });

        document.getElementById('remove-item-btn').addEventListener('click', (event) => {
            event.preventDefault();
        });
        
        if (this.props.currUser !== null) {
            document.getElementById('login-link').innerHTML = 'Logout';
            document.getElementById('login-link').onclick = () => {
                this.props.changeUser(null);
            }

            document.getElementById('user-container').className = 'profile-visible';
            document.getElementById('user-title').innerHTML = this.props.currUser.name;
            document.getElementById('user-balance').innerHTML = '$' + parseFloat(this.props.currUser.balance).toFixed(2);
        
            if (this.props.currUser.todaysDate === this.getDate()) {
                this.fillTodaysExpenses(this.props.currUser.todaysExpenses);
                this.fillPastExpenses(this.props.currUser.allExpenses);
            } else {
                this.fillPastExpenses(this.props.currUser.allExpenses);
                this.props.currUser.allExpenses[this.props.currUser.todaysDate] = this.props.currUser.todaysExpenses;
                this.props.currUser.todaysExpenses = new Map();
                this.props.currUser.todaysDate = this.getDate();
                
                this.props.changeUser(this.props.currUser);

                //Prepares data for put request
                let data = {userName: this.props.currUser.userName, todaysExpenses: this.props.currUser.todaysExpenses, 
                    allExpenses: this.props.currUser.allExpenses, todaysDate: this.props.currUser.todaysDate};
                let options = {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                };
                fetch('http://localhost:3001/profile/', options);
            }
        } else {
            document.getElementById('login-link').innerHTML = 'Login';
        }
        
        document.getElementById('add-item-btn').onclick = () => {
            document.getElementById('input-invalid').className = 'warning-off';
            document.getElementById('warning-list').className = 'warning-off';
            let productPrice = document.getElementById('prod-price').value;
            let productName = document.getElementById('prod-name').value;
        
            if (/^[a-zA-Z ]+$/.test(productName) && /^\d+.\d\d$/.test(productPrice)) {
                this.props.currUser.todaysExpenses[productName] = productPrice;
                this.props.changeUser(this.props.currUser);

                let data = {userName: this.props.currUser.userName, todaysExpenses: this.props.currUser.todaysExpenses};
                let options = {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
                fetch('http://localhost:3001/profile/expense/', options);
                this.addElementToTodaysExpensesTable(productName, productPrice);
                document.getElementsByTagName('form')[0].reset();
            } else {
                document.getElementById('input-invalid').className = 'warning-on';
                document.getElementById('warning-list').className = 'warning-on';
            }
        }
    }

    removeItem = () => {
        document.getElementById('input-invalid').className = 'warning-off';
        document.getElementById('warning-list').className = 'warning-off';
        let productPrice = document.getElementById('prod-price').value;
        let itemToRemove = document.getElementById('prod-name').value;
    
        if (/^[a-zA-Z ]+$/.test(itemToRemove) && /^\d+.\d\d$/.test(productPrice)) {
            let tempTodaysExpenses = new Map();
            Object.keys(this.props.currUser.todaysExpenses).forEach((k) => {
                if (k !== itemToRemove || productPrice !== this.props.currUser.todaysExpenses[k]) {
                    tempTodaysExpenses[k] = this.props.currUser.todaysExpenses[k];
                }
            });

            this.props.currUser.todaysExpenses = tempTodaysExpenses;

            this.props.changeUser(this.props.currUser);

            let data = {userName: this.props.currUser.userName, todaysExpenses: this.props.currUser.todaysExpenses};
            let options = {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            fetch('http://localhost:3001/profile/expense/', options).then(() => {
                document.getElementById('product-list').innerHTML = '';
                document.getElementById('price-list').innerHTML = '';
                this.fillTodaysExpenses(this.props.currUser.todaysExpenses);
            });

            
        }else {
            document.getElementById('input-invalid').className = 'warning-on';
            document.getElementById('warning-list').className = 'warning-on';
        }
        document.getElementsByTagName('form')[0].reset();
    }

    fillTodaysExpenses(todaysExpensesList) {
        Object.keys(todaysExpensesList).forEach((k) => {
            this.addElementToTodaysExpensesTable(k, todaysExpensesList[k]);
        });
    }
    
    fillPastExpenses(allExpenses) {
        Object.keys(allExpenses).forEach((k) => {
            this.addElementToPastExpensesTable(k, allExpenses[k]);
        })
    }
    
    addElementToPastExpensesTable(date, todaysExpensesList) {
        let monthTitleH2 = document.createElement('h2');
        monthTitleH2.className = 'pastExpensesTitle';
        monthTitleH2.innerHTML = date;
        let expensesContainer = document.createElement('div');
        expensesContainer.className = 'pastExpensesContainer';
        let ul = document.createElement('ul');
        ul.className = 'items';
    
    
        Object.keys(todaysExpensesList).forEach((k) => {
            let productName = k;
            let price = todaysExpensesList[k];
            let newProductListItem = document.createElement('li');
            newProductListItem.appendChild(document.createTextNode(productName + ': $' + price));
            ul.appendChild(newProductListItem);
        });
    
        expensesContainer.appendChild(ul);
        document.getElementById('expense-history-container').appendChild(monthTitleH2);
        document.getElementById('expense-history-container').appendChild(expensesContainer);
    }
    
    
    addElementToTodaysExpensesTable(name, price) {
        let productList = document.getElementById('product-list');
        let newProductListItem =  document.createElement('li');
        newProductListItem.appendChild(document.createTextNode(name));
        productList.appendChild(newProductListItem);
    
        let productPriceList = document.getElementById('price-list');
        let newPriceListItem = document.createElement('li');
        newPriceListItem.appendChild(document.createTextNode('$' + price));
        productPriceList.appendChild(newPriceListItem);
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
            <div id="profile-pg">
                <div id="user-container" className="profile-invisible">
                    <div id="title-container"> 
                        <h1 id="user-title"> Joe Smith </h1>
                        <h3 id="user-balance"> $0 </h3>
                    </div>
                    
                    <h2 id="expenses-title"> Today's Expenses </h2>
                    <div id="expenses-container-1" className="expenses-container"> 
                        <div id="product-col" className="col">
                            <ul id="product-list" className="items">

                            </ul>
                        </div>

                        <div id="price-col" className="col">
                            <ul id="price-list" className="items">
                            </ul>
                        </div>
                    </div> 

                    <form> 
                        <input type="text" id="prod-name" name="prod-name" placeholder="Product Name" class="input-fd"/>
                        <input type="text" id="prod-price" name="prod-price" placeholder="Price" class="input-fd"/>
                        <button id="add-item-btn"> Add Item </button>
                        <button onClick= {this.removeItem} id="remove-item-btn"> Remove Item </button>
                    </form>

                    <div id="warning-container"> 
                        <h4 id="input-invalid" className="warning-off"> Invalid Input </h4>
                        <ul id="warning-list" className="warning-off"> 
                            <li> Product name must contain letters and can have spaces to separate words </li>
                            <li> Price must be in the form X.XX {"("}i.e., 3.99 or 1000.00{")"} </li>
                        </ul>
                    </div>

                    <div id="expense-history-container">

                    </div>
                </div>

            </div>
        );
    }
}

export default ProfilePage;