export default async function handler(req, res) {
  const userId = req.query?.userId || req.body?.userId || null;
  return res.status(200).json({
    ok:true,
    userId,
    plan:'free',
    isPro:false,
    freeExchange:'KuCoin',
    proFeatures:['all_exchanges','favorites','alerts','stars_subscription']
  });
}
