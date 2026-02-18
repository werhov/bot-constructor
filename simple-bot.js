/**
 * Простая тестовая версия Bot Constructor
 * Используйте эту версию если main-bot.js не работает
 */

const TelegramBot = require('node-telegram-bot-api');

// Получите токен от @BotFather
const token = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN';

// URL вашего Mini App (после деплоя)
const MINI_APP_URL = process.env.MINI_APP_URL || 'https://your-domain.com';

// Создаём бота
const bot = new TelegramBot(token, { polling: true });

console.log('🚀 Simple Bot Constructor starting...');
console.log(`Token: ${token.substring(0, 10)}...`);
console.log(`Mini App URL: ${MINI_APP_URL}`);

// Команда /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name || 'друг';

    const welcomeMessage = `
🤖 **Привет, ${firstName}!**

Добро пожаловать в Bot Constructor!

Создавайте ботов для Telegram и Discord без программирования!

**Возможности:**
✅ Визуальный конструктор команд
✅ Живой предпросмотр бота
✅ Экспорт готового кода
✅ Поддержка Telegram и Discord

**Команды:**
/start - Главное меню
/help - Помощь
/test - Тест бота
    `.trim();

    bot.sendMessage(chatId, welcomeMessage, {
        parse_mode: 'Markdown',
        reply_markup: {
            keyboard: [
                [{ text: '🚀 Открыть конструктор', web_app: { url: MINI_APP_URL } }],
                [{ text: '💡 Помощь' }, { text: '🧪 Тест' }]
            ],
            resize_keyboard: true
        }
    });

    console.log(`✅ /start from user ${msg.from.id} (${firstName})`);
});

// Команда /help
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;

    const helpMessage = `
📖 **Руководство по использованию**

**1. Создание бота:**
   - Нажмите "🚀 Открыть конструктор"
   - Выберите платформу
   - Настройте команды
   - Протестируйте в превью

**2. Команды бота:**
   /start - Главное меню
   /help - Эта справка
   /test - Проверить работу

**3. Нужна помощь?**
   Читайте README.md в архиве

Удачи! 🎉
    `.trim();

    bot.sendMessage(chatId, helpMessage, {
        parse_mode: 'Markdown'
    });

    console.log(`✅ /help from user ${msg.from.id}`);
});

// Команда /test
bot.onText(/\/test/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId,
        '✅ Бот работает отлично!\n\n' +
        `Время: ${new Date().toLocaleTimeString('ru')}\n` +
        `Ваш ID: ${msg.from.id}\n` +
        `Username: @${msg.from.username || 'не указан'}`
    );

    console.log(`✅ /test from user ${msg.from.id}`);
});

// Обработка текстовых кнопок (НЕ команд)
bot.on('message', (msg) => {
    // Пропускаем команды - они обрабатываются выше
    if (!msg.text || msg.text.startsWith('/')) return;

    const chatId = msg.chat.id;
    const text = msg.text;

    console.log(`📩 Message from ${msg.from.id}: ${text}`);

    if (text === '💡 Помощь') {
        // Вызываем /help вручную
        bot.sendMessage(chatId,
            '📖 **Руководство**\n\n' +
            'Используйте команды:\n' +
            '/start - Главное меню\n' +
            '/help - Подробная справка\n' +
            '/test - Проверка работы',
            { parse_mode: 'Markdown' }
        );
    } else if (text === '🧪 Тест') {
        // Вызываем /test вручную
        bot.sendMessage(chatId, '✅ Всё работает!');
    }
});

// Обработка ошибок polling
bot.on('polling_error', (error) => {
    console.error('❌ Polling error:', error.message);

    if (error.message.includes('401')) {
        console.error('\n⚠️  ОШИБКА: Неверный токен!');
        console.error('Проверьте TELEGRAM_BOT_TOKEN в .env файле\n');
    }
});

// Обработка других ошибок
bot.on('error', (error) => {
    console.error('❌ Bot error:', error.message);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Stopping bot...');
    bot.stopPolling();
    process.exit(0);
});

console.log('✅ Bot is running!');
console.log('💡 Open your bot in Telegram and send /start');
console.log('🛑 Press Ctrl+C to stop\n');
