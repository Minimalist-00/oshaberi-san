import ThemeInputForm from "@/components/ThemeInputForm";
import { Author } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function InputPage() {
  const router = useRouter();
  const [author, setAuthor] = useState<Author | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("oshaberi-san-user");
    if (!stored) {
      router.push("/");
      return;
    }
    setAuthor(stored as Author);
  }, [router]);

  if (!author) return null;

  const isKouki = author === "こーき";

  return (
    <div className="flex flex-col gap-8">
      {/* ヘッダー */}
      <div>
        <h2 className="text-2xl font-black text-gray-700 mb-1">
          ✏️ テーマをかく
        </h2>
      </div>

      {/* フォーム */}
      <ThemeInputForm author={author} />

      {/* ナビゲーション */}
      <Link
        href="/gacha"
        className="text-center text-purple-400 hover:text-purple-600 text-sm font-bold transition-colors duration-200"
      >
        🎰 ガチャ画面へ →
      </Link>
    </div>
  );
}
