import React from "react";
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';

import Store from "./store";
import registerServiceWorker from './registerServiceWorker';





ReactDOM.render(
  <Provider store={Store}>

    <hr className="body-divider"></hr>
    <App />
  </Provider>,
  document.getElementById('root'));
  
registerServiceWorker();
