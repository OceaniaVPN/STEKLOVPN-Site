# STEKLOVPN

Главная страница и каталог прокси, обслуживаемые одним Cloudflare Worker через Workers Static Assets.

## Структура

- `public/index.html` — главная страница с четырьмя каталогами и сезонными темами.
- `public/proxy/index.html` — каталог Telegram-прокси.
- `public/proxies.txt` — локальный feed каталога прокси.
- `wrangler.toml` — конфигурация Cloudflare Workers.

## Локальный запуск и деплой

Нужны Node.js и аккаунт Cloudflare.

```bash
npm install --save-dev wrangler
npx wrangler login
npx wrangler dev
npx wrangler deploy
```

Worker публикует главную по адресу `/`, каталог прокси — по адресу `/proxy/`.
После первого успешного деплоя Wrangler покажет адрес вида
`https://steklovpn-site.<твой-subdomain>.workers.dev`.

## Сезонные темы

Переключатель весна / лето / осень / зима меняет оформление в браузере посетителя и сохраняет выбор локально. Это публичная настройка темы, не защищённая админ-панель.

## Безопасность

Не добавляй в репозиторий API-токены, пароли, приватные ключи или секреты Cloudflare. Для секретов используй `npx wrangler secret put ИМЯ_СЕКРЕТА`.
