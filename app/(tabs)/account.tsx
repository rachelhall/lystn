import { useState, useEffect } from "react";

import { Text, StyleSheet, View, Alert } from "react-native";

import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { Button, Input } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import AccountForm from "@/components/AccountForm";
import { globalStyles } from "@/globalStyles";

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const [editAccount, setEditAccount] = useState(false);

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

  useEffect(() => {
    getSession();
  }, []);

  const getSession = () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  };

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url, first_name, last_name`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
        setFirstName(data.first_name);
        setLastName(data.last_name);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        first_name: firstName,
        last_name: lastName,
        website,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
      setEditAccount(false);
    }
  }

  const handleClose = () => {
    setEditAccount(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {editAccount ? (
        <AccountForm
          username={username}
          setUsername={setUsername}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          website={website}
          setWebsite={setWebsite}
          session={session}
          handlePress={updateProfile}
          handleClose={handleClose}
        />
      ) : (
        <View style={styles.accountInfo}>
          <Text style={globalStyles.large}>
            {firstName} {lastName}
          </Text>
          <Text style={globalStyles.medium}>{username}</Text>
          <Text style={globalStyles.medium}>{website}</Text>
          <Button
            title="Edit account"
            onPress={() => setEditAccount((prevState) => !prevState)}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
    paddingBottom: 54,
    gap: 16,
  },
  accountInfo: {
    gap: 16,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  name: {
    fontSize: 36,
    fontWeight: 900,
  },
});
