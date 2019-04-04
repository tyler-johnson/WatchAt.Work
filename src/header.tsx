import * as React from "react";
import { useDebouncedCallback } from "use-debounce";
import { useAppState, makeActionSetChannel } from "./state";

export const Header: React.FC = function() {
  return (
    <header>
      <ChannelSwitcher />
    </header>
  );
};

export const ChannelSwitcher: React.FC = function() {
  const [{ channel }, dispatch] = useAppState();
  const [value, setValue] = React.useState(channel || "");
  const [save] = useDebouncedCallback((value?: string) => dispatch(makeActionSetChannel(value)), 1000, []);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    save(e.target.value);
  }

  return (
    <input
      type="text"
      className="channel-switcher"
      value={value}
      onChange={onChange}
      placeholder="Enter Channel Name..."
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck={false}
    />
  );
};
