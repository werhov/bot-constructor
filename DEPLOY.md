# 🚀 Инструкция по деплою Bot Constructor

## Быстрый деплой (5 минут)

### Шаг 1: Подготовка бота

1. Откройте [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте `/newbot`
3. Следуйте инструкциям:
   - Введите имя бота: `My Bot Constructor`
   - Введите username: `my_bot_constructor_bot` (должен заканчиваться на `bot`)
4. Сохраните полученный **токен** - это важно!

### Шаг 2: Настройка Mini App

В том же чате с @BotFather:

```
/mybots
→ Выберите вашего бота
→ Bot Settings
→ Menu Button
→ Configure menu button
→ Введите URL: https://your-app.vercel.app
→ Введите текст: 🚀 Открыть конструктор
```

### Шаг 3: Деплой на Vercel (БЕСПЛАТНО)

#### Вариант A: Через GitHub

1. Создайте репозиторий на GitHub
2. Загрузите файлы проекта
3. Перейдите на [vercel.com](https://vercel.com)
4. Нажмите "Import Project"
5. Выберите ваш GitHub репозиторий
6. Добавьте переменные окружения:
   ```
   TELEGRAM_BOT_TOKEN=ваш_токен_от_botfather
   NODE_ENV=production
   ```
7. Нажмите "Deploy"
8. Скопируйте URL (например: `https://your-app.vercel.app`)
9. Вернитесь в @BotFather и обновите Menu Button URL

#### Вариант B: Через Vercel CLI

```bash
# Установите Vercel CLI
npm i -g vercel

# Логин
vercel login

# Деплой
vercel

# Следуйте инструкциям
# Set up and deploy? Yes
# Which scope? Your account
# Link to existing project? No
# Project name? bot-constructor
# Directory? ./
# Override settings? No

# Добавьте переменные
vercel env add TELEGRAM_BOT_TOKEN
→ Вставьте ваш токен

# Production деплой
vercel --prod
```

### Шаг 4: Запуск главного бота

На вашем сервере или локально:

```bash
# Установите зависимости
npm install

# Создайте .env
echo "TELEGRAM_BOT_TOKEN=ваш_токен" > .env
echo "MINI_APP_URL=https://your-app.vercel.app" >> .env

# Запустите бота
node main-bot.js

# Или с PM2 для автозапуска
npm install -g pm2
pm2 start main-bot.js --name bot-constructor
pm2 save
pm2 startup
```

### Шаг 5: Проверка

1. Откройте вашего бота в Telegram
2. Нажмите `/start`
3. Должна появиться кнопка "🚀 Открыть конструктор"
4. Нажмите её - откроется Mini App!

---

## Продакшн деплой (полная версия)

### Railway (рекомендуется для backend)

Railway предоставляет бесплатно $5 в месяц, этого хватит для небольших проектов.

```bash
# Установите Railway CLI
npm i -g @railway/cli

# Логин
railway login

# Инициализация
railway init

# Добавьте переменные
railway variables set TELEGRAM_BOT_TOKEN=ваш_токен
railway variables set MINI_APP_URL=https://your-app.vercel.app
railway variables set PORT=3000

# Деплой
railway up

# Получите URL
railway domain
```

**Конфигурация для Railway** (`railway.json`):

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "node server.js",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Heroku

```bash
# Установите Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Логин
heroku login

# Создайте приложение
heroku create your-bot-constructor

# Добавьте Node.js buildpack
heroku buildpacks:set heroku/nodejs

# Добавьте переменные
heroku config:set TELEGRAM_BOT_TOKEN=ваш_токен
heroku config:set MINI_APP_URL=https://your-bot-constructor.herokuapp.com
heroku config:set NODE_ENV=production

# Создайте Procfile
echo "web: node server.js" > Procfile
echo "bot: node main-bot.js" >> Procfile

# Git push
git add .
git commit -m "Initial commit"
git push heroku main

# Запустите bot worker
heroku ps:scale bot=1
```

### Digital Ocean App Platform

1. Зарегистрируйтесь на [digitalocean.com](https://digitalocean.com)
2. Создайте новое приложение из GitHub
3. Настройте переменные окружения
4. Деплой автоматический

**Конфигурация** (`.do/app.yaml`):

```yaml
name: bot-constructor
services:
- name: web
  github:
    repo: yourusername/bot-constructor
    branch: main
    deploy_on_push: true
  run_command: node server.js
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: TELEGRAM_BOT_TOKEN
    scope: RUN_TIME
    type: SECRET
  - key: NODE_ENV
    value: production
- name: bot
  run_command: node main-bot.js
  instance_count: 1
  instance_size_slug: basic-xxs
```

---

## База данных (опционально)

### MongoDB Atlas (бесплатный tier)

```bash
# Установите mongoose
npm install mongoose

# Добавьте в .env
echo "MONGODB_URI=mongodb+srv://..." >> .env
```

**Код подключения** (добавьте в `server.js`):

```javascript
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB error:', err));

// Schema для бота
const botSchema = new mongoose.Schema({
    userId: Number,
    platform: String,
    config: Object,
    createdAt: { type: Date, default: Date.now }
});

const Bot = mongoose.model('Bot', botSchema);
```

### PostgreSQL (Supabase - бесплатно)

```bash
npm install pg

# Добавьте в .env
echo "DATABASE_URL=postgresql://..." >> .env
```

---

## Мониторинг и логирование

### PM2 (для Node.js процессов)

```bash
# Установка
npm install -g pm2

# ecosystem.config.js
module.exports = {
  apps: [{
    name: 'bot-server',
    script: './server.js',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production'
    }
  }, {
    name: 'telegram-bot',
    script: './main-bot.js',
    instances: 1,
    env: {
      NODE_ENV: 'production'
    }
  }]
};

# Запуск
pm2 start ecosystem.config.js

# Мониторинг
pm2 monit

# Логи
pm2 logs

# Автозапуск при перезагрузке
pm2 startup
pm2 save
```

### Sentry (отслеживание ошибок)

```bash
npm install @sentry/node

# В server.js
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: 'your-sentry-dsn',
  environment: process.env.NODE_ENV
});
```

---

## SSL/HTTPS

### Certbot (для собственного домена)

```bash
# Ubuntu/Debian
sudo apt install certbot python3-certbot-nginx

# Получите сертификат
sudo certbot --nginx -d yourdomain.com

# Автообновление
sudo certbot renew --dry-run
```

### Cloudflare (бесплатный SSL)

1. Зарегистрируйтесь на [cloudflare.com](https://cloudflare.com)
2. Добавьте ваш домен
3. Измените DNS на Cloudflare nameservers
4. SSL включается автоматически

---

## Webhook режим (для production)

Вместо polling используйте webhook для лучшей производительности:

```javascript
// main-bot.js
const express = require('express');
const bot = new TelegramBot(token); // БЕЗ polling

const app = express();
app.use(express.json());

// Webhook endpoint
app.post(`/webhook/${token}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// Установка webhook
bot.setWebHook(`${WEBHOOK_URL}/webhook/${token}`);

app.listen(PORT);
```

---

## Чеклист перед production

- [ ] Все переменные в `.env` настроены
- [ ] Токены не в коде (используйте переменные окружения)
- [ ] HTTPS настроен
- [ ] Мониторинг настроен (Sentry/PM2)
- [ ] Логирование работает
- [ ] База данных (если нужна) подключена
- [ ] Backup настроен
- [ ] Rate limiting добавлен
- [ ] Error handling везде
- [ ] Тесты написаны
- [ ] README обновлён
- [ ] .gitignore настроен (не комитьте .env!)

---

## Troubleshooting

### Проблема: Бот не отвечает

```bash
# Проверьте логи
pm2 logs telegram-bot

# Или
node main-bot.js
```

### Проблема: Mini App не открывается

1. Проверьте URL в Menu Button (@BotFather)
2. Убедитесь что сайт доступен по HTTPS
3. Проверьте CORS настройки

### Проблема: Ошибка при деплое

```bash
# Проверьте Node.js версию
node -v  # Должна быть >= 16

# Переустановите зависимости
rm -rf node_modules package-lock.json
npm install
```

---

## Масштабирование

Когда ботов станет много:

1. **Load Balancer** - Nginx/HAProxy
2. **Redis** - для кэширования
3. **Message Queue** - RabbitMQ/Redis
4. **Microservices** - разделите на сервисы
5. **CDN** - для статики (Cloudflare)
6. **Kubernetes** - для оркестрации

---

## Поддержка

Если что-то не работает:

1. Проверьте логи
2. Убедитесь что все переменные установлены
3. Проверьте HTTPS
4. Откройте issue на GitHub

Удачи! 🚀
