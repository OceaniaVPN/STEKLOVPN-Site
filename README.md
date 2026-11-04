# STEKLOVPN

Главная страница STEKLOVPN, обслуживаемая **Cloudflare Workers** через Workers Static Assets.

## Структура

- `public/index.html` — адаптивная главная страница с четырьмя каталогами и сезонными темами.
- `src/worker.js` — Worker: обработка запросов и защитные HTTP-заголовки.
- `wrangler.toml` — конфигурация Wrangler.
- `public/.assetsignore` — исключает внутренние файлы из публичной загрузки.

Каталог прокси и его feed не входят в публичную сборку этого Worker.

## Локальный запуск и деплой

Нужны Node.js и аккаунт Cloudflare.

```bash
npm install --save-dev wrangler
npx wrangler login
npx wrangler dev
npx wrangler deploy
```

После успешного деплоя Wrangler покажет адрес вида:

`https://steklovpn-site.<твой-subdomain>.workers.dev`

Главная будет открываться по адресу `/`.

## Сезонные темы

Переключатель весна / лето / осень / зима меняет оформление в браузере посетителя и сохраняет выбор локально. Это публичная настройка темы, не закрытая админ-панель.

## Безопасность

Не добавляй в репозиторий API-токены, пароли, приватные ключи или секреты Cloudflare. Для секретов используй `npx wrangler secret put ИМЯ_СЕКРЕТА`.
