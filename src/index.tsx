import "./index.css";
import * as React from "react";
import ReactDOM from "react-dom";
import { Player, useLoadTwitchEmbedJS } from "./player";
import { Provider } from "./state";
import { Header } from "./header";

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

ReactDOM.render(<App />, document.getElementById("root"));
