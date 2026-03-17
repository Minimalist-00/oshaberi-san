import ArchiveList from "@/components/ArchiveList";

export default function ArchivePage() {
  return (
    <div className="flex flex-col gap-6">
      {/* ヘッダー */}
      <div>
        <h2 className="text-2xl font-black text-gray-700 mb-1">
          📚 過去のトーク
        </h2>
        <p className="text-gray-400 text-sm font-medium">
          過去にどんなことを話したか見てみよう
        </p>
      </div>

      {/* 一覧 */}
      <ArchiveList />
    </div>
  );
}
