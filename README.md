# PromoRadar AI v25 — Multi-Exchange Live API Stage 1

База: v24/v22 UI. В этом ZIP добавлен первый реальный live-слой `/api/live.js` для Vercel.

Что сделано:
- подключены официальные страницы/публичные источники Binance, Bybit, KuCoin, OKX, Gate, Bitget, MEXC и BingX;
- pull-to-refresh вызывает `/api/live`;
- завершённые/404 акции можно скрывать через `active:false`;
- KuCoin GemPool получает live-проверку страницы и срок `endAt`;
- заложен расчёт потенциала через APR и оставшееся время;
- fallback остаётся локальным, если биржа не отдаёт стабильные публичные данные.

Важно: у многих бирж нет стабильного публичного API именно для Launchpad/Launchpool/GemPool. Поэтому в этой версии реализован безопасный первый слой: официальные страницы + проверка активности + структура для дальнейшего парсинга pool rewards / TVL / participants.
