# PromoRadar AI v74 — подключение CryptoRank Scanner

## Что уже готово
- Frontend вызывает `/api/scanner`
- Backend `api/scanner.js` умеет ходить в CryptoRank API
- CryptoRank key не хранится в frontend
- Если API не настроен, приложение не ломается и показывает стабильную базу

## Что нужно сделать в Vercel
1. Открыть проект в Vercel
2. Settings → Environment Variables
3. Добавить:
   - `CRYPTORANK_API_KEY`
   - `CRYPTORANK_API_URL`
4. Нажать Redeploy

## Что такое CRYPTORANK_API_URL
Это точный endpoint CryptoRank, который отдаёт список:
- airdrops
- drop hunting
- testnet activities
- rewards / campaigns

Без точного endpoint приложение не может само сканировать CryptoRank.
