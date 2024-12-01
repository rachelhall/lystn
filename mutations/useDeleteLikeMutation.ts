import { supabase } from "@/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteLikeMutation = ({
  clipId,
  profileId,
}: {
  clipId: string;
  profileId: string;
}) => {
  const queryClient = useQueryClient();
  const deleteLike = async () => {
    await supabase.from("likes").delete().eq("clip_id", clipId);
  };

  return useMutation({
    mutationFn: deleteLike,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["likes", profileId, clipId],
      });
    },
  });
};
