import { TalkTheme } from "@/lib/types";

type Props = {
  theme: TalkTheme;
  showDoneDate?: boolean;
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}/${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${d.getDate().toString().padStart(2, "0")}`;
}

export default function ThemeCard({ theme, showDoneDate = false }: Props) {
  const isKouki = theme.author === "こーき";
  const borderColor = isKouki ? "border-blue-500/30" : "border-pink-500/30";
  const badgeBg = isKouki
    ? "bg-blue-500/20 text-blue-300"
    : "bg-pink-500/20 text-pink-300";
  const emoji = isKouki ? "🧑" : "👩";

  return (
    <div
      className={`w-full p-5 rounded-2xl bg-white/5 border ${borderColor} backdrop-blur-sm`}
    >
      <p className="text-white text-lg leading-relaxed mb-4">{theme.text}</p>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className={`px-3 py-1 rounded-full ${badgeBg} font-medium`}>
          {emoji} {theme.author}のテーマ
        </span>
        <span className="text-white/40">
          📅 {formatDate(theme.created_at)}
        </span>
        {showDoneDate && theme.done_at && (
          <span className="text-white/40">
            ✅ {formatDate(theme.done_at)}
          </span>
        )}
      </div>
    </div>
  );
}
