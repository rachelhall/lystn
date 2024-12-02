import { IClip } from "@/lib/types/IClip";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

interface IProps {
  onSubmit: (input: {
    title: string;
    subtitle: string;
    description: string;
  }) => void;
}

export default function UploadClipForm(props: IProps) {
  const { onSubmit } = props;

  const [title, setTitle] = useState("Title");
  const [subtitle, setSubtitle] = useState("Subtitle");
  const [description, setDescription] = useState("description");

  const handleSubmit = () => {
    onSubmit({ title, subtitle, description });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Title:</Text>
        <TextInput
          onChangeText={setTitle}
          style={styles.input}
          placeholder="Enter title"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Subtitle:</Text>
        <TextInput
          onChangeText={setSubtitle}
          style={styles.input}
          placeholder="Enter subtitle"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Description:</Text>
        <TextInput
          onChangeText={setDescription}
          style={styles.input}
          placeholder="Enter description"
        />
      </View>
      <Button title="Upload clip" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 24, margin: 16 },
  heading: {
    fontSize: 24,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 32,
    borderWidth: 2,
    borderColor: "#ccc",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
