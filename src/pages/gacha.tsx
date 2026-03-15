import GachaButton from "@/components/GachaButton";

export default function GachaPage() {
  return (
    <div className="flex flex-col items-center gap-8 min-h-[70vh] justify-center">
      {/* ヘッダー */}
      <div className="text-center">
        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-400 mb-2">
          🎰 ガチャ
        </h2>
        <p className="text-white/40 text-sm">
          ボタンを押してテーマを引き当てよう！
        </p>
      </div>

      {/* ガチャ */}
      <GachaButton />
    </div>
  );
}
