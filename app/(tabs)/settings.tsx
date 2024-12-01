import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

import { useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const [user, setUser] = useState<User | null>();
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
      } else {
        Alert.alert("Error accessing user.");
      }
    });
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error signing out user:", error.message);
    }
  };
  return (
    <SafeAreaView>
      <Text>Settings page</Text>
      <Button title={"Sign out"} onPress={handleSignOut} />
    </SafeAreaView>
  );
}
