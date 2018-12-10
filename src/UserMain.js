import React, { Component } from 'react';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
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

  componentWillMount(){
    var session = this;
    axios.get(UserApi+GetUser+this.state.userId).then(function(response){
      console.log(response);
      session.setState({
        userData:response.data
      });
    });
  }


  render() {
    const BootstrapTable = () =>{
      //does not load comments
      return(
        <div>
        <BootstrapTable data={this.state.userData.cvs} hover striped search>
        <TableHeaderColumn dataField='cvId' isKey={true}>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='fileName'>Filename</TableHeaderColumn>
        <TableHeaderColumn dataField='button' dataFormat={this.downloadFile}>Download</TableHeaderColumn>
        <TableHeaderColumn dataField='button' dataFormat={this.deleteButton}>Delete</TableHeaderColumn>
        </BootstrapTable>
        </div>
      );
    }

    return (
      <div>
        <h1>User Main Page</h1>
        <BootstrapTable/>
      </div>
    );

  }

}
export default UserMain;
