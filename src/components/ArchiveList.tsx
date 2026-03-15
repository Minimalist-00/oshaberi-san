import { useEffect, useState } from "react";
import { getDoneThemes } from "@/lib/storage";
import { TalkTheme } from "@/lib/types";
import ThemeCard from "./ThemeCard";

export default function ArchiveList() {
  const [themes, setThemes] = useState<TalkTheme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoneThemes().then((data) => {
      setThemes(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="text-white/40 text-center py-12 animate-pulse">
        読み込み中...
      </div>
    );
  }

  if (themes.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 text-center py-12">
        <div className="text-5xl">📝</div>
        <p className="text-white/50 text-lg">
          まだ話したテーマはありません
        </p>
        <a
          href="/gacha"
          className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm hover:scale-105 active:scale-95 transition-transform duration-200"
        >
          ガチャを引く →
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <p className="text-white/40 text-sm text-center">
        話し済み {themes.length} 件
      </p>
      {themes.map((theme) => (
        <ThemeCard key={theme.id} theme={theme} showDoneDate />
      ))}
    </div>
  );
}
