import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const useLikesQuery = ({
  profileId,
  clipId,
}: {
  profileId: string;
  clipId: string;
}) => {
  const getLikes = async () => {
    const { data } = await supabase
      .from("likes")
      .select()
      .eq("profile_id", profileId)
      .eq("clip_id", clipId);
    return data;
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["likes", profileId, clipId],
    queryFn: getLikes,
    enabled: !!profileId && !!clipId,
  });
  return {
    data,
    isLoading,
    isError,
  };
};
