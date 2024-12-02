import { supabase } from "@/lib/supabase";
import { useProfileQuery } from "@/queries/useProfileQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateClipMutation = () => {
  const queryClient = useQueryClient();
  const { data: profile } = useProfileQuery();

  const createClip = async ({
    title,
    subtitle,
    description,
    audioUrl,
  }: {
    title: string;
    subtitle: string;
    description: string;
    audioUrl: string;
  }) => {
    await supabase.from("clips").insert({
      title,
      subtitle,
      description,
      audio_url: audioUrl,
      uploaded_by: profile?.id,
    });
  };

  return useMutation({
    mutationFn: createClip,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["clips"],
      });
    },
  });
};
