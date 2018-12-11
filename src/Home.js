import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom'
import logo from './logo2.png';
import './Home.css';
import Login from './Login.js';
import UserMain from './UserMain.js';
import AdminMain from './AdminMain.js';

class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      displayPage:0,
      accountId:-1
    }
    this.changeDisplay = this.changeDisplay.bind(this);
    this.setAccountId = this.setAccountId.bind(this);
  }

  setAccountId(id){
    this.setState({accountId:id});
  }

  changeDisplay(value){
    this.setState({displayPage:value});
  }



  render() {
    const LoginMain = () =>{
      return(
        <div>
          <header className="Home-header">
            <img src={logo} className="Home-logo" alt="logo" />
            <br/><br/>
            <p> Welcome to <b>Shreks</b> CV library </p>
            <div id='contentOfDiv'>
              <Login displayPage={this.changeDisplay} setAccountId={this.setAccountId}/>
            </div>
          </header>
        </div>
      );
    }

    const UserLink = () => (
      <Redirect to='/u'/>
    )

    if(this.state.displayPage===0){
      return (
        <div className="Home">
          <LoginMain/>
        </div>
      );
    }else if (this.state.displayPage===1) {
      return (
        <Redirect to='/u'/>
      );
    }else {
      return(
        <Redirect to='/a'/>
      );
    }

  }
}

export default Home;
