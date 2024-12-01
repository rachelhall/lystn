import { StyleSheet, View, Dimensions, useColorScheme } from "react-native";

import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import Clip from "@/components/Clip";

import { Colors } from "@/constants/Colors";
import { useEffect, useRef, useState } from "react";

import { IClip } from "@/lib/types/IClip";
import { useClipsQuery } from "@/queries/useClipsQuery";

const { height } = Dimensions.get("window");
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";

export default function Discover() {
  const colorScheme = useColorScheme() ?? "light";
  const { data: clips } = useClipsQuery();

  const audioRef = useRef<Sound | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>();

  const playAudio = async (audio_url: string, id: string) => {
    if (audioRef.current) {
      await audioRef.current.stopAsync();
      await audioRef.current.unloadAsync();
    }
    const { sound } = await Audio.Sound.createAsync(
      { uri: audio_url },
      { shouldPlay: true }
    );
    audioRef.current = sound;

    await audioRef.current.playAsync();
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

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const firstVisibleItem = viewableItems[0].item;

      if (currentlyPlaying !== firstVisibleItem.id) {
        playAudio(firstVisibleItem.audio_url, firstVisibleItem.id);
      }
    } else {
      stopAudio();
    }
  });

  return (
    <GestureHandlerRootView>
      <View
        style={[
          styles.discover,
          { backgroundColor: Colors[colorScheme].background },
        ]}
      >
        <FlatList
          initialNumToRender={7}
          data={clips}
          renderItem={({ item }: { item: IClip }) => {
            return (
              <Clip
                id={item.id}
                title={item.title}
                subtitle={item.subtitle}
                type={item.type}
                description={item.description}
                audio_url={item.audio_url}
              />
            );
          }}
          keyExtractor={(item) => item.id}
          style={styles.list}
          pagingEnabled
          horizontal={false}
          showsVerticalScrollIndicator={false}
          snapToInterval={height} // Snap to full screen for each item
          decelerationRate="fast" // For smooth scrolling
          onViewableItemsChanged={onViewableItemsChanged.current}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50, // Adjust this threshold as needed
          }}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  discover: { flex: 1 },
  list: { flex: 1 },
});
