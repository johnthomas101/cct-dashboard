import React, { Component } from "react";
import "./Header.css";
import logo from "../../assets/header-logo.png";

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <div>
          <img src={logo} alt="Logo" />
        </div>
        <div className="headerText">CCT Dashboard</div>
      </div>
    );
  }
}
