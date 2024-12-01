import { useQuery } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

export const useProfileQuery = () => {
  const [session, setSession] = useState<Session | null>(null);

  const getSession = () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  };

  useEffect(() => {
    getSession();
  }, []);

  const getProfile = async () => {
    const { data } = await supabase
      .from("profiles")
      .select(`id`)
      .eq("id", session?.user.id)
      .single();
    return data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: !!session?.user?.id,
  });

  return {
    data,
    isLoading,
    isError,
  };
};
