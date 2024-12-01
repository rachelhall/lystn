import FontAwesome from "@expo/vector-icons/FontAwesome";
import { View, StyleSheet } from "react-native";

export default function LikeButtons {
    return (
        <View style={styles.iconContainer}>
        <FontAwesome
          onPress={handleLikeClip}
          name="thumbs-o-up"
          size={54}
          color={colors.icon}
        />

        <FontAwesome name="thumbs-o-down" size={54} color={colors.icon} />
      </View>
    )
}

const styles = StyleSheet.create({  iconContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 48,
    justifyContent: "space-around",
    margin: 48,
  },})