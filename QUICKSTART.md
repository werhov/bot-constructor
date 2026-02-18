# 🚀 Быстрый старт - Bot Constructor

## За 5 минут до первого бота!

### 1️⃣ Установка (1 минута)

```bash
# Клонируйте или скачайте файлы
npm install
```

### 2️⃣ Настройка бота в Telegram (2 минуты)

1. Откройте [@BotFather](https://t.me/BotFather)
2. Отправьте `/newbot`
3. Придумайте имя: `My Bot Constructor`
4. Придумайте username: `my_bot_constructor_bot`
5. **Сохраните токен!** Например: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`

### 3️⃣ Конфигурация (30 секунд)

```bash
# Скопируйте файл примера
cp .env.example .env

# Отредактируйте .env и вставьте ваш токен
# TELEGRAM_BOT_TOKEN=ваш_токен_здесь
# MINI_APP_URL=http://localhost:3000
```

### 4️⃣ Запуск (1 минута)

```bash
# В первом терминале - запустите сервер
npm start

# Во втором терминале - запустите бота
node main-bot.js
```

### 5️⃣ Тестирование (30 секунд)

1. Откройте вашего бота в Telegram
2. Нажмите `/start`
3. Нажмите кнопку "🚀 Открыть конструктор"
4. Начните создавать своего первого бота! 🎉

---

## 📁 Структура проекта

```
bot-constructor/
├── 📄 bot-constructor-miniapp.html  ← Telegram Mini App (UI)
├── 📄 server.js                      ← Backend API
├── 📄 main-bot.js                    ← Главный Telegram бот
├── 📄 examples.js                    ← Готовые примеры ботов
├── 📄 test-bot.js                    ← Инструмент для тестирования
├── 📄 package.json                   ← Зависимости Node.js
├── 📄 .env.example                   ← Пример конфигурации
├── 📄 .gitignore                     ← Git ignore rules
├── 📚 README.md                      ← Полная документация
├── 🚀 DEPLOY.md                      ← Инструкции по деплою
└── 🗺️  ROADMAP.md                     ← План развития
```

---

## 🎯 Основные команды

```bash
# Установка
npm install

# Разработка
npm run dev        # Сервер с auto-reload

# Production
npm start          # Запуск сервера
node main-bot.js   # Запуск бота

# Тестирование
node test-bot.js            # Интерактивный режим
node test-bot.js auto       # Автоматические тесты
node test-bot.js generate   # Генерация кода
node test-bot.js validate   # Проверка конфига
```

---

## 💡 Первый бот за 30 секунд

1. Откройте конструктор в Telegram
2. Выберите "Telegram" или "Discord"
3. Заполните:
   - Имя: `Мой первый бот`
   - Описание: `Тестовый бот`
   - Приветствие: `Привет! Я работаю! 🎉`
4. Добавьте команду:
   - Команда: `help`
   - Описание: `Помощь`
   - Ответ: `Я могу помочь тебе!`
5. Нажмите "💾 Сохранить"
6. Перейдите в "🎮 Превью"
7. Отправьте `/start` и `/help`
8. Работает! 🚀

---

## 📦 Экспорт кода

1. Перейдите во вкладку "📦 Экспорт"
2. Скопируйте код
3. Сохраните в файл `my-bot.js`
4. Установите зависимости:
   ```bash
   npm install node-telegram-bot-api  # для Telegram
   # или
   npm install discord.js              # для Discord
   ```
5. Замените токен в коде
6. Запустите: `node my-bot.js`

---

## 🎨 Примеры ботов

Попробуйте готовые примеры:

```bash
node examples.js
```

Доступно 8 шаблонов:
- 🏢 InfoBot - информационный
- 🎮 GameBot - игровой
- 📚 LearnBot - образовательный
- 🛍️ ShopBot - e-commerce
- 🎵 MusicBot - музыкальный
- 🏋️ FitBot - фитнес
- 🎓 QuizBot - викторины
- 🌤️ WeatherBot - погода

---

## 🆘 Проблемы?

### Бот не отвечает
```bash
# Проверьте логи
node main-bot.js
```

### Mini App не открывается
1. Убедитесь что сервер запущен: `npm start`
2. Проверьте `.env` файл
3. В @BotFather → Menu Button → обновите URL

### Ошибки при установке
```bash
# Очистите и переустановите
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Дальше

- 📖 Полная документация: `README.md`
- 🚀 Деплой в production: `DEPLOY.md`
- 🗺️ Планируемые функции: `ROADMAP.md`

---

## 💬 Поддержка

- 💌 Вопросы: создайте Issue на GitHub
- 📱 Telegram: [@YourSupportBot](https://t.me/your_support_bot)
- 📧 Email: support@botconstructor.dev

---

## ⭐ Нравится проект?

- ⭐ Поставьте звезду на GitHub
- 🔄 Поделитесь с друзьями
- 💬 Оставьте отзыв
- 🤝 Contribute - Pull Requests приветствуются!

---

**Создано с ❤️ для разработчиков**

🚀 Начните создавать своих ботов прямо сейчас!
