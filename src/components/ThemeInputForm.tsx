import { useState } from "react";
import { addTheme } from "@/lib/storage";
import { Author } from "@/lib/types";

type Props = {
  author: Author;
};

export default function ThemeInputForm({ author }: Props) {
  const [text, setText] = useState("");
  const [toast, setToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isSubmitting) return;

    setIsSubmitting(true);
    await addTheme({ text: text.trim(), author });
    setText("");
    setIsSubmitting(false);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="話したいことをメモしよう... 💭"
          className="w-full min-h-[140px] p-4 rounded-2xl bg-white border-2 border-purple-200 text-gray-700 placeholder-purple-300 text-base resize-none focus:outline-none focus:ring-3 focus:ring-purple-300/50 focus:border-purple-400 transition-all duration-200 shadow-sm"
        />
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
        className={`fixed bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 text-white font-bold shadow-lg shadow-emerald-300/30 transition-all duration-300 z-50 ${
          toast
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        ✅ メモしました！
      </div>
    </div>
  );
}
