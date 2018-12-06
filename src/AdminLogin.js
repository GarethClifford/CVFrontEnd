import React, { Component } from 'react';
import axios from 'axios';
import { PathBase, PathGetAllUsers } from './constants'

class AdminLogin extends Component {


  constructor(props){
    super(props);
    this.state = {
      loginState: 0
    }

    this.onLoginClick = this.onLoginClick.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
  }


  oldlogin = () => {
    if (document.getElementById('userName').value === 'alvin') {
      window.alert("Sorry Alvin, the page is currently under construction, please try again later. So sorry please forgive me!")
    } else {
    window.alert("Username or password not found, please try again")
    }
  }

  onLoginClick(){
    var userInput = document.getElementById("usernameIn").value;
    var passInput = document.getElementById("passwordIn").value;
    {this.checkLogin()}
  }

  checkLogin(){
    console.log("here");

    {this.props.displayPage(1)}

    axios.get(PathBase+PathGetAllUsers).then(function (response){
      var userRecords = response.data;
      for(var i=0; i<userRecords.length; i++){
        if(userRecords[i].username, userRecords[i].password){
          //this.props.displayPage(1)
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
          <button className="btn btn-success" onClick={this.onLoginClick}>Login</button>
        </div>
      )
    }

    return (
      <div>
        {this.state.loginState===0 && <InputLoginDetails/>}
      </div>
    );

  }


}
export default AdminLogin;
