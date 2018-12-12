import React, { Component } from 'react';
import axios from 'axios';
import {AdminApi, GetAllAdmins, UserApi, GetAllUsers } from './constants'

class Login extends Component {


  constructor(props){
    super(props);
    this.state = {
      loginState:0
    }
    this.checkLogin = this.checkLogin.bind(this);
    this.checkLoginFromUsers = this.checkLoginFromUsers.bind(this);
    this.checkLoginFromAdmins = this.checkLoginFromAdmins.bind(this);
    this.getFormInput = this.getFormInput.bind(this);
  }

  checkLogin(){
    {this.state.loginState===0 && this.checkLoginFromUsers()}

    if(this.state.loginState===0){
      this.checkLoginFromAdmins()
    }

  }


  checkLoginFromAdmins(){
    var session = this;
    axios.get(AdminApi+GetAllAdmins).then(function (response){
      console.log(response.data);
      session.validateCredentials(response.data, 1);
    });
  }

  checkLoginFromUsers(){
    var session = this;
    axios.get(UserApi+GetAllUsers).then(function (response){
      console.log(response);
      session.validateCredentials(response.data, 0);
    });
  }

  validateCredentials(records, userOrAdmin){
    var input = this.getFormInput();
    for(var i=0; i<records.length; i++){
      if(input[0] === records[i].username){
        if(input[1] === records[i].password){
          this.props.setAccountId(records[i].id);
          this.props.displayPage(userOrAdmin===0 ? 1 : 2);
        }
      }
    }
  }

  getFormInput(){
    var userInput = document.getElementById("usernameIn").value;
    var passInput = document.getElementById("passwordIn").value;
    var input = [];
    input.push(userInput);
    input.push(passInput);
    console.log(input);
    return input;
  }

  render() {

    const InputLoginDetails = () =>{
      return(
        <div>
          <br/>
          <input id="usernameIn" type = "text" placeholder = "Username" className ="form-control" style={{width:'200px'}} />
          <br/>
          <input id="passwordIn" type = "password" placeholder = "Password" className ="form-control" style={{width:'200px'}} />
          <br/>
          <button className="btn btn-success" onClick={this.checkLogin}>Login</button>
        </div>
      )
    }

    return (
      <div>
        <InputLoginDetails/>
      </div>
    );

  }


}
export default Login;
