import React, { Component } from "react";
import "./Content.css";
import ReactBar from "../../Charts/ReactBar/ReactBar";
import { fetchBarConfig } from "../../Charts/configs.js";

export default class Content extends Component {
  render() {
    return (
      <div className="contentCont">
        <div className="contentSection">
          <ReactBar config={fetchBarConfig()} />
        </div>
        <div className="contentSection">Hii</div>
        <div className="contentSection">Hii</div>
      </div>
    );
  }
}
