import React, { Component } from 'react';
import axios from 'axios';
import { UserApi, GetUser, CvApi, CvGet, UserDeleteCv, UserUpdateCv } from './constants'

class UserMain extends Component {

  constructor(props){
    super(props);
    this.state = {
      userId: this.props.userId,
      userData: []
    }
    this.deleteButton = this.deleteButton.bind(this);
    this.deleteCv = this.deleteCv.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
  }


  deleteButton(cell,row){
    return (
      <button id={row.id} onClick={()=>this.deleteCv(row.id)}>Delete</button>
    );
  }

  deleteCv(id){
      axios.delete(UserApi + UserDeleteCv + id).then(function(response){
        console.log(response);
      });
  }

  downloadFile(cell,row){
    axios.get(CvApi+CvGet+row.id).then(function(response){
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
export default UserMain;
