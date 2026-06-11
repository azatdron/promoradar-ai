export default async function handler(req, res) {
  if (req.method === 'GET') return res.status(200).json({ ok:true, alerts:[] });
  if (req.method !== 'POST') return res.status(405).json({ ok:false, error:'method_not_allowed' });
  return res.status(200).json({ ok:true, saved:true, note:'Alert rules accepted. Connect Telegram bot sendMessage in the next step.' });
}
