import React, { Component } from 'react';
import axios from 'axios';
import { AdminApi, GetAdmin, AdminAddAdmin, GetAllAdmins,
  UserApi, GetAllUsers } from './constants'

  class AdminAddAccount extends Component {

    constructor(props){
      super(props);
      this.state = {
        validUser: false,
        adminObb: []
      }
      this.makeAdmin = this.makeAdmin.bind(this);
      this.checkUserExists = this.checkUserExists.bind(this);
      this.checkUsername = this.checkUsername.bind(this);
      this.checkInDB = this.checkInDB.bind(this);
      this.addAccount = this.addAccount.bind(this);
    }

    checkUserExists(username){
      var session = this;
      var adminList = [];
      var userList = [];
      axios.get(AdminApi+GetAllAdmins).then(function(response){
        adminList = response.data;
        axios.get(UserApi+GetAllUsers).then(function(response1){
          userList = response1.data;
          var dbColl = [];
          dbColl.push(adminList);
          dbColl.push(userList);
          session.checkUsername(username, adminList, userList);
        });
      });
    }


  checkUsername(username, adminList, userList){
    var adminWithThatUsernameExists = this.checkInDB(username, adminList);
    var userWithThatUsernameExists = this.checkInDB(username, userList);
    if(adminWithThatUsernameExists || userWithThatUsernameExists){
      this.setState({validUser:false});
    }else{
      this.setState({validUser:true});
    }
    this.addAccount()
  }

  checkInDB(username, resultset){
    for (var i = 0; i < resultset.length; i++){
      if(username === resultset[i].username){
        return true;
      }
    }
    return false;
  }


  addAccount(){
    if(this.state.validUser===true){
      axios.post(AdminApi+AdminAddAdmin, this.state.adminObb)
      .then(function(response){
        console.log(response);
      });
    }else{
      alert("bad user");
    }
  }



  makeAdmin(event){
    event.preventDefault();
    var username = document.getElementById("usernameIN").value;
    var password = document.getElementById("passwordIN").value;
    var firstName = document.getElementById("firstnameIN").value;
    var lastName = document.getElementById("lastnameIN").value;
    var isSuper = document.getElementById("isAdmin").checked;
    var adminObj = {"username":username, "password":password, "firstName":firstName, "lastName":lastName, "superAdmin":isSuper};
    this.setState({adminObb:adminObj});
    {this.checkUserExists(username)}
  }

    render() {

      const AddAccountForm = () =>{
        return(
          <form>
            <div className="radio">
              <label>
                <input id="isAdmin" type="radio" value="Admin" name="rank"/>
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
            <button onClick={this.makeAdmin}>Create</button>
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
