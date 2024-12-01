import { Session } from "@supabase/supabase-js";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { supabase } from "@/lib/supabase";

import { Button, Input } from "react-native-elements";
import { Collapsible } from "./Collapsible";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

interface IProps {
  firstName: string;
  setFirstName: (input: string) => void;
  lastName: string;
  setLastName: (input: string) => void;
  username: string;
  setUsername: (input: string) => void;
  website: string;
  setWebsite: (input: string) => void;
  session: Session | null;
  handlePress: () => void;
  handleClose: () => void;
}
export default function AccountForm({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  username,
  setUsername,
  website,
  setWebsite,
  session,
  handlePress,
  handleClose,
}: IProps) {
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Input label="Email" value={session?.user?.email} disabled />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="First name"
            value={firstName || ""}
            onChangeText={(text) => setFirstName(text)}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Last name"
            value={lastName || ""}
            onChangeText={(text) => setLastName(text)}
          />
        </View>

        <View style={styles.verticallySpaced}>
          <Input
            label="Username"
            value={username || ""}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Website"
            value={website || ""}
            onChangeText={(text) => setWebsite(text)}
          />
        </View>

        <View style={[styles.row, styles.mt20]}>
          <Button
            title={loading ? "Loading ..." : "Update"}
            onPress={handlePress}
            disabled={loading}
          />
          <Button
            title={loading ? "Loading ..." : "Cancel"}
            onPress={handleClose}
            disabled={loading}
          />
        </View>

        <View style={styles.verticallySpaced}>
          <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
});
