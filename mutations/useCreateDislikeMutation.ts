import { supabase } from "@/lib/supabase";
import { useProfileQuery } from "@/queries/useProfileQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateDislikeMutation = ({ clipId }: { clipId: string }) => {
  const queryClient = useQueryClient();
  const { data: profile } = useProfileQuery();
  const createDislike = async () => {
    await supabase
      .from("dislikes")
      .insert({ clip_id: clipId, profile_id: profile?.id });
  };

  return useMutation({
    mutationFn: createDislike,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dislikes", profile?.id, clipId],
      });
    },
  });
};
