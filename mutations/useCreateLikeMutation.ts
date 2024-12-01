import { supabase } from "@/lib/supabase";
import { useProfileQuery } from "@/queries/useProfileQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateLikeMutation = ({ clipId }: { clipId: string }) => {
  const queryClient = useQueryClient();
  const { data: profile } = useProfileQuery();

  const createLike = async () => {
    await supabase
      .from("likes")
      .insert({ clip_id: clipId, profile_id: profile?.id });
  };

  return useMutation({
    mutationFn: createLike,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["likes", profile?.id, clipId],
      });
    },
  });
};
