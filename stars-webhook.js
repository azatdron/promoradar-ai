const PLANS = { day:5, month:30, half:120, year:180 };
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok:false, error:'method_not_allowed' });
  const plan = req.body?.payload?.plan || req.body?.plan || 'day';
  return res.status(200).json({
    ok:true,
    plan,
    stars:PLANS[plan] || 5,
    invoiceUrl:null,
    status:'mock_ready',
    note:'Use Telegram Bot API createInvoiceLink / sendInvoice with currency XTR to enable real Stars payments.'
  });
}
