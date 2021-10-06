import Redux from "redux";

// updates our video list in our state
var videoListReducer = (state = sampleData, action) => {
  switch (action.type) {
    case 'CHANGE_VIDEO_LIST':
      return action.videos;
    // Appending, states don't render if you just append
    // create a new array array.slice() -> this.setState({})
    // replacing previous state whatever you return
    default:
      return state;
  }
};

export default videoListReducer;
