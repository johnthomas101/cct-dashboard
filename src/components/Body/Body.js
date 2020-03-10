import React, { Component } from "react";
import "./Body.css";
import Tabs from "./Tabs/Tabs";
import Gap from "../Gap/Gap";
import Content from "./Content/Content";

export default class Body extends Component {
  render() {
    return (
      <div className="body">
        <Tabs />
        <Gap />
        <Content />
      </div>
    );
  }
}
