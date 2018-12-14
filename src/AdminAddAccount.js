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
      axios.post("http://localhost:8084/admin/create/1", this.state.adminObb)
      .then(function(response){
        console.log(response);
      });
    }else{
      alert("bad user");
    }
  }



async makeAdmin(event){
    event.preventDefault();
    var username = document.getElementById("usernameIN").value;
    var password = document.getElementById("passwordIN").value;
    var firstName = document.getElementById("firstnameIN").value;
    var lastName = document.getElementById("lastnameIN").value;
    var email = document.getElementById("emailIN").value;
    var isSuper = document.getElementById("isAdmin").checked;

    var adminObj = {"username":username, "password":password, "firstName":firstName, "lastName":lastName, "email":email,"superAdmin":isSuper};
  await this.setState({
      adminObb:{"username":username, "password":password, "firstName":firstName, "lastName":lastName, "email":email,"superAdmin":isSuper}
    });
    console.log("before");
    console.log(this.state.adminObb);

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
                <input type="radio" value="Trainer" name="rank"/>
                Trainer
              </label>
              <br/>
              <label>
                <input type="radio" value="Trainer" name="rank" checked={true}/>
                User
              </label>
            </div><br/>
            <input id="usernameIN" placeholder="username" className ="form-control" style={{width:'150px'}} />
            <br/>
            <input id="passwordIN" placeholder="password" className ="form-control" style={{width:'150px'}} />
            <br/>
            <input id="firstnameIN" placeholder="firstName" className ="form-control" style={{width:'150px'}} />
            <br/>
            <input id="lastnameIN" placeholder="lastName" className ="form-control" style={{width:'150px'}} />
            <br/>
            <input id="emailIN" placeholder="email" className ="form-control" style={{width:'150px'}} />
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
