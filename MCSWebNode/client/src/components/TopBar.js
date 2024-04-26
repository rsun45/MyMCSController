import React from "react";
import './TopBar.css';
import logo from '../img/logo-final.png';
import Clock from 'react-live-clock';

export default function TopBar() {

  return (
    <div className="TopBar">
      <a href="/">
        <img src={logo}  alt="MACHINE CONTROL SOLUTION"  height="70%" />
      </a>


      <div style={{float: "right", paddingTop:"15px", color:"white" }}>
        <Clock
          format={'dddd, MMMM Do YYYY, h:mm:ss a'}
          ticking={true} />
      </div>

    </div>
  );
}
