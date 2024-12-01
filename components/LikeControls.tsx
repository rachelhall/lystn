import { useColorScheme, View, StyleSheet } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useCreateLikeMutation } from "@/mutations/useCreateLikeMutation";
import { useDeleteLikeMutation } from "@/mutations/useDeleteLikeMutation";
import { Colors } from "@/constants/Colors";

interface IProps {
  clipId: string;
  profileId: string;
  likes: any[] | null | undefined;
}
export default function LikeControls({ clipId, profileId, likes }: IProps) {
  const colorScheme = useColorScheme() ?? "light";

  if (!colorScheme) {
    // You can handle the case where the colorScheme is null or undefined if needed
    return null; // Or set a default theme
  }
  const colors = Colors[colorScheme];
  const createLikeMutation = useCreateLikeMutation({ clipId });

  const deleteLikeMutation = useDeleteLikeMutation({
    clipId,
    profileId,
  });

  const handleLikeClip = () => {
    createLikeMutation.mutate();
  };

  const handleUnlikeClip = () => {
    console.log("handle unlike");
    deleteLikeMutation.mutate();
  };
  return (
    <View style={styles.container}>
      {likes?.length ? (
        <FontAwesome
          onPress={handleUnlikeClip}
          name="thumbs-up"
          size={54}
          color={colors.icon}
        />
      ) : (
        <FontAwesome
          onPress={handleLikeClip}
          name="thumbs-o-up"
          size={54}
          color={colors.icon}
        />
      )}

      <FontAwesome name="thumbs-o-down" size={54} color={colors.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 48,
    justifyContent: "space-around",
    margin: 48,
  },
});
