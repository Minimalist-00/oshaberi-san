import { v4 as uuidv4 } from "uuid";
import { Author, TalkTheme } from "./types";

const STORAGE_KEY = "oshaberi-san-themes";

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

export async function getThemes(): Promise<TalkTheme[]> {
  return loadThemes();
}

export async function addTheme(input: {
  text: string;
  author: Author;
}): Promise<TalkTheme> {
  const themes = loadThemes();
  const newTheme: TalkTheme = {
    id: uuidv4(),
    text: input.text,
    author: input.author,
    created_at: new Date().toISOString(),
    status: "pending",
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
