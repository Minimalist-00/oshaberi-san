import { addTheme, compressImage } from "@/lib/storage";
import { Author } from "@/lib/types";
import { useRef, useState } from "react";

type Props = {
  author: Author;
};

const MAX_PHOTOS = 20;

export default function ThemeInputForm({ author }: Props) {
  const [text, setText] = useState("");
  const [memo, setMemo] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [toast, setToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remaining = MAX_PHOTOS - photos.length;
    const filesToProcess = Array.from(files).slice(0, remaining);

    for (const file of filesToProcess) {
      try {
        const compressed = await compressImage(file);
        setPhotos((prev) => [...prev, compressed]);
      } catch (err) {
        console.error("画像の圧縮に失敗しました:", err);
      }
    }

    // inputをリセット
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isSubmitting) return;

    setIsSubmitting(true);
    await addTheme({
      text: text.trim(),
      author,
      memo: memo.trim() || undefined,
      photos: photos.length > 0 ? photos : undefined,
    });
    setText("");
    setMemo("");
    setPhotos([]);
    setIsSubmitting(false);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* テーマ入力 */}
        <div>
          <label className="block text-sm font-bold text-purple-400 mb-2">
            🏷️ テーマ
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="ここにテーマをかくよ"
            className="w-full p-4 rounded-2xl bg-white border-2 border-purple-200 text-gray-700 placeholder-purple-300 text-base focus:outline-none focus:ring-3 focus:ring-purple-300/50 focus:border-purple-400 transition-all duration-200 shadow-sm"
          />
        </div>

        {/* メモ入力 */}
        <div>
          <label className="block text-sm font-bold text-purple-400 mb-2">
            📝 メモ（任意）
          </label>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="ここにカンペをかくのだ"
            className="w-full min-h-[140px] p-4 rounded-2xl bg-white border-2 border-purple-200 text-gray-700 placeholder-purple-300 text-base resize-none focus:outline-none focus:ring-3 focus:ring-purple-300/50 focus:border-purple-400 transition-all duration-200 shadow-sm"
          />
        </div>

        {/* 写真アップロード */}
        <div>
          <label className="block text-sm font-bold text-purple-400 mb-2">
            📷 写真（最大{MAX_PHOTOS}枚）
          </label>

          {/* プレビュー */}
          {photos.length > 0 && (
            <div className="flex gap-3 mb-3 overflow-x-auto pb-2">
              {photos.map((photo, i) => (
                <div key={i} className="relative flex-shrink-0 group">
                  <img
                    src={photo}
                    alt={`添付写真 ${i + 1}`}
                    className="w-24 h-24 object-cover rounded-xl border-2 border-purple-200 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(i)}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-400 text-white text-xs font-bold flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-500 cursor-pointer"
                    style={{ opacity: 1 }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {photos.length < MAX_PHOTOS && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 rounded-2xl border-2 border-dashed border-purple-200 text-purple-400 text-sm font-bold hover:border-purple-400 hover:bg-purple-50/50 active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              📎 写真を追加する
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoAdd}
            className="hidden"
          />
        </div>

        {/* 送信ボタン */}
        <button
          type="submit"
          disabled={!text.trim() || isSubmitting}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 text-white text-lg font-black shadow-lg shadow-purple-300/30 hover:shadow-xl hover:shadow-purple-300/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
        >
          {isSubmitting ? "保存中... 🔄" : "💾 メモする！"}
        </button>
      </form>

      {/* 成功トースト */}
      <div
        className={`fixed bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 text-white font-bold shadow-lg shadow-emerald-300/30 transition-all duration-300 z-50 ${toast
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
          }`}
      >
        ✅ メモしました！
      </div>
    </div>
  );
}
