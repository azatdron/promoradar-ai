PromoRadar AI v72 Real Scanner Bridge

Сделано:
- приложение сначала обращается к /api/scanner;
- если API отдаёт проекты, они появляются автоматически;
- если API недоступен, остаётся стабильная база;
- добавлен serverless backend api/scanner.js для Vercel;
- реальный источник подключается через env CRYPTORANK_API_URL.

Важно: без официального API endpoint/API-ключа CryptoRank это ещё мост, а не настоящий парсер.
