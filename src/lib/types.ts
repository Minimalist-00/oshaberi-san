export type Author = "こーき" | "みずき";

export type TalkTheme = {
  id: string;
  text: string;
  author: Author;
  created_at: string;
  status: "pending" | "done";
  done_at?: string;
};
