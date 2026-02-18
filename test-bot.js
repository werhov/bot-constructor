/**
 * Test Generated Bot
 * Скрипт для тестирования сгенерированных ботов
 */

const readline = require('readline');

// Пример конфигурации бота (полученной из конструктора)
const testBotConfig = {
    name: 'Test Bot',
    description: 'Тестовый бот для проверки',
    welcomeMessage: 'Привет! Я тестовый бот. Попробуй команды: /help, /info, /echo',
    commands: [
        {
            command: 'help',
            description: 'Показать справку',
            response: '📖 Доступные команды:\n/start - Начать\n/help - Справка\n/info - Информация\n/echo - Эхо тест'
        },
        {
            command: 'info',
            description: 'Информация о боте',
            response: '🤖 Я тестовый бот созданный в Bot Constructor!\n\nВерсия: 1.0.0\nПлатформа: Test Mode'
        },
        {
            command: 'echo',
            description: 'Повторить сообщение',
            response: '👂 Отправьте мне любое сообщение после /echo и я его повторю!'
        }
    ]
};

// Простой эмулятор бота
class BotEmulator {
    constructor(config) {
        this.config = config;
        this.lastCommand = null;
    }

    processMessage(message) {
        const text = message.trim().toLowerCase();

        // Обработка /start
        if (text === '/start') {
            return this.config.welcomeMessage;
        }

        // Обработка /echo
        if (this.lastCommand === 'echo') {
            this.lastCommand = null;
            return `🔊 Вы сказали: "${message}"`;
        }

        if (text === '/echo') {
            this.lastCommand = 'echo';
            const cmd = this.config.commands.find(c => c.command === 'echo');
            return cmd ? cmd.response : 'Команда не найдена';
        }

        // Проверка других команд
        for (const cmd of this.config.commands) {
            if (text === `/${cmd.command}`) {
                return cmd.response;
            }
        }

        // Команда не найдена
        return '❌ Команда не найдена. Попробуйте /help';
    }

    getCommandsList() {
        let list = '📋 Доступные команды:\n\n';
        list += '/start - Приветственное сообщение\n';
        
        for (const cmd of this.config.commands) {
            list += `/${cmd.command} - ${cmd.description}\n`;
        }
        
        return list;
    }
}

// CLI интерфейс для тестирования
function startTestMode() {
    const bot = new BotEmulator(testBotConfig);
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '👤 Вы: '
    });

    console.log('\n╔══════════════════════════════════════════╗');
    console.log('║   🤖 Bot Constructor - Test Mode        ║');
    console.log('╚══════════════════════════════════════════╝\n');
    console.log(`Бот: ${testBotConfig.name}`);
    console.log(`Описание: ${testBotConfig.description}\n`);
    console.log(bot.getCommandsList());
    console.log('\n💡 Введите команду для тестирования');
    console.log('   Напишите "exit" для выхода\n');

    rl.prompt();

    rl.on('line', (line) => {
        const input = line.trim();

        if (input.toLowerCase() === 'exit') {
            console.log('\n👋 До свидания!\n');
            rl.close();
            return;
        }

        if (input.toLowerCase() === 'commands') {
            console.log('\n' + bot.getCommandsList() + '\n');
            rl.prompt();
            return;
        }

        if (!input) {
            rl.prompt();
            return;
        }

        // Получаем ответ бота
        const response = bot.processMessage(input);
        
        console.log(`\n🤖 Бот: ${response}\n`);
        rl.prompt();
    });

    rl.on('close', () => {
        process.exit(0);
    });
}

// Автоматический тест всех команд
function runAutomatedTest() {
    console.log('\n╔══════════════════════════════════════════╗');
    console.log('║   🧪 Automated Bot Test                 ║');
    console.log('╚══════════════════════════════════════════╝\n');

    const bot = new BotEmulator(testBotConfig);
    const testCases = [
        '/start',
        '/help',
        '/info',
        '/echo',
        'Тестовое сообщение',
        '/unknown',
        ''
    ];

    let passed = 0;
    let failed = 0;

    testCases.forEach((testCase, index) => {
        console.log(`\n[Test ${index + 1}] Input: "${testCase}"`);
        
        try {
            const response = bot.processMessage(testCase);
            console.log(`✅ Output: ${response}`);
            passed++;
        } catch (error) {
            console.log(`❌ Error: ${error.message}`);
            failed++;
        }
    });

    console.log('\n╔══════════════════════════════════════════╗');
    console.log(`║   📊 Test Results                        ║`);
    console.log('╚══════════════════════════════════════════╝');
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📈 Success Rate: ${((passed / testCases.length) * 100).toFixed(1)}%\n`);
}

// Генерация тестового кода
function generateTestCode() {
    const code = `
// Generated Telegram Bot Test Code
const TelegramBot = require('node-telegram-bot-api');

const token = 'TEST_TOKEN';
const bot = new TelegramBot(token, { polling: true });

// Configuration
const config = ${JSON.stringify(testBotConfig, null, 2)};

// /start command
bot.onText(/\\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, config.welcomeMessage);
});

// Dynamic command handling
${testBotConfig.commands.map(cmd => `
bot.onText(/\\/${cmd.command}/, (msg) => {
    bot.sendMessage(msg.chat.id, \`${cmd.response}\`);
});`).join('\n')}

console.log('✅ Test bot is running!');
    `.trim();

    console.log('\n╔══════════════════════════════════════════╗');
    console.log('║   📝 Generated Test Code                 ║');
    console.log('╚══════════════════════════════════════════╝\n');
    console.log(code);
    console.log('\n');
}

// Проверка конфигурации бота
function validateBotConfig(config) {
    console.log('\n╔══════════════════════════════════════════╗');
    console.log('║   ✔️  Configuration Validation           ║');
    console.log('╚══════════════════════════════════════════╝\n');

    const issues = [];

    if (!config.name || config.name.trim() === '') {
        issues.push('❌ Bot name is empty');
    } else {
        console.log('✅ Bot name: OK');
    }

    if (!config.description || config.description.trim() === '') {
        issues.push('⚠️  Bot description is empty (optional)');
    } else {
        console.log('✅ Bot description: OK');
    }

    if (!config.welcomeMessage || config.welcomeMessage.trim() === '') {
        issues.push('❌ Welcome message is empty');
    } else {
        console.log('✅ Welcome message: OK');
    }

    if (!config.commands || config.commands.length === 0) {
        issues.push('⚠️  No commands defined');
    } else {
        console.log(`✅ Commands: ${config.commands.length} defined`);
        
        config.commands.forEach((cmd, index) => {
            if (!cmd.command) {
                issues.push(`❌ Command ${index + 1}: Missing command name`);
            }
            if (!cmd.response) {
                issues.push(`❌ Command ${index + 1}: Missing response`);
            }
        });
    }

    console.log('\n');

    if (issues.length > 0) {
        console.log('⚠️  Issues found:\n');
        issues.forEach(issue => console.log(`  ${issue}`));
        console.log('\n');
        return false;
    } else {
        console.log('🎉 Configuration is valid!\n');
        return true;
    }
}

// Main
const args = process.argv.slice(2);
const mode = args[0] || 'interactive';

console.clear();

switch (mode) {
    case 'interactive':
    case 'test':
        startTestMode();
        break;
    
    case 'auto':
    case 'automated':
        runAutomatedTest();
        break;
    
    case 'generate':
    case 'code':
        generateTestCode();
        break;
    
    case 'validate':
    case 'check':
        validateBotConfig(testBotConfig);
        break;
    
    default:
        console.log('\n╔══════════════════════════════════════════╗');
        console.log('║   🤖 Bot Constructor Test Tool          ║');
        console.log('╚══════════════════════════════════════════╝\n');
        console.log('Usage: node test-bot.js [mode]\n');
        console.log('Modes:');
        console.log('  interactive - Interactive test mode (default)');
        console.log('  auto        - Run automated tests');
        console.log('  generate    - Generate test code');
        console.log('  validate    - Validate bot configuration\n');
        console.log('Examples:');
        console.log('  node test-bot.js');
        console.log('  node test-bot.js auto');
        console.log('  node test-bot.js generate\n');
}
