import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { USER1_NAME } from "@/lib/constants";

type Props = {
  children: ReactNode;
};

const navItems = [
  { href: "/input", label: "✏️", title: "メモ" },
  { href: "/gacha", label: "🎰", title: "ガチャ" },
  { href: "/archive", label: "📚", title: "アーカイブ" },
];

export default function Layout({ children }: Props) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const user = typeof window !== "undefined" ? localStorage.getItem("oshaberi-san-user") : null;
    setCurrentUser(user);

    if (user && router.pathname === "/") {
      router.push("/input");
    } else if (!user && router.pathname !== "/") {
      router.push("/");
    }
  }, [router.pathname]);

  const handleUserClick = () => {
    localStorage.removeItem("oshaberi-san-user");
    setCurrentUser(null);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col pt-16">
      {/* ユーザーヘッダー */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-xl border-b border-pink-100 shadow-sm z-50">
        <div className="max-w-lg mx-auto h-full flex items-center justify-between px-5">
          <Link href={currentUser ? "/input" : "/"} className="font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 text-xl tracking-wider">
            おしゃべりさん
          </Link>
          {currentUser && (
            <button 
              onClick={handleUserClick} 
              className="px-4 py-1.5 text-sm bg-purple-50 text-purple-700 border border-purple-200 rounded-full font-bold hover:bg-purple-100 transition-colors shadow-sm cursor-pointer"
              title="ユーザーを切り替える"
            >
              {currentUser === USER1_NAME ? "🐶" : "🐰"} {currentUser}
            </button>
          )}
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 w-full max-w-lg mx-auto px-5 pt-8 pb-28">
        {children}
      </main>

      {/* 下部ナビゲーション */}
      {currentUser && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-pink-100 shadow-[0_-4px_20px_rgba(255,182,255,0.15)]">
          <div className="max-w-lg mx-auto flex justify-around py-3">
          {navItems.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-purple-600 scale-110"
                    : "text-gray-400 hover:text-purple-400"
                }`}
              >
                <span className="text-xl">{item.label}</span>
                <span className="text-[10px] font-bold">{item.title}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      )}
    </div>
  );
}
