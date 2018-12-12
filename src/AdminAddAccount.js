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
      this.checkUsername = this.checkUsername.bind(this);
      this.checkInDB = this.checkInDB.bind(this);
      this.addAccount = this.addAccount.bind(this);
    }

    checkUserExists(username){
      var session = this;
      var adminList = [];
      var userList = [];
      console.log("asd " + username);
      axios.get(AdminApi+GetAllAdmins).then(function(response){
        // console.log(response);
        adminList = response.data;
        axios.get(UserApi+GetAllUsers).then(function(response1){
          // console.log(response1);
          userList = response1.data;
          console.log("call");
          console.log(username + ".." + adminList + ".." + userList);
          var dbColl = [];
          dbColl.push(adminList);
          dbColl.push(userList);
          session.checkUsername(username, adminList, userList);
        });
      });
    }


  checkUsername(username, adminList, userList){
    console.log(username + ".." + adminList + ".." + userList);
    var adminWithThatUsernameExists = this.checkInDB(username, adminList);
    var userWithThatUsernameExists = this.checkInDB(username, userList);

    console.log(adminWithThatUsernameExists + ".." + userWithThatUsernameExists);
    if(adminWithThatUsernameExists || userWithThatUsernameExists){
      this.setState({validUser:false});
      // return true;
    }else{
      this.setState({validUser:true});
      // return false;
    }

    console.log(this.state.validUser);
    this.addAccount()
  }

  checkInDB(username, resultset){
    console.log("checking");
    for (var i = 0; i < resultset.length; i++){
      if(username === resultset[i].username){
        return true;
      }
    }
    return false;
  }


  addAccount(adminObj){
    var username = document.getElementById("usernameIN").value;
    var password = document.getElementById("passwordIN").value;
    var firstName = document.getElementById("firstnameIN").value;
    var lastName = document.getElementById("lastnameIN").value;
    // var email = document.getElementById("emailIN").value;
    var isSuper = document.getElementById("UAradio").target[0].checked;

    var adminObj = {"username":username, "password":password, "firstName":firstName, "lastName":lastName, "isSuperAdmin":isSuper};
    console.log(adminObj);
    if(this.state.validUser===true){
      axios.post(AdminApi+AdminAddAdmin, adminObj).then(function(response){
        console.log("posted");
        console.log(response);
      });
    }else{
      console.log("bad user");
    }
  }



  makeAdmin(event){
    event.preventDefault();
    var username = document.getElementById("usernameIN").value;
    {this.checkUserExists(username)}
  }



    render() {

      const AddAccountForm = () =>{
        return(
          <form>
            <div id="UAradio" className="radio">
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
