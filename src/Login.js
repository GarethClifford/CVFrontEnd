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
  }

  checkLogin(){
    {this.state.loginState===0 && this.checkLoginFromUsers()}

    if(this.state.loginState===0){
      this.checkLoginFromAdmins()
    }

  }


  //duplicate code. refactor
  checkLoginFromAdmins(){
    console.log("a");
    var userInput = document.getElementById("usernameIn").value;
    var passInput = document.getElementById("passwordIn").value;
    var session = this;
    axios.get(AdminApi+GetAllAdmins).then(function (response){
      console.log(response);
      var adminRecords = response.data;
      for(var i=0; i<adminRecords.length; i++){
        if(userInput === adminRecords[i].userName){
          if(passInput === adminRecords[i].password){
            session.props.setAccountId(adminRecords[i].id);
            session.props.displayPage(2);
            break;
          }
        }
      }
    });
  }

  checkLoginFromUsers(){
    console.log("u");
    var userInput = document.getElementById("usernameIn").value;
    var passInput = document.getElementById("passwordIn").value;
    var session = this;
    axios.get(UserApi+GetAllUsers).then(function (response){
      console.log(response);
      var userRecords = response.data;
      for(var i=0; i<userRecords.length; i++){
        if(userInput === userRecords[i].username){
          if(passInput === userRecords[i].password){
            session.props.setAccountId(userRecords[i].id);
            session.props.displayPage(1);
            break;
          }
        }
      }
    });
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
