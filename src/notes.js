// Initializing
const initialState = [
  { name: "react", count: 0 },
  { name: "angular", count: 0 },
  { name: "vue", count: 0 },
];
​
// Updating
const votesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_VOTE":
      return state.map((vote) => {
        if (action.choice === vote.name)
          return { name: vote.name, count: vote.count + 1 };
        else return vote;
      });
    default:
      return state;
  }
};
​
// Centralizing
const rootReducer = Redux.combineReducers({
  votes: votesReducer,
});
const reduxStore = Redux.createStore(rootReducer);
​
var updateVoteActionCreator = (choiceName) => ({
  type: "ADD_VOTE",
  choice: choiceName,
});
​
/**
 *
 *
 * React-only component definition
 *
 *
 */
​
// Consuming
const VoteComponent = ({ votes, updateVote }) => {
  return (
    <div>
      {votes.map((choice) => (
        <button
          key={choice.name}
          onClick={() => {
            // Triggering
            updateVote(choice.name);
          }}>
          {choice.name} » {choice.count}
        </button>
      ))}
    </div>
  );
};
​
/**
 *
 *
 * Container-ization of the VoteComponent
 *
 *
 */
​
// mapStateToProps
function translateReduxStoreDataToExpectedProps(reduxStoreData) {
  var props = {
    // the prop name "votes" should match what the component expects
    votes: reduxStoreData.votes,
  };
  return props;
}
​
// mapDispatchToProps
function defineEventHandlersUsingReduxDispatch(dispatch) {
  var props = {
    // the prop name "updateVote" should match what the component expects
    updateVote: function (choiceName) {
      dispatch(updateVoteActionCreator(choiceName));
    },
  };
  return props;
}
​
var VoteContainer = ReactRedux.connect(
  translateReduxStoreDataToExpectedProps,
  defineEventHandlersUsingReduxDispatch
)(VoteComponent);
​
// // OR, if you'd like to split up the double-invocation:
// var connectorFn = ReactRedux.connect(
//   translateReduxStoreDataToExpectedProps,
//   defineEventHandlersUsingReduxDispatch
// );
// var VoteContainer = connector(VoteComponent);
​
/**
 *
 *
 * Rendering the Container (data-catcher) inside the Provider (data-thrower)
 *
 *
 */
​
ReactDOM.render(
  <ReactRedux.Provider store={reduxStore}>
    <VoteContainer />
  </ReactRedux.Provider>,
  document.getElementById("redux-app")
);