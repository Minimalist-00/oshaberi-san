import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const navItems = [
  { href: "/", label: "🏠", title: "トップ" },
  { href: "/input", label: "✏️", title: "メモ" },
  { href: "/gacha", label: "🎰", title: "ガチャ" },
  { href: "/archive", label: "📚", title: "アーカイブ" },
];

export default function Layout({ children }: Props) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      {/* メインコンテンツ */}
      <main className="flex-1 w-full max-w-lg mx-auto px-5 pt-10 pb-28">
        {children}
      </main>

      {/* 下部ナビゲーション */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/60 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-lg mx-auto flex justify-around py-3">
          {navItems.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-white scale-110"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                <span className="text-xl">{item.label}</span>
                <span className="text-[10px] font-medium">{item.title}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
