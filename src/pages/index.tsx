import UserSelector from "@/components/UserSelector";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-10">
      {/* アプリ名 */}
      <div className="text-center">
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 mb-3">
          おしゃべりさん
        </h1>
        <p className="text-white/40 text-sm tracking-widest">
          話したいことをストックして、ガチャで引こう！
        </p>
      </div>

      {/* ユーザー選択 */}
      <div className="w-full">
        <p className="text-center text-white/50 text-sm mb-4">
          あなたはどっち？
        </p>
        <UserSelector />
      </div>
    </div>
  );
}
