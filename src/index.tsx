import * as React from "react";
import { Provider } from "./state";
import { Header } from "./header";
import { Player, useLoadTwitchEmbedJS } from "./player";
// import { Chat } from "./chat";

export const App: React.FC = function() {
  return (
    <div className="app">
      <Provider>
        <Header />
        <Body />
      </Provider>
    </div>
  );
};

export const Body: React.FC = function() {
  const { error, loading } = useLoadTwitchEmbedJS();

  if (error) return <div style={{ color: "red" }}>{error.toString()}</div>;

  if (loading) return <div>Loading</div>;

  return <Player />;
};

// import React from 'react';
import ReactDOM from "react-dom";
import "./index.css";
// import App from './App';
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
