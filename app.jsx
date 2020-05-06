import React, { Component } from "react";
import { render } from "react-dom";
import Index from "@/index";
import { Provider } from "mobx-react";
import store from "@/store";

import "./app.less";
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider {...store}>
        <Index />
      </Provider>
    );
  }
}

render(<App />, document.getElementById("main"));
