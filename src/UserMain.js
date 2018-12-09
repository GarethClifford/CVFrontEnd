import React, { Component } from 'react';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { PathUserApi, PathGetUser, PathUserDeleteCv, PathUserUpdateCv } from './constants'

class UserMain extends Component {

  constructor(props){
    super(props);
    this.state = {
      userId: 0, //obviously change this
      storedCVs: [],
      testString:[]
    }
    this.deleteButton = this.deleteButton.bind(this);
    // this.getUserData = this.getUserData.bind(this);
    // this.deleteCV = this.deleteCV.bind(this);
    // this.updateCV = this.updateCV.bind(this);
  }

  // deleteCV(event){
  //   event.preventDefault();
  //   var cvId = event.target.id;
  //   axios.delete(PathUserApi + PathUserDeleteCv + cvId).then(function(response){
  //     console.log(response);
  //   });
  // }
  //
  // updateCV(event){
  //   event.preventDefault();
  //   var cvId = event.target.id;
  //   axios.put(PathUserApi + PathUserUpdateCv + cvId).then(function (response){
  //     console.log(response);
  //   });
  // }
  //
  // getUserData(){ //gets user cvs and turns them into elements containing the cvobject with a delete and update button
  //   var session = this;
  //   axios.get(PathUserApi+PathGetUser + this.state.userId).then(function(response){
  //     var cvs = response.data[0].CVObject
  //     var cvList = cvs.map(function(cv){
  //       return(
  //         <div key={cv.id}>
  //           <p>{cv.comments}</p>
  //           <button id={cv.id} onClick={session.deleteCV} value="Delete"/>
  //           <button id={cv.id} onClick={session.updateCV} value="Update"/>
  //         </div>
  //       );
  //     });
  //
  //     this.setState({
  //       storedCVs: cvList
  //     });
  //
  //   });
  // }

  deleteCv(id){
      axios.delete(PathUserApi + PathUserDeleteCv + id).then(function(response){
        console.log(response);
      });
  }

  deleteButton(cell,row){
    return (
      <button id={row.id} onClick={()=>this.deleteCv(row.id)}>Delete</button>
    );
  }



  render() {

    // const LoadData = () =>{
    //   return(
    //     <div>
    //       {this.state.storedCVs}
    //     </div>
    //   );
    // }

    const BootstrapTable = () =>{
      return(
        <div>
        <BootstrapTable data={this.state.storedCVs} hover striped search>
        <TableHeaderColumn dataField='id' isKey={true}>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='button' dataFormat={this.deleteButton}>Delete</TableHeaderColumn>
        </BootstrapTable>
        </div>
      );
    }

    const TestData = () =>{

      const testString = this.state.testString.splice();
      testString.push("one");
      testString.push("two");

      var testElement = testString.map((str) =>{
        return(
          <div>
            <tr>{str}</tr>
          </div>
        );
      });

      return(
        <div>
          {testElement}
        </div>
      );
    }

    return (
      <div>
        <h1>User Main Page</h1>
        <TestData/>
      </div>
    );

  }

}
export default UserMain;
