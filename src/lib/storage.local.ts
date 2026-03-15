import { v4 as uuidv4 } from "uuid";
import { Author, TalkTheme } from "./types";

const STORAGE_KEY = "oshaberi-san-themes";
const MAX_IMAGE_WIDTH = 800;
const IMAGE_QUALITY = 0.6;

function loadThemes(): TalkTheme[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as TalkTheme[];
  } catch {
    return [];
  }
}

function saveThemes(themes: TalkTheme[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(themes));
}

/** 画像をリサイズ＆圧縮してbase64で返す */
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
  return loadThemes();
}

export async function addTheme(input: {
  text: string;
  author: Author;
  memo?: string;
  photos?: string[];
}): Promise<TalkTheme> {
  const themes = loadThemes();
  const newTheme: TalkTheme = {
    id: uuidv4(),
    text: input.text,
    author: input.author,
    created_at: new Date().toISOString(),
    status: "pending",
    ...(input.memo ? { memo: input.memo } : {}),
    ...(input.photos && input.photos.length > 0 ? { photos: input.photos } : {}),
  };
  themes.push(newTheme);
  saveThemes(themes);
  return newTheme;
}

export async function markAsDone(id: string): Promise<void> {
  const themes = loadThemes();
  const theme = themes.find((t) => t.id === id);
  if (theme) {
    theme.status = "done";
    theme.done_at = new Date().toISOString();
    saveThemes(themes);
  }
}

export async function getPendingThemes(): Promise<TalkTheme[]> {
  return loadThemes().filter((t) => t.status === "pending");
}

export async function getDoneThemes(): Promise<TalkTheme[]> {
  return loadThemes()
    .filter((t) => t.status === "done")
    .sort(
      (a, b) =>
        new Date(b.done_at || 0).getTime() -
        new Date(a.done_at || 0).getTime()
    );
}
