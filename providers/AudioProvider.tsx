import { Sound } from "expo-av/build/Audio";
import { Audio } from "expo-av";
import {
  createContext,
  MutableRefObject,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type TAudioContext = {
  isScrubbing: MutableRefObject<boolean>;
  duration: number;
  playAudio: ({ audio_url, id }: { audio_url: string; id: string }) => void;
  position: number;
  stopAudio: () => void;
  onSliderChange: (value: any) => void;
  onSliderComplete: (valeu: any) => void;
  currentlyPlaying: string | null;
  togglePlayback: () => void;
  startScrubbing: () => void;
  stopScrubbing: () => void;
  seek: (position: number) => Promise<void>;
};

export const AudioContext = createContext<TAudioContext | null>(null);

interface IProps extends PropsWithChildren {}

export const AudioProvider = ({ children }: IProps) => {
  const audioRef = useRef<Sound | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const isScrubbing = useRef(false);

  // const loadSound = async ({
  //   audio_url,
  //   id,
  // }: {
  //   audio_url: string;
  //   id: string;
  // }) => {
  //   if (audioRef.current) {
  //     await audioRef.current.stopAsync();
  //     await audioRef.current.unloadAsync();
  //   }
  //   const { sound } = await Audio.Sound.createAsync(
  //     { uri: audio_url },
  //     { shouldPlay: true },
  //     onPlaybackStatusUpdate
  //   );
  //   audioRef.current = sound;
  // };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded && !isScrubbing.current) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
    }
  };

  const togglePlayback = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      await audioRef.current.pauseAsync();
    } else {
      await audioRef.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const onSliderChange = (value) => {
    setPosition(value);
  };

  const onSliderComplete = async (value) => {
    isScrubbing.current = false;
    if (audioRef.current) {
      await audioRef.current.setPositionAsync(value);
    }
  };

  const playAudio = async ({
    audio_url,
    id,
  }: {
    audio_url: string;
    id: string;
  }) => {
    if (audioRef.current) {
      await audioRef.current.stopAsync();
      await audioRef.current.unloadAsync();
    }
    const { sound } = await Audio.Sound.createAsync(
      { uri: audio_url },
      { shouldPlay: true },
      onPlaybackStatusUpdate
    );
    audioRef.current = sound;

    await audioRef.current?.playAsync();
    setCurrentlyPlaying(id);
  };

  const stopAudio = async () => {
    if (audioRef.current) {
      await audioRef.current.stopAsync();
      await audioRef.current.unloadAsync();
      audioRef.current = null;
    }
    setCurrentlyPlaying(null);
  };

  const seek = async (position: number) => {
    if (audioRef.current) {
      await audioRef.current.setPositionAsync(position);
      await audioRef.current.playAsync();
    }
  };

  const startScrubbing = () => {
    isScrubbing.current = true;
  };

  const stopScrubbing = async () => {
    isScrubbing.current = false;
    if (audioRef.current) {
      const status = await audioRef.current.getStatusAsync();
      console.log({ status });
      setPosition(status.positionMillis || 0);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.unloadAsync(); // Clean up on unmount
      }
    };
  }, [audioRef]);

  return (
    <AudioContext.Provider
      value={{
        duration,
        playAudio,
        position,
        onSliderChange,
        onSliderComplete,
        stopAudio,
        isScrubbing,
        startScrubbing,
        stopScrubbing,
        currentlyPlaying,
        togglePlayback,
        seek,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  return context;
};
