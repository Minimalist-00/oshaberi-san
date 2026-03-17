import { getPendingThemes, markAsDone } from "@/lib/storage";
import { TalkTheme } from "@/lib/types";
import { useCallback, useState } from "react";
import ThemeCard from "./ThemeCard";

type GachaState = "idle" | "spinning" | "result";

export default function GachaButton() {
  const [state, setState] = useState<GachaState>("idle");
  const [drawnTheme, setDrawnTheme] = useState<TalkTheme | null>(null);
  const [pendingCount, setPendingCount] = useState<number | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const refreshCount = useCallback(async () => {
    const themes = await getPendingThemes();
    setPendingCount(themes.length);
    setIsEmpty(themes.length === 0);
  }, []);

  // 初回ロード
  useState(() => {
    refreshCount();
  });

  const drawGacha = async () => {
    const themes = await getPendingThemes();
    if (themes.length === 0) {
      setIsEmpty(true);
      return;
    }

    setState("spinning");

    const randomIndex = Math.floor(Math.random() * themes.length);
    const selected = themes[randomIndex];

    // ガチャで引いた瞬間にdone
    await markAsDone(selected.id);

    // ブルブル演出 → 結果表示
    setTimeout(() => {
      setDrawnTheme(selected);
      setState("result");
      setPendingCount((prev) => (prev !== null ? prev - 1 : null));
    }, 1500);
  };

  const handleNext = async () => {
    setState("idle");
    setDrawnTheme(null);
    await refreshCount();
    drawGacha();
  };

  const handleStop = () => {
    window.location.href = "/";
  };

  if (isEmpty && state === "idle") {
    return (
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="text-6xl mb-2">📭</div>
        <p className="text-gray-400 text-lg font-medium">
          テーマないやないかい
        </p>
        <a
          href="/input"
          className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold hover:scale-105 active:scale-95 transition-transform duration-200 shadow-lg shadow-purple-300/30"
        >
          テーマを書きにいく
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      {/* 残りテーマ数 */}
      {pendingCount !== null && (
        <div className="px-5 py-2 rounded-full bg-white border-2 border-purple-200 text-purple-500 text-sm font-bold shadow-sm">
          残り{" "}
          <span className="text-purple-600 text-xl mx-1">{pendingCount}</span>{" "}
          件
        </div>
      )}

      {/* ガチャボタン */}
      {state === "idle" && (
        <button
          onClick={drawGacha}
          className="group relative w-48 h-48 rounded-full bg-gradient-to-br from-yellow-300 via-orange-300 to-pink-400 shadow-2xl shadow-orange-300/40 hover:shadow-orange-300/60 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <span className="absolute inset-2 rounded-full bg-gradient-to-br from-yellow-200 via-orange-200 to-pink-300 flex items-center justify-center">
            <span className="text-white text-3xl font-black drop-shadow-lg">
              引く！
            </span>
          </span>
          <span className="absolute inset-0 rounded-full bg-white/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      )}

      {/* ブルブル演出 */}
      {state === "spinning" && (
        <div className="flex flex-col items-center gap-4">
          <div className="gacha-shake text-8xl">🎰</div>
          <p className="text-purple-400 animate-pulse text-lg font-bold">
            ガチャ中...🎵
          </p>
        </div>
      )}

      {/* 結果表示 */}
      {state === "result" && drawnTheme && (
        <div className="gacha-fadein flex flex-col items-center gap-6 w-full">
          <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 mb-2">
            デデン！🎉
          </div>
          <ThemeCard theme={drawnTheme} hideMemoInitial />
          <div className="flex gap-4 w-full">
            <button
              onClick={handleNext}
              className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-400 text-white font-bold shadow-lg shadow-green-300/30 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 cursor-pointer"
            >
              次の話題へ →
            </button>
            <button
              onClick={handleStop}
              className="flex-1 py-4 rounded-2xl bg-white border-2 border-gray-200 text-gray-500 font-bold hover:bg-gray-50 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 cursor-pointer"
            >
              やめる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
