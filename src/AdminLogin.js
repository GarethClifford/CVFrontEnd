import React, { Component } from 'react';

class AdminLogin extends Component {

login = () => {
  if (document.getElementById('userName').value === 'alvin') {
    window.alert("Sorry Alvin, the page is currently under construction, please try again later. So sorry please forgive me!")
  } else {
  window.alert("Username or password not found, please try again")
}
}

  render() {
    return (
      <div>
      <br/>
        <input id="userName" type = "text" placeholder = "Username" className ="form-control" style={{width:'200px'}} />
        <br/>
        <input id="password" type = "password" placeholder = "Password" className ="form-control" style={{width:'200px'}} />
        <br/>
        <button className="btn btn-success" onClick={this.login}>Login</button>
        </div>
    )}
  }

export default AdminLogin;
