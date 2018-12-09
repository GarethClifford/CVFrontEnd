import React, { Component } from 'react';
import axios from 'axios';
import { PathAdminApi, PathGetAdmin, PathAdminAddAdmin,
  PathAdminDeleteCv, PathAdminDeleteAdmin, PathAdminUpdateAdmin } from './constants'

class AdminMain extends Component {

  constructor(props){
    super(props);
    this.getAdmin = this.getAdmin.bind(this);
    this.addAdmin = this.addAdmin.bind(this);
    this.deleteAdmin = this.deleteAdmin.bind(this);
    this.deleteCv = this.deleteCv.bind(this);
  }


  getAdmin(){
    var adminObj;
    axios.get(PathAdminApi+PathGetAdmin).then(function(response){
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
    axios.post(PathAdminApi+PathAdminAddAdmin, newAdmin).then(function (response){
      console.log(response);
    });
  }

  deleteAdmin(id){
    axios.delete(PathAdminApi+PathAdminDeleteAdmin+id).then(function(response){
      console.log(response);
    });
  }

  deleteCv(id){
    axios.delete(PathAdminApi+PathAdminDeleteCv+id).then(function(response){
      console.log(response);
    });
  }


  render() {

    return (
      <div>
        <h1>User Main Page</h1>
      </div>
    );

  }

}
export default AdminMain;
