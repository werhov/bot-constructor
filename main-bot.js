/**
 * Main Telegram Bot - Entry Point
 * Этот бот открывает Mini App для конструирования ботов
 */

const TelegramBot = require('node-telegram-bot-api');

// Получите токен от @BotFather
const token = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN';

// URL вашего Mini App (после деплоя)
const MINI_APP_URL = process.env.MINI_APP_URL || 'https://your-domain.com';

const bot = new TelegramBot(token, { polling: true });

console.log('🚀 Bot Constructor Main Bot starting...');

// Приветственное сообщение
const welcomeMessage = `
🤖 **Добро пожаловать в Bot Constructor!**

Создавайте ботов для Telegram и Discord без программирования!

**Возможности:**
✅ Визуальный конструктор команд
✅ Живой предпросмотр бота
✅ Экспорт готового кода
✅ Автоматический деплой
✅ Поддержка Telegram и Discord

**Нажмите кнопку ниже чтобы начать** 👇
`;

// Команда /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    
    bot.sendMessage(chatId, welcomeMessage, {
        parse_mode: 'Markdown',
        reply_markup: {
            keyboard: [
                [{
                    text: '🚀 Открыть конструктор',
                    web_app: { url: MINI_APP_URL }
                }],
                [{ text: '📚 Мои боты' }, { text: '💡 Помощь' }]
            ],
            resize_keyboard: true
        }
    });
});

// Команда /help
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    
    const helpMessage = `
📖 **Руководство по использованию**

**1. Создание бота:**
- Нажмите "Открыть конструктор"
- Выберите платформу (Telegram/Discord)
- Заполните настройки
- Добавьте команды

**2. Тестирование:**
- Перейдите во вкладку "Превью"
- Отправьте команды боту
- Проверьте ответы

**3. Экспорт:**
- Перейдите во вкладку "Экспорт"
- Скопируйте код
- Разверните на сервере

**4. Деплой (скоро):**
- Автоматическое развертывание
- Готовый URL бота
- Мониторинг работы

**Команды:**
/start - Главное меню
/help - Это сообщение
/mybots - Список ваших ботов
/new - Создать нового бота
    `;
    
    bot.sendMessage(chatId, helpMessage, {
        parse_mode: 'Markdown'
    });
});

// Команда /mybots
bot.onText(/\/mybots/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    
    try {
        // Здесь был бы запрос к API для получения ботов пользователя
        const userBots = []; // Заглушка
        
        if (userBots.length === 0) {
            bot.sendMessage(chatId, 
                '📭 У вас пока нет созданных ботов.\n\nНажмите "Открыть конструктор" чтобы создать первого бота!',
                {
                    reply_markup: {
                        inline_keyboard: [[
                            { text: '🚀 Создать бота', web_app: { url: MINI_APP_URL } }
                        ]]
                    }
                }
            );
        } else {
            let message = '🤖 **Ваши боты:**\n\n';
            userBots.forEach((bot, index) => {
                message += `${index + 1}. ${bot.name}\n`;
                message += `   Platform: ${bot.platform}\n`;
                message += `   Created: ${bot.createdAt}\n\n`;
            });
            
            bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
        }
    } catch (error) {
        console.error('Error fetching bots:', error);
        bot.sendMessage(chatId, '❌ Ошибка при загрузке ботов. Попробуйте позже.');
    }
});

// Команда /new
bot.onText(/\/new/, (msg) => {
    const chatId = msg.chat.id;
    
    bot.sendMessage(chatId, 
        '🎨 Давайте создадим нового бота!\n\nОткройте конструктор чтобы начать:',
        {
            reply_markup: {
                inline_keyboard: [[
                    { text: '🚀 Открыть конструктор', web_app: { url: MINI_APP_URL } }
                ]]
            }
        }
    );
});

// Обработка кнопок клавиатуры (БЕЗ РЕКУРСИИ!)
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    
    // Игнорируем команды (они обрабатываются onText)
    if (!text || text.startsWith('/')) return;
    
    // Обрабатываем кнопки напрямую
    if (text === '📚 Мои боты') {
        const userId = msg.from.id;
        
        try {
            const userBots = []; // Заглушка
            
            if (userBots.length === 0) {
                bot.sendMessage(chatId, 
                    '📭 У вас пока нет созданных ботов.\n\nНажмите "Открыть конструктор" чтобы создать первого бота!',
                    {
                        reply_markup: {
                            inline_keyboard: [[
                                { text: '🚀 Создать бота', web_app: { url: MINI_APP_URL } }
                            ]]
                        }
                    }
                );
            }
        } catch (error) {
            console.error('Error:', error);
            bot.sendMessage(chatId, '❌ Ошибка при загрузке ботов.');
        }
    } else if (text === '💡 Помощь') {
        const helpMessage = `
📖 **Руководство по использованию**

**1. Создание бота:**
- Нажмите "Открыть конструктор"
- Выберите платформу (Telegram/Discord)
- Заполните настройки
- Добавьте команды

**2. Тестирование:**
- Перейдите во вкладку "Превью"
- Отправьте команды боту
- Проверьте ответы

**3. Экспорт:**
- Перейдите во вкладку "Экспорт"
- Скопируйте код
- Разверните на сервере

**Команды:**
/start - Главное меню
/help - Это сообщение
/mybots - Список ваших ботов
/new - Создать нового бота
        `;
        
        bot.sendMessage(chatId, helpMessage, {
            parse_mode: 'Markdown'
        });
    }
});

// Обработка Web App данных
bot.on('web_app_data', (msg) => {
    const chatId = msg.chat.id;
    const data = JSON.parse(msg.web_app_data.data);
    
    console.log('Received Web App data:', data);
    
    if (data.action === 'bot_saved') {
        bot.sendMessage(chatId, 
            `✅ Бот "${data.botName}" успешно сохранен!\n\n` +
            `Платформа: ${data.platform}\n` +
            `Команд: ${data.commandsCount}\n\n` +
            `Теперь вы можете экспортировать код или развернуть бота.`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: '📋 Экспорт кода', callback_data: `export_${data.botId}` }],
                        [{ text: '🚀 Развернуть', callback_data: `deploy_${data.botId}` }]
                    ]
                }
            }
        );
    }
});

// Обработка callback запросов
bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;
    
    if (data.startsWith('export_')) {
        const botId = data.replace('export_', '');
        bot.answerCallbackQuery(query.id, { text: 'Генерирую код...' });
        
        // Здесь был бы запрос к API для получения кода
        bot.sendMessage(chatId, 
            '📋 Код вашего бота готов!\n\nОткройте конструктор для просмотра.',
            {
                reply_markup: {
                    inline_keyboard: [[
                        { text: '👀 Открыть конструктор', web_app: { url: `${MINI_APP_URL}?tab=export&botId=${botId}` } }
                    ]]
                }
            }
        );
    } else if (data.startsWith('deploy_')) {
        const botId = data.replace('deploy_', '');
        bot.answerCallbackQuery(query.id, { text: 'Начинаю деплой...' });
        
        bot.sendMessage(chatId, 
            '🚀 Развертывание бота...\n\n' +
            'Это может занять несколько минут. Вы получите уведомление когда бот будет готов.',
            {
                reply_markup: {
                    inline_keyboard: [[
                        { text: '📊 Статус деплоя', callback_data: `status_${botId}` }
                    ]]
                }
            }
        );
        
        // Симуляция деплоя
        setTimeout(() => {
            bot.sendMessage(chatId,
                '✅ Бот успешно развернут!\n\n' +
                `🔗 URL: https://t.me/your_bot_${botId}\n` +
                `📊 Статус: Online\n` +
                `⏰ Время: ${new Date().toLocaleTimeString()}`
            );
        }, 3000);
    }
});

// Error handling
bot.on('polling_error', (error) => {
    console.error('Polling error:', error);
});

bot.on('error', (error) => {
    console.error('Bot error:', error);
});

console.log('✅ Bot Constructor Main Bot is running!');
console.log(`📱 Mini App URL: ${MINI_APP_URL}`);
console.log('💡 Send /start to begin');
