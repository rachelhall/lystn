import { StyleSheet, View, Text } from "react-native";

import Slider from "@react-native-community/slider";

import { useAudio } from "@/providers/AudioProvider";

interface IProps {}
export default function AudioPlaybackVisualizer({}: IProps) {
  const audio = useAudio();

  return (
    <View style={styles.container}>
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={0}
        maximumValue={audio?.duration}
        value={audio?.position}
        onValueChange={(value) => audio?.seek(value)}
        onSlidingStart={audio?.startScrubbing}
        onSlidingComplete={(value) => {
          audio?.seek(value);
          audio?.stopScrubbing();
        }}
      />
      <View style={styles.timeContainer}>
        <Text>{formatTime(audio?.position ?? 0)}</Text>
        <Text>{formatTime(audio?.duration ?? 0)}</Text>
      </View>
    </View>
  );
}

const formatTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
});
