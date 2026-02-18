# 🤖 Bot Constructor - Telegram Mini App

Полноценный конструктор ботов для Telegram и Discord прямо в Telegram!

## ✨ Возможности

- 🎨 **Визуальный редактор** - создавайте ботов без кода
- 🎮 **Живой предпросмотр** - тестируйте бота в реальном времени
- 📦 **Экспорт кода** - получайте готовый Node.js код
- 🚀 **Автодеплой** - разворачивайте ботов одним кликом
- 💾 **Облачное хранилище** - сохраняйте проекты в Telegram Cloud
- ✈️ **Telegram боты** - полная поддержка Telegram Bot API
- 💬 **Discord боты** - создание Discord ботов

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Создайте бота в Telegram

1. Откройте [@BotFather](https://t.me/BotFather)
2. Отправьте `/newbot`
3. Следуйте инструкциям
4. Скопируйте токен бота

### 3. Настройте переменные окружения

Создайте файл `.env`:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
MINI_APP_URL=https://your-domain.com
PORT=3000
```

### 4. Запустите сервер

```bash
npm start
```

Для разработки с auto-reload:

```bash
npm run dev
```

### 5. Запустите главного бота

```bash
node main-bot.js
```

## 📱 Деплой Mini App

### Вариант 1: Vercel (рекомендуется)

1. Установите Vercel CLI:
```bash
npm i -g vercel
```

2. Деплой:
```bash
vercel
```

3. Обновите MINI_APP_URL в `.env`

### Вариант 2: Railway

1. Создайте аккаунт на [Railway](https://railway.app)
2. Подключите репозиторий
3. Добавьте переменные окружения
4. Деплой автоматический

### Вариант 3: Heroku

```bash
heroku create your-bot-constructor
git push heroku main
heroku config:set TELEGRAM_BOT_TOKEN=your_token
```

## 🔧 Настройка Telegram Mini App

1. Откройте [@BotFather](https://t.me/BotFather)
2. Отправьте `/mybots`
3. Выберите вашего бота
4. Нажмите "Bot Settings" → "Menu Button"
5. Выберите "Configure menu button"
6. Отправьте URL вашего Mini App
7. Отправьте текст кнопки: "🚀 Открыть конструктор"

## 📁 Структура проекта

```
bot-constructor/
├── bot-constructor-miniapp.html  # Mini App интерфейс
├── server.js                      # Backend API
├── main-bot.js                    # Главный Telegram бот
├── package.json                   # Зависимости
├── .env                           # Конфигурация
└── README.md                      # Документация
```

## 🎯 Использование

### Создание бота

1. Откройте бота в Telegram
2. Нажмите `/start`
3. Кликните "🚀 Открыть конструктор"
4. Выберите платформу (Telegram/Discord)
5. Заполните настройки бота
6. Добавьте команды

### Добавление команд

1. Нажмите "➕ Добавить команду"
2. Введите название команды (без `/`)
3. Добавьте описание
4. Напишите ответ бота
5. Сохраните

### Тестирование

1. Перейдите во вкладку "🎮 Превью"
2. Отправьте команды боту
3. Проверьте ответы
4. Нажмите "🔄 Сброс" для очистки

### Экспорт кода

1. Перейдите во вкладку "📦 Экспорт"
2. Просмотрите сгенерированный код
3. Нажмите "📋 Скопировать код"
4. Сохраните в файл `bot.js`

### Запуск экспортированного бота

#### Telegram:

```bash
npm install node-telegram-bot-api
node bot.js
```

#### Discord:

```bash
npm install discord.js
node bot.js
```

## 🔑 API Endpoints

### Сохранение бота
```http
POST /api/bots/save
Content-Type: application/json

{
  "userId": "12345",
  "platform": "telegram",
  "botConfig": {
    "name": "My Bot",
    "description": "Bot description",
    "welcomeMessage": "Hello!",
    "commands": [...]
  }
}
```

### Получение ботов пользователя
```http
GET /api/bots/:userId
```

### Старт предпросмотра
```http
POST /api/preview/start
Content-Type: application/json

{
  "platform": "telegram",
  "botConfig": {...}
}
```

### Отправка сообщения в предпросмотр
```http
POST /api/preview/:previewId/message
Content-Type: application/json

{
  "message": "/start"
}
```

### Экспорт кода
```http
POST /api/bots/export
Content-Type: application/json

{
  "platform": "telegram",
  "botConfig": {...}
}
```

## 🎨 Кастомизация

### Изменение темы

Отредактируйте CSS переменные в `bot-constructor-miniapp.html`:

```css
:root {
    --tg-theme-bg-color: #0f0f1e;
    --tg-theme-text-color: #e8e8ff;
    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    /* ... */
}
```

### Добавление новых функций

1. Отредактируйте React компоненты в HTML файле
2. Добавьте API endpoints в `server.js`
3. Обновите главного бота в `main-bot.js`

## 🐛 Отладка

### Проверка логов сервера
```bash
npm start
```

### Проверка логов бота
```bash
node main-bot.js
```

### Тестирование API
```bash
curl http://localhost:3000/api/bots/12345
```

## 🔒 Безопасность

- ✅ Валидация Telegram WebApp данных
- ✅ Изоляция preview сессий
- ✅ Автоматическое истечение сессий (30 мин)
- ✅ Санитизация пользовательского ввода
- ✅ Rate limiting (добавьте middleware)

## 📊 Мониторинг

### Логирование
```javascript
// server.js уже логирует:
- Созданные боты
- Preview сессии
- Ошибки API
```

### Метрики (добавьте при необходимости)
- Количество созданных ботов
- Активные preview сессии
- API requests/min
- Errors rate

## 🚀 Production Checklist

- [ ] Настроить базу данных (PostgreSQL/MongoDB)
- [ ] Добавить Redis для кэширования
- [ ] Настроить rate limiting
- [ ] Добавить логирование (Winston/Pino)
- [ ] Настроить мониторинг (Sentry/DataDog)
- [ ] Включить HTTPS
- [ ] Настроить CDN для статики
- [ ] Добавить бэкапы
- [ ] Настроить CI/CD
- [ ] Добавить тесты

## 🤝 Contributing

1. Fork репозитория
2. Создайте feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit изменения (`git commit -m 'Add AmazingFeature'`)
4. Push в branch (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📝 TODO

- [ ] Интеграция с БД
- [ ] Автоматический деплой ботов
- [ ] Визуальный редактор flow/диалогов
- [ ] Поддержка inline кнопок
- [ ] Webhook режим для Telegram
- [ ] Статистика использования ботов
- [ ] Marketplace ботов
- [ ] Шаблоны ботов
- [ ] A/B тестирование ответов
- [ ] Интеграция с AI (ChatGPT/Claude)

## 📄 License

MIT License - используйте свободно!

## 💬 Поддержка

Если возникли вопросы:
- 📧 Email: support@botconstructor.dev
- 💬 Telegram: [@YourSupportBot](https://t.me/YourSupportBot)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/bot-constructor/issues)

## 🎉 Благодарности

- Telegram за Mini Apps API
- Discord за Bot API
- React команде
- Всем контрибьюторам

---

Сделано с ❤️ для сообщества
