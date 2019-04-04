import * as React from "react";
import produce from "immer";

export interface State {
  channel?: string;
  minimized?: boolean;
  videoHeight?: number;
}

export const defaultState: State = {
  videoHeight: 300,
  minimized: false,
};

export type Action = ActionSetChannel | ActionToggleMinimized | ActionSetVideoHeight;
export type Dispatch = (action: Action) => void;

export interface ActionSetChannel {
  type: "set-channel";
  channel?: string;
}

export function makeActionSetChannel(channel?: string): ActionSetChannel {
  return { type: "set-channel", channel };
}

export interface ActionToggleMinimized {
  type: "toggle-minimized";
}

export function makeActionToggleMinimized(): ActionToggleMinimized {
  return { type: "toggle-minimized" };
}

export interface ActionSetVideoHeight {
  type: "set-video-height";
  height?: number;
}

export function makeActionSetVideoHeight(height?: number): ActionSetVideoHeight {
  return { type: "set-video-height", height };
}

function reducer(state: State, action: Action) {
  const nextState = produce(state, (draft) => {
    switch (action.type) {
      case "set-channel":
        draft.channel = action.channel || undefined;
        break;
      case "toggle-minimized":
        draft.minimized = !draft.minimized;
        break;
      case "set-video-height":
        draft.videoHeight =
          action.height != null ? Math.min(window.innerHeight - 300, Math.max(100, action.height)) : undefined;
        break;
    }
  });

  saveToStorage(nextState);
  return nextState;
}

export type Value = [State, Dispatch];

export const Context = React.createContext<Value>([{}, () => {}]);
Context.displayName = "StateContext";

function loadFromStorage(initialState: State): State {
  try {
    const value = localStorage.getItem("twitchat.work_data");
    if (value == null) return initialState;
    return JSON.parse(value);
  } catch (err) {
    return initialState;
  }
}

function saveToStorage(state: State) {
  localStorage.setItem("twitchat.work_data", JSON.stringify(state));
}

export const Provider: React.FC<{ initialState?: State }> = function({ initialState = defaultState, children }) {
  const value = React.useReducer(reducer, initialState, (i) => loadFromStorage(i || {}));
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export function useAppState() {
  return React.useContext(Context);
}
