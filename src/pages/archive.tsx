import ArchiveList from "@/components/ArchiveList";

export default function ArchivePage() {
  return (
    <div className="flex flex-col gap-6">
      {/* ヘッダー */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">📚 過去のトーク</h2>
        <p className="text-white/40 text-sm">
          話し済みテーマの振り返り
        </p>
      </div>

      {/* 一覧 */}
      <ArchiveList />
    </div>
  );
}
