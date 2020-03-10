import React, { Component } from "react";
import { connect } from "react-redux";
import "./Tabs.css";
import { changeTab } from "../../../actions/mainActions";

class Tabs extends Component {
  onTabClick(tabNum) {
    this.props.changeTab({
      selectedTab: tabNum
    });
  }

  render() {
    const activeStyle = "iTab active";
    const normalStyle = "iTab";
    const activeTabNum = this.props.activeTab;

    return (
      <div className="tabs">
        {this.props.tabsArray.map((tab, i) => (
          <div
            onClick={() => this.onTabClick(i)}
            className={i === activeTabNum ? activeStyle : normalStyle}
          >
            <div className="metric">{tab.value}</div>
            <div className="text">{tab.text}</div>
          </div>
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changeTab: obj => dispatch(changeTab(obj))
});

const mapStateToProps = state => ({
  mainReducer: state.mainReducer,
  tabsArray: state.mainReducer.tabsArray,
  activeTab: state.mainReducer.activeTab
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tabs);
