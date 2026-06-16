PromoRadar AI v73 CryptoRank API Scanner

Теперь backend api/scanner.js умеет ходить в CryptoRank API.

Что нужно сделать в Vercel:
1. Project → Settings → Environment Variables
2. Добавить:
   CRYPTORANK_API_KEY = твой CryptoRank API key
   CRYPTORANK_API_URL = endpoint из CryptoRank API docs/dashboard
3. Redeploy проекта.
4. В приложении нажать «Проверить возможности».

Важно:
CryptoRank ключ нельзя хранить в frontend. Он должен быть только в Vercel env.
Приложение обращается к /api/scanner, а /api/scanner уже добавляет header:
x-api-key: CRYPTORANK_API_KEY

Если endpoint не настроен, приложение покажет demo/fallback, а не белый экран.
