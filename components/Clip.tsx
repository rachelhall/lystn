import {
  StyleSheet,
  View,
  Dimensions,
  useColorScheme,
  Text,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { IClip } from "../lib/types/IClip";

import { useProfileQuery } from "@/queries/useProfileQuery";
import { useLikesQuery } from "@/queries/useLikesQuery";

import LikeControls from "./LikeControls";
import { globalStyles } from "@/globalStyles";

import { Audio } from "expo-av";
import { useEffect } from "react";
import { useDislikesQuery } from "@/queries/useDislikesQuery";
import AudioPlaybackVisualizer from "./AudioPlaybackVisualizer";

const { width, height } = Dimensions.get("window");

export default function Clip({ id, title, subtitle, description }: IClip) {
  const colorScheme = useColorScheme() ?? "light";

  const colors = Colors[colorScheme];

  const { data: profile } = useProfileQuery();

  const playSound = async () => {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

    const playbackObject = new Audio.Sound();
    playbackObject.playAsync();
  };

  useEffect(() => {
    playSound();
  }, []);

  return (
    <SafeAreaView
      style={[styles.AudioItem, { backgroundColor: colors.background }]}
    >
      <View style={styles.inner}>
        <Text style={globalStyles.large}>{title}</Text>
        <Text style={globalStyles.medium}>{subtitle}</Text>
        <Text style={{ color: colors.text }}>{description}</Text>
      </View>
      <AudioPlaybackVisualizer />
      <LikeControls profileId={profile?.id} clipId={id} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AudioItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
    width: "100%",
    height,
    minWidth: width,
    paddingBottom: 50,
  },
  image: {
    width: "100%",
    height: "70%",
    resizeMode: "cover",
  },
  inner: {
    padding: 16,
    flex: 1,
    display: "flex",
    justifyContent: "center",
    gap: 24,

    alignItems: "stretch",
  },
});
