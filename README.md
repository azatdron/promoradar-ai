# PromoRadar AI v43 — Telegram Bot Bridge

База: v42 Alerts Prep.

Добавлено:
- Telegram WebApp SDK в index.html.
- Telegram Bridge в app.js: определение запуска внутри Telegram, user ID, sync-заготовка.
- API-заготовки для Vercel:
  - /api/telegram-user
  - /api/subscription
  - /api/alerts
  - /api/stars-webhook
- Кнопки тарифов Stars обращаются к mock endpoint, готовому к подключению Bot API.

Следующий этап: подключить реального Telegram-бота, базу подписок и оплату Stars через Bot API.

## v44 Alerts Rules
- Добавлен расширенный экран уведомлений.
- Настройки по биржам: Binance, Bybit, KuCoin, OKX, Gate, MEXC, Bitget, BingX.
- Настройки по типам заработка: Launch, Staking, Earn, Airdrop.
- Важность: новые акции, 24ч, 6ч, ROI выше порога, только избранные, только лучшие.
- Частота: сразу или сводка раз в день.
- Тестовое уведомление и подготовка к Telegram bot bridge сохранены.
