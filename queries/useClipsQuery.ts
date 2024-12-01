import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const useClipsQuery = () => {
  const fetchClips = async () => {
    const { data } = await supabase.from("clip").select();
    return data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["clips"],
    queryFn: fetchClips,
  });

  return {
    data,
    isLoading,
    isError,
  };
};
