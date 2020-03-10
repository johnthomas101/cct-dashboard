import React, { Component } from "react";
import "./Header.css";

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <div>Logo</div>
        <div className="headerText">CCT Dashboard</div>
      </div>
    );
  }
}
