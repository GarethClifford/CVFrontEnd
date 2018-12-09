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
      displayPage: 0
    }
    this.changeDisplay = this.changeDisplay.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
  }

  onClickLogin(){
    ReactDOM.render(<AdminLogin displayPage={this.changeDisplay}/>, document.getElementById("contentOfDiv"));
  }

  changeDisplay(value){
    this.setState({
      displayPage: value
    });
  }


  render() {

    const LoginMain = () =>{
      return(
        <div>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <br/><br/>
            <p> Welcome to <b>Shrek's</b> CV library </p>
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
        {this.state.displayPage===1 && <UserMain/>}
        {this.state.displayPage===2 && <AdminMain/>}
      </div>
    );

  }
}

export default App;
