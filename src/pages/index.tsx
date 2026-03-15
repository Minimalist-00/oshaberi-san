import UserSelector from "@/components/UserSelector";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-10">
      {/* アプリ名 */}
      <div className="text-center">
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 mb-3">
          おしゃべりさん
        </h1>
        <p className="text-purple-400/70 text-sm tracking-widest font-medium">
          話したいことをストックして、ガチャで引こう！
        </p>
      </div>

      {/* ユーザー選択 */}
      <div className="w-full">
        <p className="text-center text-purple-400 text-sm mb-4 font-bold">
          🎭 あなたはどっち？
        </p>
        <UserSelector />
      </div>
    </div>
  );
}
