declare global {
  namespace Twitch {
    namespace Player {
      interface BaseOptions {
        channel?: string;
        video?: string;
        collection?: string;
        height: number;
        width: number;
      }

      interface ChannelOptions extends BaseOptions {
        channel: string;
      }

      interface VideoOptions extends BaseOptions {
        video: string;
      }

      interface CollectionOptions extends BaseOptions {
        video: string;
      }

      type Options = ChannelOptions | VideoOptions | CollectionOptions;

      type ENDED = "ENDED";
      type PAUSE = "PAUSE";
      type PLAY = "PLAY";
      type PLAYBACK_BLOCKED = "PLAYBACK_BLOCKED";
      type PLAYING = "PLAYING";
      type OFFLINE = "OFFLINE";
      type ONLINE = "ONLINE";
      type READY = "READY";

      type EventName = ENDED | PAUSE | PLAY | PLAYBACK_BLOCKED | PLAYING | OFFLINE | ONLINE | READY;
    }

    interface Player {
      pause(): void;
      play(): void;
      seek(timstamp: number): void;
      setChannel(channel: string): void;
      setCollection(collectionId: string, videoId: string): void;
      setQuality(quality: string): void;
      setVideo(videoId: string, timestamp: number): void;
      getMuted(): boolean;
      setMuted(muted: boolean): void;
      getVolume(): number;
      setVolume(volumelevel: number): void;
      getChannel(): string;
      getCurrentTime(): number;
      getDuration(): number;
      getEnded(): boolean;
      getPlaybackStats(): Object;
      getQualities(): string[];
      getQuality(): string;
      getVideo(): string;
      isPaused(): boolean;
      addEventListener(eventName: Twitch.Player.EventName, callback: () => any): void;
      removeEventListener(eventName: Twitch.Player.EventName, callback: () => any): void;
      destroy(): void;
    }

    interface PlayerClass {
      new (selector: string, options: Player.Options): Player;
      ENDED: Twitch.Player.ENDED;
      PAUSE: Twitch.Player.PAUSE;
      PLAY: Twitch.Player.PLAY;
      PLAYBACK_BLOCKED: Twitch.Player.PLAYBACK_BLOCKED;
      PLAYING: Twitch.Player.PLAYING;
      OFFLINE: Twitch.Player.OFFLINE;
      ONLINE: Twitch.Player.ONLINE;
      READY: Twitch.Player.READY;
    }

    const Player: PlayerClass;
  }
}

// so it shuts up?
export {};
