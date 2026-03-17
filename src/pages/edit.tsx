import EditList from "@/components/EditList";
import ThemeInputForm from "@/components/ThemeInputForm";
import { Author, TalkTheme } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditPage() {
  const router = useRouter();
  const [author, setAuthor] = useState<Author | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<TalkTheme | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("oshaberi-san-user");
    if (!stored) {
      router.push("/");
      return;
    }
    setAuthor(stored as Author);
  }, [router]);

  if (!author) return null;

  return (
    <div className="flex flex-col gap-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-gray-700">
          {selectedTheme ? "📝 編集する" : "✏️ メモをえらぶ"}
        </h2>
        {!selectedTheme && (
          <Link
            href="/input"
            className="text-purple-400 font-bold text-sm hover:text-purple-600 transition-colors"
          >
            戻る
          </Link>
        )}
      </div>

      {selectedTheme ? (
        <ThemeInputForm
          author={author}
          initialTheme={selectedTheme}
          onCancel={() => setSelectedTheme(null)}
          onSuccess={() => setSelectedTheme(null)}
        />
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-gray-400 text-sm font-medium">
            まだ話していないテーマだけ編集できるよ
          </p>
          <EditList author={author} onSelect={setSelectedTheme} />
        </div>
      )}
    </div>
  );
}
