// ストレージ抽象レイヤー
// フェーズ1: localStorage 実装をエクスポート
// フェーズ2: storage.supabase.ts に差し替え

export {
  getThemes,
  addTheme,
  markAsDone,
  getPendingThemes,
  getDoneThemes,
  compressImage,
} from "./storage.local";
