import * as React from "react";
import { Player } from "./player";
import { Provider } from "./state";
import { Header } from "./header";

export const App: React.FC = function() {
  return (
    <div className="app">
      <Provider>
        <Header />
        <Player />
      </Provider>
    </div>
  );
};
