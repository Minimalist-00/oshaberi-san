import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 自動停止を防ぐため、1件だけデータを取得する軽量なリクエスト
    const { data, error } = await supabase
      .from('talk_themes')
      .select('id')
      .limit(1);

    if (error) {
      console.error('Ping error:', error);
      return res.status(500).json({ success: false, error: error.message });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Supabase kept alive!', 
      timestamp: new Date().toISOString() 
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: String(err) });
  }
}
