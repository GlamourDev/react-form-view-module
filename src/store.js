import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { uiStateReducer } from "react-redux-ui-state";

const rootReducer = combineReducers({ 
  form: reduxFormReducer, // mounted under "form"
  uiState: uiStateReducer,
});

const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(rootReducer);

export default store;
