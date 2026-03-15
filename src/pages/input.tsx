import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import ThemeInputForm from "@/components/ThemeInputForm";
import { Author } from "@/lib/types";

export default function InputPage() {
  const router = useRouter();
  const [author, setAuthor] = useState<Author | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("oshaberi-san-user");
    if (!stored) {
      router.push("/");
      return;
    }
    setAuthor(stored as Author);
  }, [router]);

  if (!author) return null;

  return (
    <div className="flex flex-col gap-8">
      {/* ヘッダー */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">✏️ テーマ入力</h2>
        <p className="text-white/40 text-sm">
          <span className="text-white/70 font-medium">{author}</span>
          としてメモ中
        </p>
      </div>

      {/* フォーム */}
      <ThemeInputForm author={author} />

      {/* ナビゲーション */}
      <Link
        href="/gacha"
        className="text-center text-purple-400/70 hover:text-purple-400 text-sm transition-colors duration-200"
      >
        🎰 ガチャ画面へ →
      </Link>
    </div>
  );
}
