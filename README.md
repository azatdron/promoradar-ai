PromoRadar AI v73 CryptoRank API Scanner

Сделано:
- api/scanner.js подключает CryptoRank API через CRYPTORANK_API_KEY и CRYPTORANK_API_URL;
- ключ не попадает в frontend;
- добавлен нормализатор данных CryptoRank → PromoRadar cards;
- фильтруются finished/ended активности;
- fallback остаётся, чтобы не было белого экрана;
- добавлен .env.example и SCANNER_SETUP.md.
