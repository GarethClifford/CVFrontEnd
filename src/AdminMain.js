import React, { Component } from 'react';
import axios from 'axios';
import { AdminApi, GetAdmin, AdminAddAdmin, AdminDeleteAdmin,
  AdminFlagUser, UserApi, GetAllUsers, DeleteUser, GetAllAdmins } from './constants';
  import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import AdminAddAccount from './AdminAddAccount.js';

class AdminMain extends Component {

  constructor(props){
    super(props);

    this.state = {
      adminId:this.props.adminId,
      isSuper:true,
      userElements:[],
      loaded:false,
      userInfo: this.props.array,
      adminInfo: this.props.array
    }

    this.getAdmin = this.getAdmin.bind(this);
    this.addAdmin = this.addAdmin.bind(this);
    this.deleteAdmin = this.deleteAdmin.bind(this);
    this.deleteButtonUser = this.deleteButtonUser.bind(this);
    this.deleteButtonAdmin = this.deleteButtonAdmin.bind(this);
    this.flagUser = this.flagUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.superCheck = this.superCheck.bind(this);
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
      <button id={row.id}  onClick={()=>this.flagUser(row.id)}>Flag</button>
    );
  }

  flagUser(id){
    axios.get(AdminApi+AdminFlagUser+id).then(function(response){
      console.log(response);
    });
  }

  deleteButtonUser(cell,row){
    return(
      <button id={row.user_id} className="btn btn-outline-danger"onClick={()=>this.deleteUser(row.user_id)}>Delete</button>
    );
  }

   superCheck() {
    return  axios.get(AdminApi+GetAdmin+this.props.adminId).then((response) => {
      return response.data.isSuperAdmin;
    });
  }

  deleteButtonAdmin(cell,row){
    // if(this.superCheck()){
    //   return <button id={row.admin_id} className="btn btn-outline-danger"onClick={()=>this.deleteAdmin(row.admin_id)}>Delete</button>
    // } else {
    //   return "Do not have permission"
    // }
    return this.props.adminId;
  }

  deleteUser(id){
    axios.delete(UserApi+DeleteUser+id).then(function(response){
      window.location.reload();
    });
  }
  deleteAdmin(id){
    axios.delete(AdminApi+AdminDeleteAdmin+id).then(function(response){
      window.location.reload();
    });
  }
  componentDidMount() {
    this.getUserData();
    this.getAdminData();
  }
  getUserData = () => {
   axios.get(UserApi+GetAllUsers).then((response) => {
     this.setState({
       userInfo: response.data
     });
   });
  }
   getAdminData = () => {
    axios.get(AdminApi+GetAllAdmins).then((response) => {
      this.setState({
        adminInfo: response.data
      });
    });
  }

  render() {

    return (
      <div>
      <div  style={{ width: '75%', margin:'auto' }}>
      <BootstrapTable data={this.state.userInfo}
      search
      striped
      hover >
      <TableHeaderColumn dataField='user_id' isKey Column width={'7%'} >ID</TableHeaderColumn>
      <TableHeaderColumn dataField='username' Column width={'16%'}>Username</TableHeaderColumn>
      <TableHeaderColumn dataField='firstName' Column width={'16%'}>First name</TableHeaderColumn>
      <TableHeaderColumn dataField='lastName' Column width={'16%'}>Last name</TableHeaderColumn>
      <TableHeaderColumn dataField='email' >Email</TableHeaderColumn>
      <TableHeaderColumn dataField='button' dataFormat={this.deleteButtonUser} Column width={'10%'}> Delete</TableHeaderColumn>
      </BootstrapTable>
      {this.state.adminId}
      {this.props.adminId}
      <BootstrapTable data={this.state.adminInfo}
      search
      striped
      hover >
      <TableHeaderColumn dataField='admin_id' isKey Column width={'7%'} >ID</TableHeaderColumn>
      <TableHeaderColumn dataField='username' Column width={'16%'}>Admin username</TableHeaderColumn>
      <TableHeaderColumn dataField='firstName' Column width={'16%'}>Admin first name</TableHeaderColumn>
      <TableHeaderColumn dataField='lastName' Column width={'16%'}>Admin last name</TableHeaderColumn>
      <TableHeaderColumn dataField='email' >Admin email</TableHeaderColumn>
      <TableHeaderColumn dataField='superAdmin' Column width={'9%'}>Super admin</TableHeaderColumn>
      <TableHeaderColumn dataField='button' dataFormat={this.deleteButtonAdmin} Column width={'10%'}>Delete</TableHeaderColumn>
      </BootstrapTable>
      </div>
        <AdminAddAccount/>
      </div>
    );

  }

}
export default AdminMain;
