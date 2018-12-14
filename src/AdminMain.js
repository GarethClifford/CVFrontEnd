import React, { Component } from 'react';
import axios from 'axios';
import { AdminApi, GetAdmin, AdminAddAdmin, AdminDeleteAdmin,
  AdminFlagUser, UserApi, GetAllUsers, DeleteUser } from './constants';
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
      userInfo: this.props.array
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
      <button id={row.id}  onClick={()=>this.flagUser(row.id)}>Flag</button>
    );
  }

  flagUser(id){
    axios.get(AdminApi+AdminFlagUser+id).then(function(response){
      console.log(response);
    });
  }

  deleteButton(cell,row){
    return(
      <button id={row.id} className="btn btn-outline-danger"onClick={()=>this.deleteUser(row.id)}>Delete</button>
    );
  }

  deleteUser(id){
    axios.delete(UserApi+DeleteUser+id).then(function(response){
      console.log(response);
    });
  }
  componentDidMount() {
    this.getUserData();
  }
  getUserData = () => {
   axios.get(UserApi+GetAllUsers).then((response) => {
     this.setState({
       userInfo: response.data
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
      <TableHeaderColumn dataField='button' dataFormat={this.deleteButton} Column width={'13%'}> Delete</TableHeaderColumn>
      </BootstrapTable>
      </div>

        <AdminAddAccount/>
      </div>
    );

  }

}
export default AdminMain;
