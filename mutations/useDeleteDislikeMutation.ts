import { supabase } from "@/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteDislikeMutation = ({
  clipId,
  profileId,
}: {
  clipId: string;
  profileId: string;
}) => {
  const queryClient = useQueryClient();
  const deleteDislike = async () => {
    await supabase.from("dislikes").delete().eq("clip_id", clipId);
  };

  return useMutation({
    mutationFn: deleteDislike,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dislikes", profileId, clipId],
      });
    },
  });
};
