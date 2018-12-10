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
  }


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

  updateCv(id){
    axios.put(PathUserApi+PathUserUpdateCv+id).then(function(response){
      console.log(response);
    });
  }


  render() {
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
