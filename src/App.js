import React, { Component } from 'react';
import logo from './logo2.png';
import './App.css';
import ReactDOM from 'react-dom';
import AdminLogin from './AdminLogin.js';
import UserMain from './UserMain.js';
import AdminMain from './AdminMain.js';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      displayPage: 0,
      accountId:-1
    }
    this.changeDisplay = this.changeDisplay.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
    this.setAccountId = this.setAccountId.bind(this);
    this.testMethod = this.testMethod.bind(this);
  }

  onClickLogin(){
    ReactDOM.render(<AdminLogin displayPage={this.changeDisplay}
      setAccountId={this.setAccountId}/>, document.getElementById("contentOfDiv"));
  }

  setAccountId(id){
    this.setState({accountId:id});
  }

  changeDisplay(value){
    this.setState({
      displayPage: value
    });
  }

  testMethod(){
    console.log("hello");
  }


  render() {
    const LoginMain = () =>{
      return(
        <div>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <br/><br/>
            <p> Welcome <b>Shrek's</b> CV library </p>
            <div id='contentOfDiv'>
              <button className='btn btn-primary' onClick={this.onClickLogin}>Login</button>
            </div>
          </header>
        </div>
      );
    }


    return (
      <div className="App">
        {this.state.displayPage===0 && <LoginMain/>}
        {this.state.displayPage===1 && <UserMain userId={this.state.accountId}/>}
        {this.state.displayPage===2 && <AdminMain adminId={this.state.accountId}/>}
      </div>
    );

  }
}

export default App;
