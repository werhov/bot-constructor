// server.js - Backend для Bot Constructor
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// In-memory storage (в продакшене использовать БД)
const bots = new Map();
const activePreviews = new Map();

// Verify Telegram WebApp Data
function verifyTelegramWebAppData(initData, botToken) {
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    urlParams.delete('hash');
    
    const dataCheckString = Array.from(urlParams.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');
    
    const secretKey = crypto
        .createHmac('sha256', 'WebAppData')
        .update(botToken)
        .digest();
    
    const calculatedHash = crypto
        .createHmac('sha256', secretKey)
        .update(dataCheckString)
        .digest('hex');
    
    return calculatedHash === hash;
}

// Routes

// Serve Mini App
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'bot-constructor-miniapp.html'));
});

// Save bot configuration
app.post('/api/bots/save', (req, res) => {
    try {
        const { userId, botConfig, platform } = req.body;
        
        if (!userId || !botConfig) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const botId = `${userId}_${platform}_${Date.now()}`;
        
        bots.set(botId, {
            id: botId,
            userId,
            platform,
            config: botConfig,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        res.json({ 
            success: true, 
            botId,
            message: 'Bot saved successfully' 
        });
    } catch (error) {
        console.error('Save error:', error);
        res.status(500).json({ error: 'Failed to save bot' });
    }
});

// Get user's bots
app.get('/api/bots/:userId', (req, res) => {
    try {
        const { userId } = req.params;
        const userBots = Array.from(bots.values())
            .filter(bot => bot.userId === userId);
        
        res.json({ bots: userBots });
    } catch (error) {
        console.error('Get bots error:', error);
        res.status(500).json({ error: 'Failed to get bots' });
    }
});

// Start preview session
app.post('/api/preview/start', (req, res) => {
    try {
        const { botConfig, platform } = req.body;
        const previewId = crypto.randomBytes(16).toString('hex');
        
        // Create isolated preview instance
        const preview = {
            id: previewId,
            platform,
            config: botConfig,
            messages: [{
                type: 'bot',
                text: botConfig.welcomeMessage || 'Привет!',
                timestamp: Date.now()
            }],
            createdAt: Date.now(),
            expiresAt: Date.now() + (30 * 60 * 1000) // 30 минут
        };
        
        activePreviews.set(previewId, preview);
        
        // Auto-cleanup after 30 minutes
        setTimeout(() => {
            activePreviews.delete(previewId);
        }, 30 * 60 * 1000);
        
        res.json({ 
            success: true, 
            previewId,
            initialMessages: preview.messages
        });
    } catch (error) {
        console.error('Preview start error:', error);
        res.status(500).json({ error: 'Failed to start preview' });
    }
});

// Send message to preview
app.post('/api/preview/:previewId/message', (req, res) => {
    try {
        const { previewId } = req.params;
        const { message } = req.body;
        
        const preview = activePreviews.get(previewId);
        
        if (!preview) {
            return res.status(404).json({ error: 'Preview session not found' });
        }
        
        if (Date.now() > preview.expiresAt) {
            activePreviews.delete(previewId);
            return res.status(410).json({ error: 'Preview session expired' });
        }
        
        // Add user message
        const userMsg = {
            type: 'user',
            text: message,
            timestamp: Date.now()
        };
        preview.messages.push(userMsg);
        
        // Process command
        let response = 'Команда не найдена 🤷‍♂️';
        
        // Check for /start
        if (message.toLowerCase().trim() === '/start') {
            response = preview.config.welcomeMessage || 'Привет!';
        } else {
            // Check custom commands
            const cmd = preview.config.commands?.find(c => 
                message.toLowerCase().trim() === `/${c.command.toLowerCase()}`
            );
            
            if (cmd) {
                response = cmd.response;
            }
        }
        
        // Add bot response
        const botMsg = {
            type: 'bot',
            text: response,
            timestamp: Date.now()
        };
        preview.messages.push(botMsg);
        
        res.json({ 
            success: true,
            response: botMsg
        });
    } catch (error) {
        console.error('Message error:', error);
        res.status(500).json({ error: 'Failed to process message' });
    }
});

// Export bot code
app.post('/api/bots/export', (req, res) => {
    try {
        const { platform, botConfig } = req.body;
        
        let code = '';
        
        if (platform === 'telegram') {
            code = generateTelegramBot(botConfig);
        } else if (platform === 'discord') {
            code = generateDiscordBot(botConfig);
        }
        
        res.json({ 
            success: true, 
            code,
            filename: `${botConfig.name.replace(/\s/g, '_')}_${platform}.js`
        });
    } catch (error) {
        console.error('Export error:', error);
        res.status(500).json({ error: 'Failed to export bot' });
    }
});

// Deploy bot (would integrate with hosting service)
app.post('/api/bots/deploy', async (req, res) => {
    try {
        const { botId, deployConfig } = req.body;
        
        const bot = bots.get(botId);
        if (!bot) {
            return res.status(404).json({ error: 'Bot not found' });
        }
        
        // Здесь была бы интеграция с сервисом деплоя
        // Например: Railway, Heroku, Vercel, etc.
        
        res.json({ 
            success: true,
            message: 'Bot deployed successfully',
            url: `https://your-bot-${botId}.railway.app`,
            webhookUrl: `https://api.telegram.org/bot${deployConfig.token}/setWebhook?url=https://your-bot-${botId}.railway.app/webhook`
        });
    } catch (error) {
        console.error('Deploy error:', error);
        res.status(500).json({ error: 'Failed to deploy bot' });
    }
});

// Generate Telegram bot code
function generateTelegramBot(config) {
    const commandHandlers = config.commands?.map(cmd => `
// /${cmd.command} - ${cmd.description}
bot.onText(/\\/${cmd.command}/, async (msg) => {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, \`${cmd.response}\`);
});`).join('\n') || '';

    return `/**
 * ${config.name}
 * ${config.description}
 * Generated by Bot Constructor
 */

const TelegramBot = require('node-telegram-bot-api');

// Replace with your bot token from @BotFather
const token = process.env.BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';

// Create bot instance
const bot = new TelegramBot(token, { polling: true });

console.log('🤖 ${config.name} starting...');

// /start command
bot.onText(/\\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const welcomeMessage = \`${config.welcomeMessage}\`;
    
    await bot.sendMessage(chatId, welcomeMessage, {
        parse_mode: 'Markdown'
    });
});

${commandHandlers}

// Error handling
bot.on('polling_error', (error) => {
    console.error('Polling error:', error);
});

console.log('✅ ${config.name} is running!');
console.log('💡 Available commands:');
console.log('  /start - Welcome message');
${config.commands?.map(cmd => `console.log('  /${cmd.command} - ${cmd.description}');`).join('\n') || ''}
`;
}

// Generate Discord bot code
function generateDiscordBot(config) {
    const commandHandlers = config.commands?.map(cmd => `
    // !${cmd.command} - ${cmd.description}
    if (message.content.toLowerCase() === '!${cmd.command.toLowerCase()}') {
        await message.reply(\`${cmd.response}\`);
        return;
    }`).join('\n') || '';

    return `/**
 * ${config.name}
 * ${config.description}
 * Generated by Bot Constructor
 */

const { Client, GatewayIntentBits } = require('discord.js');

// Replace with your bot token from Discord Developer Portal
const token = process.env.BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';

// Create client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Bot ready event
client.once('ready', () => {
    console.log('✅ ${config.name} is online!');
    console.log(\`🤖 Logged in as \${client.user.tag}\`);
    console.log('💡 Available commands:');
    console.log('  !start - Welcome message');
${config.commands?.map(cmd => `    console.log('  !${cmd.command} - ${cmd.description}');`).join('\n') || ''}
});

// Message handler
client.on('messageCreate', async (message) => {
    // Ignore bot messages
    if (message.author.bot) return;

    // !start command
    if (message.content.toLowerCase() === '!start') {
        await message.reply(\`${config.welcomeMessage}\`);
        return;
    }

${commandHandlers}
});

// Error handling
client.on('error', (error) => {
    console.error('Discord client error:', error);
});

// Login
client.login(token);
`;
}

// Cleanup expired previews every 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [id, preview] of activePreviews.entries()) {
        if (now > preview.expiresAt) {
            activePreviews.delete(id);
            console.log(`Cleaned up expired preview: ${id}`);
        }
    }
}, 5 * 60 * 1000);

// Start server
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════╗
║   🤖 Bot Constructor Server           ║
║   ✅ Running on port ${PORT}            ║
║   🌐 http://localhost:${PORT}           ║
╚═══════════════════════════════════════╝
    `);
});

module.exports = app;
