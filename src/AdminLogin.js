import React, { Component } from 'react';
import axios from 'axios';
import {AdminApi, GetAllAdmins } from './constants'

class AdminLogin extends Component {


  constructor(props){
    super(props);
    this.state = {
      loginState:0
    }
    this.checkLogin = this.checkLogin.bind(this);
    this.checkLoginFromUsers = this.checkLoginFromUsers.bind(this);
    this.checkLoginFromAdmins = this.checkLoginFromAdmins.bind(this);
    this.successfullLogin = this.successfullLogin.bind(this);
  }

  checkLogin(){
    {this.state.loginState===0 && this.checkLoginFromUsers()}
    console.log(this.state.loginState);
    if(this.state.loginState===0){
      this.checkLoginFromAdmins()
    }

  }

  successfullLogin(){
    if(this.state.loginState===1){
      this.props.displayPage(1);
    } else if (this.state.loginState===2) {
      this.props.displayPage(2);
    }else{
      alert("wrong credentials");
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
        if(userInput === adminRecords[i].username){
          if(passInput === adminRecords[i].password){
              session.setState({loginState:2}); //call displayPage directly
              session.props.setAccountId(adminRecords[i].adminId);
              {this.successfullLogin()}
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
    console.log(userInput+passInput);
    axios.get('http://localhost:8081/user/getall').then(function (response){
      var userRecords = response.data;
      for(var i=0; i<userRecords.length; i++){
        if(userInput === userRecords[i].username){
          if(passInput === userRecords[i].password){
            session.setState({loginState:1});
            session.props.setAccountId(userRecords[i].id);
            {session.successfullLogin()}
            break;
          }
        }
      }
    });
    console.log("exit");
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
export default AdminLogin;
