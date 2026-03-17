import { Author, TalkTheme } from "./types";
import { supabase } from "./supabaseClient";

const MAX_IMAGE_WIDTH = 800;
const IMAGE_QUALITY = 0.6;

/** 画像をリサイズ＆圧縮してbase64で返す（必要に応じてStorageへのアップロードに差し替え可能） */
export function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        if (width > MAX_IMAGE_WIDTH) {
          height = (height * MAX_IMAGE_WIDTH) / width;
          width = MAX_IMAGE_WIDTH;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL("image/jpeg", IMAGE_QUALITY);
        resolve(compressed);
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function getThemes(): Promise<TalkTheme[]> {
  const { data, error } = await supabase
    .from("talk_themes")
    .select("*")
    .order("created_at", { ascending: false });
    
  if (error) {
    console.error("Error fetching themes:", error);
    return [];
  }
  return data as TalkTheme[];
}

export async function addTheme(input: {
  text: string;
  author: Author;
  memo?: string;
  photos?: string[];
}): Promise<TalkTheme> {
  const newTheme = {
    text: input.text,
    author: input.author,
    status: "pending",
    ...(input.memo ? { memo: input.memo } : {}),
    ...(input.photos && input.photos.length > 0 ? { photos: input.photos } : {}),
  };

  const { data, error } = await supabase
    .from("talk_themes")
    .insert([newTheme])
    .select()
    .single();

  if (error) {
    console.error("Error adding theme:", error);
    throw error;
  }
  
  return data as TalkTheme;
}

export async function markAsDone(id: string): Promise<void> {
  const { error } = await supabase
    .from("talk_themes")
    .update({ 
      status: "done",
      done_at: new Date().toISOString()
    })
    .eq("id", id);

  if (error) {
    console.error("Error marking as done:", error);
    throw error;
  }
}

export async function getPendingThemes(): Promise<TalkTheme[]> {
  const { data, error } = await supabase
    .from("talk_themes")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });
    
  if (error) {
    console.error("Error fetching pending themes:", error);
    return [];
  }
  return data as TalkTheme[];
}

export async function getDoneThemes(): Promise<TalkTheme[]> {
  const { data, error } = await supabase
    .from("talk_themes")
    .select("*")
    .eq("status", "done")
    .order("done_at", { ascending: false });
    
  if (error) {
    console.error("Error fetching done themes:", error);
    return [];
  }
  return data as TalkTheme[];
}
