import React from "react";
import './TopBar.css';
import logo from '../img/logo-final.png';

export default function TopBar() {

  return (
    <div className="TopBar">
      <a href="/">
        <img src={logo}  alt="MACHIN CONTROL SOLUTION"  height="100%" />
      </a>
    </div>
  );
}
