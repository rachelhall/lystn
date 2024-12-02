import AudioPlaybackVisualizer from "@/components/AudioPlaybackVisualizer";
import { supabase } from "@/lib/supabase";

import { useAudio } from "@/providers/AudioProvider";

import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import { Button, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { fromByteArray } from "base64-js";

import UploadClipForm from "@/components/UploadClipForm";
import { useCreateClipMutation } from "@/mutations/useCreateClipMutation";

export default function Create() {
  const createClipMutation = useCreateClipMutation();
  const [uploadStatus, setUploadStatus] = useState("");
  const [showScrubber, setShowScrubber] = useState(false);
  const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(
    null
  );

  const audio = useAudio();

  const handleOpenDocumentPicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        console.log("File selection canceled.");
        return;
      }
      setFile(result.assets[0]);
      const { uri, name } = result.assets[0];

      if (result.assets[0].uri) {
        setShowScrubber(true);
        audio?.playAudio({ audio_url: uri, id: name });
      }
    } catch (error) {
      console.error("Error picking/uploading file:", error);
      setUploadStatus("An error occurred.");
    }
  };

  const createClip = ({
    title,
    subtitle,
    description,
    audioUrl,
    content_type,
  }: {
    title: string;
    subtitle: string;
    description: string;
    audioUrl: string;
    content_type: ["podcast"];
  }) => {
    createClipMutation.mutate({ title, subtitle, description, audioUrl });
  };

  const handleSubmit = async ({
    title,
    subtitle,
    description,
  }: {
    title: string;
    subtitle: string;
    description: string;
  }) => {
    try {
      if (file) {
        const { uri, name } = file;

        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const fileType = name.split(".").pop();

        const arrayBuffer = fromByteArray(base64);

        const { data, error } = await supabase.storage
          .from("clips")
          .upload(`${name}`, arrayBuffer, {
            contentType: `audio/${fileType}`,
          });

        const { data: urlData } = supabase.storage
          .from("public-bucket")
          .getPublicUrl(`clips/${data?.fullPath}`);

        if (error) {
          console.error("Upload error:", error.message);

          setUploadStatus("Upload failed: " + error.message);
        } else {
          console.log("File uploaded:", data);

          const clipRes = createClip({
            title,
            subtitle,
            description,
            audioUrl: urlData.publicUrl,
            content_type: ["podcast"],
          });
          console.log({ clipRes });

          setUploadStatus("Upload successful!");
        }
      }
    } catch (error) {
      console.error("Error picking/uploading file:", error);
      setUploadStatus("An error occurred.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Create</Text>
      <Button onPress={handleOpenDocumentPicker} title="Select" />
      {showScrubber && <AudioPlaybackVisualizer />}
      <UploadClipForm onSubmit={handleSubmit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16 },
});
