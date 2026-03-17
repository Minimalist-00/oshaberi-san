import { TalkTheme } from "@/lib/types";
import { useState } from "react";

type Props = {
  theme: TalkTheme;
  showDoneDate?: boolean;
  hideMemoInitial?: boolean;
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}/${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${d.getDate().toString().padStart(2, "0")}`;
}

function PhotoCarousel({ photos }: { photos: string[] }) {
  const [current, setCurrent] = useState(0);

  if (photos.length === 1) {
    return (
      <div className="mt-3 rounded-xl overflow-hidden bg-black/5 flex justify-center">
        <img
          src={photos[0]}
          alt="添付写真"
          className="w-full h-auto max-h-[70vh] object-contain rounded-xl"
        />
      </div>
    );
  }

  return (
    <div className="mt-3 relative">
      <div className="overflow-hidden rounded-xl bg-black/5">
        <div
          className="flex transition-transform duration-300 ease-out items-center"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {photos.map((photo, i) => (
            <img
              key={i}
              src={photo}
              alt={`添付写真 ${i + 1}`}
              className="w-full h-auto max-h-[70vh] object-contain flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* ナビゲーションボタン */}
      {current > 0 && (
        <button
          onClick={() => setCurrent(current - 1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 flex items-center justify-center shadow-md hover:bg-white transition-all duration-200 cursor-pointer"
        >
          ‹
        </button>
      )}
      {current < photos.length - 1 && (
        <button
          onClick={() => setCurrent(current + 1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 flex items-center justify-center shadow-md hover:bg-white transition-all duration-200 cursor-pointer"
        >
          ›
        </button>
      )}

      {/* ドットインジケーター */}
      <div className="flex justify-center gap-1.5 mt-2">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-200 cursor-pointer ${i === current
              ? "bg-purple-400 scale-125"
              : "bg-gray-300 hover:bg-gray-400"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ThemeCard({ theme, showDoneDate = false, hideMemoInitial = false }: Props) {
  const [isMemoVisible, setIsMemoVisible] = useState(!hideMemoInitial);
  const isKouki = theme.author === "こーき";
  const cardBg = isKouki
    ? "bg-sky-50 border-sky-200"
    : "bg-pink-50 border-pink-200";
  const badgeBg = isKouki
    ? "bg-sky-200 text-sky-700"
    : "bg-pink-200 text-pink-700";
  const emoji = isKouki ? "🐶" : "🐰";

  return (
    <div
      className={`w-full p-5 rounded-2xl border-2 ${cardBg} shadow-sm transition-all duration-200 hover:shadow-md`}
    >
      <p className="text-gray-700 text-lg leading-relaxed mb-3 font-medium">
        {theme.text}
      </p>

      {/* メモ */}
      {theme.memo && (
        <div className="mb-3 p-3 rounded-xl bg-white/60 border border-gray-100">
          {!isMemoVisible ? (
            <button
              onClick={() => setIsMemoVisible(true)}
              className="w-full py-2 text-sm font-bold text-purple-500 flex items-center justify-center gap-2 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer"
            >
              <span>👀</span> カンペをみる
            </button>
          ) : (
            <div className="relative">
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs font-bold text-purple-400">📝 メモ</p>
                {hideMemoInitial && (
                  <button
                    onClick={() => setIsMemoVisible(false)}
                    className="text-xs text-gray-400 hover:text-gray-600 underline transition-colors cursor-pointer"
                  >
                    カンペを隠す
                  </button>
                )}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                {theme.memo}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 写真カルーセル */}
      {theme.photos && theme.photos.length > 0 && (
        <PhotoCarousel photos={theme.photos} />
      )}

      <div className="flex flex-col gap-2 text-sm mt-4">
        <div className="flex items-center">
          <span
            className={`px-3 py-1 rounded-full ${badgeBg} font-bold text-[10px]`}
          >
            {emoji} {theme.author}のテーマ
          </span>
        </div>
        <div className="flex flex-col gap-1.5 ml-1">
          <span className="text-gray-400 flex items-center gap-1.5 text-xs">
            <span className="opacity-70">📅</span> {formatDate(theme.created_at)}
          </span>
          {showDoneDate && theme.done_at && (
            <span className="text-gray-400 flex items-center gap-1.5 text-xs">
              <span className="opacity-70">✅</span> {formatDate(theme.done_at)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
