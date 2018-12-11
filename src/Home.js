import React, { Component } from 'react';
import logo from './logo2.png';
import './Home.css';
import AdminLogin from './AdminLogin.js';
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
              <AdminLogin displayPage={this.changeDisplay} setAccountId={this.setAccountId}/>
            </div>
          </header>
        </div>
      );
    }


    return (
      <div className="Home">
        {this.state.displayPage===0 && <LoginMain/>}
        {this.state.displayPage===1 && <UserMain userId={this.state.accountId}/>}
        {this.state.displayPage===2 && <AdminMain adminId={this.state.accountId}/>}
      </div>
    );

  }
}

export default Home;
