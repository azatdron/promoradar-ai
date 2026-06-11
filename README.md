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
