import React from 'react';
import '../styles/header.css';
import logo from '../images/piggy_bank.jpg';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return(
            <div id="header-pg">
                <header> 
                    <div id="logo-section">
                        <button onClick = {this.props.frontPg}> <div className="square"> </div> </button>
                        <h3 id="brand"> SmartFinance </h3>
                    </div>

                    <nav> 
                        <button onClick= {this.props.productsPg} id="products-link"> Products </button>
                        <button onClick= {this.props.educationPg} id="education-link"> Education </button>
                        <button onClick= {this.props.loginPg} id="login-link"> Login </button>
                        <button onClick= {this.props.profilePg} id="profile-link"> Profile </button>
                        <button onClick= {this.props.userPg} id="user-link-hidden"> </button>
                    </nav>
                </header>
            </div>
        );
    }
}

export default Header;