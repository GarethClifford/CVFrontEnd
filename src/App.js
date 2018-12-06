import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import UserLogin from './UserLogin.js';
import AdminLogin from './AdminLogin.js';

class App extends Component {

  functionLogin = () => {
    ReactDOM.render(<AdminLogin />,document.getElementById('contentOfDiv'));
  }




  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <br/><br/>
          <p> Welcome <b>Ultimate Supreme Commander Alvin's</b> CV library </p>
          <div id='contentOfDiv'>
          <button className='btn btn-primary' onClick={this.functionLogin} > Login </button>
          </div>
        </header>

      </div>
    );
  }
}

export default App;
