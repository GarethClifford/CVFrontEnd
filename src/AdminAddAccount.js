import React, { Component } from 'react';
import axios from 'axios';
import { AdminApi, GetAdmin, AdminAddAdmin, GetAllAdmins,
  UserApi, GetAllUsers } from './constants'

class AdminAddAccount extends Component {

  constructor(props){
    super(props);
    this.state = {
      validUser: false
    }
    this.makeAdmin = this.makeAdmin.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  checkUserExists(username){
    var session = this;
    var adminList = [];
    var userList = [];
    axios.get(AdminApi+GetAllAdmins).then(function(response){
      console.log(response);
      adminList = response.data;
      axios.get(UserApi+GetAllUsers).then(function(response1){
        console.log(response1);
        userList = response1.data;
        var valid = true;
        for (var i = 0; i < adminList.length; i++){
          if(username === adminList[i].username){
            valid = false;
            break;
          }
        }
        for (var j = 0; j < userList.length; j++){
          if(username === userList[j].username){
            valid = false;
            break;
          }
        }
        session.setState({validUser:valid});
      });
    });
  }

  makeAdmin(event){
    event.preventDefault();
    var userName = document.getElementById("usernameIN");
    {this.checkUserExists(userName)};
    var password = document.getElementById("passwordIN");
    var firstName = document.getElementById("firstnameIN");
    var lastName = document.getElementById("lastnameIN");
    var email = document.getElementById("emailIN");
    var isSuper = event.target[0].checked;
    var adminObj = {"userName":userName, "password":password, "firstName":firstName, "lastName":lastName, "email":email, "isSuperAdmin":isSuper};
    if(this.state.validUser===true){
      axios.post(AdminApi+AdminAddAdmin, adminObj).then(function(response){
        console.log(response);
      });
    } else{
        alert("bad user");
    }
  }


  render() {

    const AddAccountForm = () =>{
      return(
        <form onSubmit={this.makeAdmin}>
          <div className="radio">
            <label>
              <input type="radio" value="Admin" name="rank"/>
              Admin
            </label>
            <label>
              <input type="radio" value="Trainer" name="rank" checked={true}/>
              Trainer
            </label>
          </div><br/>
          <input id="usernameIN" placeholder="username"/>
          <input id="passwordIN" placeholder="password"/>
          <input id="firstnameIN" placeholder="firstName"/>
          <input id="lastnameIN" placeholder="lastName"/>
          <input id="emailIN" placeholder="email"/>
          <br/>
          <button type="submit">Create</button>
        </form>
      );
    }

    return (
      <div>
        <h1>Add Account</h1>
        <AddAccountForm/>
      </div>
    );

  }

}
export default AdminAddAccount;
