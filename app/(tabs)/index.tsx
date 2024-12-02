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
import { useAudio } from "@/providers/AudioProvider";

export default function Discover() {
  const colorScheme = useColorScheme() ?? "light";
  const { data: clips } = useClipsQuery();

  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>();

  const audio = useAudio();

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const firstVisibleItem = viewableItems[0].item;

      if (currentlyPlaying !== firstVisibleItem.id) {
        audio?.playAudio({
          audio_url: firstVisibleItem.audio_url,
          id: firstVisibleItem.id,
        });
      }
    } else {
      audio?.stopAudio();
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
              />
            );
          }}
          keyExtractor={(item) => item.id}
          style={styles.list}
          pagingEnabled
          horizontal={false}
          showsVerticalScrollIndicator={false}
          snapToInterval={height}
          decelerationRate="fast"
          onViewableItemsChanged={onViewableItemsChanged.current}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
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
