import React, { Component } from 'react';
import '../css/Login.css';
class Home extends Component {
  render() {
    let session = JSON.parse(sessionStorage.getItem("session"));
    let d = new Date();
    let time = d.getHours();
    let greeting = "welcome!";
    if (time < 12) {
      greeting = "Good morning!";
    }
    if (time > 12) {
      greeting = "Good afternoon!";
    }
    if (time == 12) {
      greeting = "Go eat lunch!";
    }
    return (
      <div  >
        <h3>Home</h3>
        <h4> {greeting}   {session.user.name}</h4>
      </div>
    );
  }
}

export default Home;
