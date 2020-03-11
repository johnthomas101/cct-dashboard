import React, { Component } from "react";
import "./Content.css";
import ReactBar from "../../Charts/ReactBar/ReactBar";
import { fetchBarConfig } from "../../Charts/configs.js";

export default class Content extends Component {
  render() {
    return (
      <div className="contentCont">
        <div className="contentSection">
          <div className="contentHeader">Across Departments</div>
          <div className="contentChart">
            <ReactBar config={fetchBarConfig()} />
          </div>
        </div>
        <div className="contentSection">
          <div className="contentHeader">Across Grades</div>
          <div className="contentChart">
            <ReactBar config={fetchBarConfig()} />
          </div>
        </div>
        <div className="contentSection">
          <div className="contentHeader">Across Locations</div>
          <div className="contentChart">
            <ReactBar config={fetchBarConfig()} />
          </div>
        </div>
      </div>
    );
  }
}
