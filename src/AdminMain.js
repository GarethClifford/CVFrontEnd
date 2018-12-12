import React, { Component } from 'react';
import axios from 'axios';
import { AdminApi, GetAdmin, AdminAddAdmin, AdminDeleteAdmin,
  AdminFlagUser, UserApi, GetAllUsers, DeleteUser } from './constants';
import AdminAddAccount from './AdminAddAccount.js';

class AdminMain extends Component {

  constructor(props){
    super(props);

    this.state = {
      adminId:this.props.adminId,
      isSuper:true,
      userElements:[],
      loaded:false
    }

    this.getAdmin = this.getAdmin.bind(this);
    this.addAdmin = this.addAdmin.bind(this);
    this.deleteAdmin = this.deleteAdmin.bind(this);
    this.deleteButton = this.deleteButton.bind(this);
    this.flagUser = this.flagUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.getUserData = this.getUserData.bind(this);
  }


  getAdmin(){
    var adminObj;
    axios.get(AdminApi+GetAdmin+this.state.adminId).then(function(response){
      console.log(response);
      adminObj = response;
    });
  }

  addAdmin(){
    var userName; //=document.getElementById("");
    var password; //set default password
    var firstName;
    var lastName;
    var isSuperAdmin;
    var newAdmin = {"userName":userName, "password":password,
     "firstName":firstName, "lastName":lastName, "isSuperAdmin":isSuperAdmin}
    axios.post(AdminApi+AdminAddAdmin, newAdmin).then(function (response){
      console.log(response);
    });
  }

  deleteAdmin(id){
    axios.delete(AdminApi+AdminDeleteAdmin+id).then(function(response){
      console.log(response);
    });
  }


  flagUserButton(cell,row){
    return(
      <button id={row.id} onClick={()=>this.flagUser(row.id)}>Flag</button>
    );
  }

  flagUser(id){
    axios.get(AdminApi+AdminFlagUser+id).then(function(response){
      console.log(response);
    });
  }

  deleteButton(cell,row){
    return(
      <button id={row.id} onClick={()=>this.deleteUser(row.id)}>Delete</button>
    );
  }

  deleteUser(id){
    axios.delete(UserApi+DeleteUser+id).then(function(response){
      console.log(response);
    });
  }

  getUserData(){
    console.log("here");
    var session = this;
    var resultset;
    if(this.state.loaded === false){
      axios.get(UserApi+GetAllUsers).then(function(response){
        console.log(response);
        resultset = response.data;

        var userElements = resultset.map(function(user){
          return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
              </tr>
          );
        });

        session.setState({
          userElements:userElements,
          loaded:true
        });
      });
    }
  }


  render() {
    const UserData = () =>{
      return(
        <div>
          <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Flagged</th>
            </tr>
            {this.state.userElements}
          </tbody>
          </table>
        </div>
      );
    }
    {this.getUserData()}
    
    return (
      //should load AdminAddAccount as well
      <UserData/>
    );

  }

}
export default AdminMain;
