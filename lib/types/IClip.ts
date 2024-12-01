export interface IClip {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  audio_url: string;
  type: "podcast" | "voice memo" | "music" | null;
}
