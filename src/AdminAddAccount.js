import React, { Component } from 'react';
import axios from 'axios';
import { AdminApi, GetAdmin, AdminAddAdmin, GetAllAdmins,
  UserApi, GetAllUsers } from './constants'

  class AdminAddAccount extends Component {

    constructor(props){
      super(props);
      this.state = {
        validUser: false,
        adminObb: [],
        isUserChecked:false,
        isAdminChecked:false,
        isTrainerChecked:false
      }
      this.makeAdmin = this.makeAdmin.bind(this);
      this.checkUserExists = this.checkUserExists.bind(this);
      this.checkUsername = this.checkUsername.bind(this);
      this.checkInDB = this.checkInDB.bind(this);
      this.addAccount = this.addAccount.bind(this);
      // this.settingTheState = this.settingTheState.bind(this);
    }

    checkUserExists(username){
      var session = this;
      var adminList = [];
      var userList = [];
      var dbColl = [];
      axios.get(AdminApi+GetAllAdmins).then(function(response){
        adminList = response.data;
      });
      axios.get(UserApi+GetAllUsers).then(function(response1){
        userList = response1.data;
      });
      dbColl.push(adminList);
      dbColl.push(userList);
      session.checkUsername(username, adminList, userList);
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
      console.log("this far?");
      console.log(document.getElementById('isUser').checked);
      console.log(this.state.isUserChecked);
      if(this.state.isUserChecked) {
        console.log("THIS GETS THIS FAR");
      axios.post("http://localhost:8081/user/create", this.state.userObb)
      .then(function(response){
      });
    }else if(this.state.isAdminChecked || this.state.isTrainerChecked) {
      axios.post("http://localhost:8084/admin/create/1", this.state.adminObb)
      .then(function(response){
      });
    }
  }else {
    window.alert('Nope');
  }
  window.location.reload();
}



async makeAdmin(event){
    event.preventDefault();
    var username = document.getElementById("usernameIN").value;
    var password = document.getElementById("passwordIN").value;
    var firstName = document.getElementById("firstnameIN").value;
    var lastName = document.getElementById("lastnameIN").value;
    var email = document.getElementById("emailIN").value;
    var isUser = document.getElementById("isUser").checked;
    var isSuper = document.getElementById("isAdmin").checked;
    var isTrainer = document.getElementById("isTrainer").checked;
    var userObj = {"username":username, "password":password, "firstName":firstName, "lastName":lastName, "email":email,"superAdmin":isSuper};
    var adminObj = {"username":username, "password":password, "firstName":firstName, "lastName":lastName, "email":email,"superAdmin":isSuper};
    await this.setState({
      isUserChecked:isUser,
      isAdminChecked:isTrainer,
      isTrainerChecked:isSuper,
      userObb:{"username":username, "password":password, "firstName":firstName, "lastName":lastName, "email":email},
      adminObb:{"username":username, "password":password, "firstName":firstName, "lastName":lastName, "email":email,"superAdmin":isSuper}
    });
    console.log("before");
    this.checkUserExists(username);
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
              <br/>
              <label>
                <input id="isTrainer" type="radio" value="Trainer" name="rank"/>
                Trainer
              </label>
              <br/>
              <label>
                <input id="isUser" type="radio" value="User" name="rank" />
                User
              </label>
            </div><br/>
            <input type='text' id="usernameIN" placeholder="Username" className ="form-control" style={{width:'150px'}} />
            <br/>
            <input type='password' id="passwordIN" placeholder="Password" className ="form-control" style={{width:'150px'}} />
            <br/>
            <input type='text'id="firstnameIN" placeholder="First name" className ="form-control" style={{width:'150px'}} />
            <br/>
            <input type='text' id="lastnameIN" placeholder="Last name" className ="form-control" style={{width:'150px'}} />
            <br/>
            <input type='email' id="emailIN" placeholder="Email" className ="form-control" style={{width:'150px'}} />
            <br/>
            <button onClick={this.makeAdmin} className="btn btn-success">Create</button>
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
