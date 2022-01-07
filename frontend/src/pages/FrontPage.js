import React from 'react';
import '../styles/frontpage.css';

class FrontPage extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    componentDidMount() {
        if (this.props.currUser != null) {
          document.getElementById('login-link').innerHTML = 'Logout';
          document.getElementById('login-link').onclick = () => {
            this.props.changeUser(null);
          }
        } else {
            document.getElementById('login-link').innerHTML = 'Login';
        }
      }

    render() {
        return(
            <div id="front-pg"> 
                <div id="front-page"> 
                    <div id="headline-container">
                        <h1 id="headline"> Never Miss A Payment Ever Again </h1>
                    </div>
                </div>
                
                <div className="secondary-page"> 
                    <h2> Features </h2>
                    <div id="cake"> </div>
                    <div className="showcase-container">
                        <h3 className="showcase-title"> Minimalistic UI </h3>
                        <p className="showcase-descr"> Simple to use interface will make it easy 
                                for you to keep track of your expenses. </p> 
                    </div>
                </div>
                
                <div className="secondary-page">
                    <div id="save-money"> </div>
                    <div className="showcase-container">
                        <h3 className="showcase-title"> Save Money </h3>
                        <p className="showcase-descr">By keeping track of your spending history 
                            you can see what your spending too much on. </p> 
                    </div>
                </div>

                <div className="secondary-page">
                    <div id="reward-pic"> </div>
                    <div className="showcase-container">
                        <h3 className="showcase-title"> Save and Earn Rewards </h3>
                        <p className="showcase-descr"> By saving money you will earn points
                            that can be traded in for rewards like coupons </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default FrontPage;