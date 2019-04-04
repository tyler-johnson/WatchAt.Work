import "./twitch-embed";
import * as React from "react";
import load from "./vendor/little-loader";
import { createUseResolver } from "@pagedip/util-react-resolver";
import classnames from "classnames";
// import { closest } from "@pagedip/util-closest";
import { useAppState, makeActionToggleMinimized, makeActionSetVideoHeight } from "./state";
import { throttle } from "lodash";

const loadTwitchEmbed = new Promise<void>((resolve, reject) => {
  load("https://player.twitch.tv/js/embed/v1.js", (err) => {
    err ? reject(err) : resolve();
  });
});

export const useLoadTwitchEmbedJS = createUseResolver<void, void>({
  async resolve() {
    const result = await loadTwitchEmbed;
    return result;
  },
  shouldUpdate() {
    return false;
  },
});

export const Player: React.FC = function() {
  const [dragging, setDragging] = React.useState(false);
  const [{ minimized, videoHeight = 300 }, dispatch] = useAppState();
  const [setHeight] = React.useState(() =>
    throttle((height?: number) => {
      console.log(height);
      dispatch(makeActionSetVideoHeight(height));
    }, 1000 / 30)
  );

  return (
    <div
      className={classnames("player", { dragging, minimized })}
      onMouseDown={(e) => {
        const target = e.target as HTMLElement;
        if (!target.classList.contains("control-bar")) return;

        let onmousemove: (ev: MouseEvent) => any;
        let onmouseup: (ev: MouseEvent) => any;
        let y = e.pageY;
        let height = videoHeight;

        document.addEventListener(
          "mousemove",
          (onmousemove = (evt) => {
            setHeight(height + (evt.pageY - y));
          })
        );

        document.addEventListener(
          "mouseup",
          (onmouseup = () => {
            document.removeEventListener("mousemove", onmousemove);
            document.removeEventListener("mouseup", onmouseup);
            setDragging(false);
          })
        );

        setDragging(true);
      }}
    >
      <div className="click-absorber" />
      <TwitchPlayer />
      <ControlBar />
      <Chat />
    </div>
  );
};

export const TwitchPlayer: React.FC = function() {
  const TwitchPlayerRef = React.useRef<Twitch.Player>();
  const [{ channel, minimized, videoHeight = 300 }] = useAppState();

  React.useEffect(() => {
    if (channel == null) return;

    const el = document.getElementById("twitch-player");
    if (el == null) throw new Error("no element");

    const player = (TwitchPlayerRef.current = new Twitch.Player("twitch-player", {
      channel,
      width: el.offsetWidth,
      height: videoHeight,
    }));

    return () => {
      player.destroy();
      TwitchPlayerRef.current = undefined;
    };
  }, [
    // only the channel, not the height because we only want to recreate the player object when the channel changes
    channel,
  ]);

  React.useEffect(() => {
    const frame: HTMLIFrameElement | null = document.querySelector("#twitch-player > iframe");
    if (frame) frame.height = videoHeight + "px";
  }, [videoHeight]);

  React.useEffect(() => {
    let listener: () => any;
    window.addEventListener(
      "resize",
      (listener = throttle(() => {
        const el = document.getElementById("twitch-player");
        if (el == null) return;

        const frame: HTMLIFrameElement | null = el.querySelector("iframe");
        if (frame) frame.width = el.offsetWidth + "px";
      }, 250))
    );

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  return <div className="twitch-player" id="twitch-player" style={{ height: minimized ? 0 : videoHeight }} />;
};

export const ControlBar: React.FC = function() {
  const [, dispatch] = useAppState();

  return (
    <div className="control-bar">
      <button
        className="minimize"
        onClick={() => {
          dispatch(makeActionToggleMinimized());
        }}
      />
    </div>
  );
};

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
