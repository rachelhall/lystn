import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const useDislikesQuery = ({
  profileId,
  clipId,
}: {
  profileId: string;
  clipId: string;
}) => {
  const getDislikes = async () => {
    const { data } = await supabase
      .from("dislikes")
      .select()
      .eq("profile_id", profileId)
      .eq("clip_id", clipId);
    return data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dislikes", profileId, clipId],
    queryFn: getDislikes,
    enabled: !!profileId && !!clipId,
  });

  return {
    data,
    isLoading,
    isError,
  };
};
