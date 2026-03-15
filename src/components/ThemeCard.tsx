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
  const cardBg = isKouki
    ? "bg-sky-50 border-sky-200"
    : "bg-pink-50 border-pink-200";
  const badgeBg = isKouki
    ? "bg-sky-200 text-sky-700"
    : "bg-pink-200 text-pink-700";
  const emoji = isKouki ? "🧑" : "👩";

  return (
    <div
      className={`w-full p-5 rounded-2xl border-2 ${cardBg} shadow-sm transition-all duration-200 hover:shadow-md`}
    >
      <p className="text-gray-700 text-lg leading-relaxed mb-4 font-medium">
        {theme.text}
      </p>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span
          className={`px-3 py-1 rounded-full ${badgeBg} font-bold text-xs`}
        >
          {emoji} {theme.author}のテーマ
        </span>
        <span className="text-gray-400">📅 {formatDate(theme.created_at)}</span>
        {showDoneDate && theme.done_at && (
          <span className="text-gray-400">
            ✅ {formatDate(theme.done_at)}
          </span>
        )}
      </div>
    </div>
  );
}
