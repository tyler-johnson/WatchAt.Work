import * as React from "react";
import { useAppState } from "./state";

export const Chat: React.FC = function() {
  const [{ channel }] = useAppState();
  return channel ? (
    <iframe
      className="twitch-chat"
      frameBorder="0"
      scrolling="no"
      src={`https://www.twitch.tv/embed/${channel}/chat`}
    />
  ) : null;
};
