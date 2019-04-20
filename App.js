import React from "react";
// import ImagePicker from './src/components/ImagePicker';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import reducers from "./src/redux/";
import Index from "./src/index";

export default class App extends React.Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}
