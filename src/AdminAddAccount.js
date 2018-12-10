import React, { Component } from 'react';
import axios from 'axios';
import { PathAdminApi, PathGetAdmin, PathAdminAddAdmin } from './constants'

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
    axios.get(PathAdminApi+PathGetAllAdmins).then(function(response){
      console.log(response);
      adminList = response.data;
      axios.get(PathUserApi+PathGetAllUsers).then(function(response1){
        console.log(response1);
        userList = response1.data;
        for (var i = 0; i < adminList.length; i++){
          if(username === adminList[i].username){
            //do
          }
        }
      });
    });
  }

  makeAdmin(event){
    event.preventDefault();
    var userName = document.getElementById("usernameIN");
    var password = document.getElementById("passwordIN");
    var firstName = document.getElementById("firstnameIN");
    var lastName = document.getElementById("lastnameIN");
    var email = document.getElementById("emailIN");
    var isSuper = event.target[0].checked;
    var adminObj = {"userName":userName, "password":password, "firstName":firstName,
                      "lastName":lastName, "email":email, "isSuperAdmin":isSuper};

    axios.post(PathAdminApi+PathAdminAddAdmin, adminObj).then(function(response){
      console.log(response);
    });
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
