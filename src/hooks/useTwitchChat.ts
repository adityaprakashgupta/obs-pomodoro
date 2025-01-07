import { useEffect, useState } from "react";
import ComfyJS from "comfy.js";

interface UseTwitchChatProps {
  channel: string;
  onCommand: (
    user: string | undefined,
    command: string,
    message: string,
    flags: any,
    extra: any
  ) => void;
}

export function useTwitchChat({ channel, onCommand }: UseTwitchChatProps) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!channel?.trim()) return;
    if (isConnected) {
      try {
        console.log("Disconnecting from Twitch chat");
        ComfyJS.Disconnect();
      } catch (error) {
        // Ignore disconnect errors
      }
    }

    const connect = () => {
      try {
        ComfyJS.onConnected = () => {
          console.log("Connected to Twitch chat");
          setIsConnected(true);
        };

        ComfyJS.onCommand = onCommand;

        ComfyJS.Init(channel.trim());
      } catch (error) {
        console.error("Failed to initialize Twitch chat:", error);
      }
    };

    connect();

    return () => {
      if (isConnected) {
        try {
          console.log("Disconnecting from Twitch chat");
          ComfyJS.Disconnect();
        } catch (error) {
          // Ignore disconnect errors
        }
      }
      setIsConnected(false);
    };
  }, []);
}
