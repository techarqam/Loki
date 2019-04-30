import React from 'react';
import ReactDOM from 'react-dom'; 
import '../css/Base.css'; 

class Base extends React.Component {
    
  render() { 
    let session = JSON.parse( sessionStorage.getItem("session"));
    return (
    <div></div>
    );
  }
}

export default Base;
