import { useEffect } from "react";

import { supabase } from "@/lib/supabase";
import { router } from "expo-router";

export default function App() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/(tabs)");
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)/signIn");
      }
    });
  }, []);
}
