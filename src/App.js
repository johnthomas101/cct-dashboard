import React, { Component } from "react";
import "./styles.css";
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Gap from "./components/Gap/Gap";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Gap />
        <Body />
      </div>
    );
  }
}
