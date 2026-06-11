export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok:false, error:'method_not_allowed' });
  const body = req.body || {};
  const user = body.user || {};
  return res.status(200).json({
    ok:true,
    mode:'telegram-user-bridge',
    userId:user.id ? String(user.id) : null,
    username:user.username || null,
    firstName:user.first_name || null,
    subscription:'free',
    note:'Connect a database here to store Telegram users and PRO status.'
  });
}
