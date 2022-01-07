import logo from './logo.svg';
import React from 'react'
// import './App.css';
import { render } from '@testing-library/react';
import Header from './pages/Header';
import FrontPage from './pages/FrontPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import EducationPage from './pages/EducationPage';
import ProfilePage from './pages/ProfilePage';
import Footer from './pages/Footer';
import UserPage from './pages/UserPage';


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      currentComp: <FrontPage currUser = {null} changeUser = {this.changeCurrUser} />,
      currUser: null
    };
  }

  

  changeToRegisterPg = () => {
    this.setState({currentComp: <RegisterPage currUser = {this.state.currUser} changeUser = {this.changeCurrUser} />});
  }

  changeToFrontPg = () => {
    this.setState({currentComp: <FrontPage currUser = {this.state.currUser} changeUser = {this.changeCurrUser} />});
  }

  changeToProductsPg = () => {
    this.setState({currentComp: <ProductsPage currUser = {this.state.currUser} changeUser = {this.changeCurrUser} />});
  }

  changeToEducationPg = () => {
    this.setState({currentComp: <EducationPage currUser = {this.state.currUser} changeUser = {this.changeCurrUser} />});
  }

  changeToLoginPg = () => {
    this.setState({currentComp: <LoginPage registerPg = {this.changeToRegisterPg} 
      currUser = {this.state.currUser} changeUser = {this.changeCurrUser} frontPg = {this.changeToFrontPg} />});
  }

  changeToProfilePg = () => {
    this.setState({currentComp: <ProfilePage currUser = {this.state.currUser} changeUser = {this.changeCurrUser} />});
  }

  changeToUserPg = () => {
    this.setState({currentComp: <UserPage currUser = {this.state.currUser} changeUser = {this.changeCurrUser} frontPg = {this.changeToFrontPg}/>});
  }

  changeCurrUser = (user) => {
    if (user == null) {
      document.getElementById('user-link').id = 'user-link-hidden';
    }
    this.setState({currUser: user});
  }

  

  render() {
    return (
      <div> 
        <Header frontPg = {this.changeToFrontPg} productsPg = {this.changeToProductsPg} 
          educationPg = {this.changeToEducationPg} loginPg = {this.changeToLoginPg} 
          profilePg = {this.changeToProfilePg} userPg = {this.changeToUserPg} />
        {this.state.currentComp}
        <Footer />
      </div>
    );
  };
}

export default App;
