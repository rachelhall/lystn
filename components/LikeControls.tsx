import { useColorScheme, View, StyleSheet } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useCreateLikeMutation } from "@/mutations/useCreateLikeMutation";
import { useDeleteLikeMutation } from "@/mutations/useDeleteLikeMutation";
import { Colors } from "@/constants/Colors";
import { useLikesQuery } from "@/queries/useLikesQuery";
import { useDislikesQuery } from "@/queries/useDislikesQuery";
import { useCreateDislikeMutation } from "@/mutations/useCreateDislikeMutation";
import { useDeleteDislikeMutation } from "@/mutations/useDeleteDislikeMutation";

interface IProps {
  clipId: string;
  profileId: string;
}
export default function LikeControls({ clipId, profileId }: IProps) {
  const colorScheme = useColorScheme() ?? "light";

  const { data: likes } = useLikesQuery({ profileId, clipId });
  const { data: dislikes } = useDislikesQuery({ profileId, clipId });

  const colors = Colors[colorScheme];

  const createLikeMutation = useCreateLikeMutation({ clipId });

  const deleteLikeMutation = useDeleteLikeMutation({
    clipId,
    profileId,
  });

  const createDislikeMutation = useCreateDislikeMutation({ clipId });

  const deleteDislikeMutation = useDeleteDislikeMutation({
    clipId,
    profileId,
  });

  const handleLikeClip = () => {
    if (isDisliked) {
      handleUnDislikeClip();
    }
    createLikeMutation.mutate();
  };

  const handleUnlikeClip = () => {
    deleteLikeMutation.mutate();
  };

  const handleDislikeClip = () => {
    if (isLiked) {
      handleUnlikeClip();
    }
    createDislikeMutation.mutate();
  };

  const handleUnDislikeClip = () => {
    deleteDislikeMutation.mutate();
  };

  const isLiked = likes?.some((item) => item.clip_id === clipId);

  const isDisliked = dislikes?.some((item) => item.clip_id === clipId);

  return (
    <View style={styles.container}>
      {isLiked ? (
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

      {isDisliked ? (
        <FontAwesome
          onPress={handleUnDislikeClip}
          name="thumbs-down"
          size={54}
          color={colors.icon}
        />
      ) : (
        <FontAwesome
          onPress={handleDislikeClip}
          name="thumbs-o-down"
          size={54}
          color={colors.icon}
        />
      )}
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
