import { useEffect, useState } from "react";
import { getDoneThemes } from "@/lib/storage";
import { TalkTheme } from "@/lib/types";
import ThemeCard from "./ThemeCard";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}/${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${d.getDate().toString().padStart(2, "0")}`;
}

export default function ArchiveList() {
  const [themes, setThemes] = useState<TalkTheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState<TalkTheme | null>(null);

  useEffect(() => {
    getDoneThemes().then((data) => {
      setThemes(data);
      setLoading(false);
    });
  }, []);

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
          まだ話したテーマはありません
        </p>
        <a
          href="/gacha"
          className="px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold text-sm hover:scale-105 active:scale-95 transition-transform duration-200 shadow-lg shadow-orange-300/30"
        >
          ガチャを引く →
        </a>
      </div>
    );
  }

  if (selectedTheme) {
    return (
      <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
        <button 
          onClick={() => setSelectedTheme(null)}
          className="self-start px-4 py-2 rounded-xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors text-sm flex items-center gap-2 cursor-pointer"
        >
          <span>←</span> 戻る
        </button>
        <ThemeCard theme={selectedTheme} showDoneDate />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <p className="text-purple-400 text-sm text-center font-bold mb-2">
        🗣️ 話し済み {themes.length} 件
      </p>
      
      <div className="flex flex-col">
        {themes.map((theme) => {
          const isKouki = theme.author === "こーき";
          const emoji = isKouki ? "🧑" : "👩";
          return (
            <div
              key={theme.id}
              onClick={() => setSelectedTheme(theme)}
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
