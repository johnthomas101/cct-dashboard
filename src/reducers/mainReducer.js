const initialMainState = {
  tabsArray: [
    {
      value: 25,
      text: "No. of people"
    },
    {
      value: 5,
      text: "Avg. days / person"
    },
    {
      value: 10,
      text: "No. of demands open"
    },
    {
      value: 7,
      text: "Avg. days / demand"
    }
  ],
  activeTab: 0
};

const mainReducer = (
  state = JSON.parse(JSON.stringify(initialMainState)),
  action
) => {
  switch (action.type) {
    case "CHANGE_TAB":
      state = {
        ...state,
        activeTab: action.payload.selectedTab
      };
      break;
    default:
      state = {
        ...state
      };
      break;
  }
  return state;
};

export default mainReducer;
