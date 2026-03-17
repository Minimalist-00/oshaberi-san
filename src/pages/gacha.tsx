import GachaButton from "@/components/GachaButton";

export default function GachaPage() {
  return (
    <div className="flex flex-col items-center gap-8 min-h-[70vh] justify-center">
      {/* ヘッダー */}
      <div className="text-center">
        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 mb-2">
          🎰 ガチャ
        </h2>
        <p className="text-purple-400/70 text-sm font-medium">
          なにが出るかな！わくわく
        </p>
      </div>

      {/* ガチャ */}
      <GachaButton />
    </div>
  );
}
