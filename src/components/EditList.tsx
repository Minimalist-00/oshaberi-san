import { getPendingThemesByAuthor } from "@/lib/storage";
import { Author, TalkTheme } from "@/lib/types";
import { USER1_NAME } from "@/lib/constants";
import { useEffect, useState } from "react";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}/${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${d.getDate().toString().padStart(2, "0")}`;
}

type Props = {
  author: Author;
  onSelect: (theme: TalkTheme) => void;
};

export default function EditList({ author, onSelect }: Props) {
  const [themes, setThemes] = useState<TalkTheme[]>([]);
  const [loading, setLoading] = useState(true);

  const loadThemes = () => {
    setLoading(true);
    getPendingThemesByAuthor(author).then((data) => {
      setThemes(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadThemes();
  }, [author]);

  if (loading) {
    return (
      <div className="text-purple-300 text-center py-12 animate-pulse font-bold">
        読み込み中... 🔄
      </div>
    );
  }

  if (themes.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 text-center py-12">
        <div className="text-5xl">📝</div>
        <p className="text-gray-400 text-lg font-medium">
          編集できるメモはありません
        </p>
      </div>
    );
  }

  const isUser1 = author === USER1_NAME;
  const emoji = isUser1 ? "🐶" : "🐰";

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col">
        {themes.map((theme) => {
          return (
            <div
              key={theme.id}
              onClick={() => onSelect(theme)}
              className="flex items-center justify-between py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-none cursor-pointer group"
            >
              <div className="flex flex-col overflow-hidden pr-3 flex-1">
                <p className="text-gray-800 font-bold text-[15px] leading-snug line-clamp-1 group-hover:text-purple-600 transition-colors">
                  {theme.text}
                </p>
                <div className="flex items-center gap-1.5 mt-1 text-[13px] text-gray-500 font-medium truncate">
                  <span className="flex items-center gap-1">
                    {emoji} {theme.author}
                  </span>
                  <span>•</span>
                  <span>{formatDate(theme.created_at)}</span>
                </div>
              </div>

              {theme.photos && theme.photos.length > 0 && (
                <div className="flex-shrink-0 ml-2">
                  <img
                    src={theme.photos[0]}
                    alt="写真"
                    className="w-12 h-12 object-cover rounded-md shadow-sm border border-gray-100"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
