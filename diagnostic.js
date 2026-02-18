#!/usr/bin/env node

/**
 * Diagnostic Script - Проверка настроек Bot Constructor
 */

const fs = require('fs');
const path = require('path');

console.log('\n╔══════════════════════════════════════════╗');
console.log('║   🔍 Bot Constructor Diagnostic          ║');
console.log('╚══════════════════════════════════════════╝\n');

let errors = 0;
let warnings = 0;

// 1. Проверка Node.js версии
console.log('1️⃣  Проверка Node.js версии...');
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.split('.')[0].substring(1));

if (majorVersion >= 16) {
    console.log(`   ✅ Node.js ${nodeVersion} (OK)\n`);
} else {
    console.log(`   ❌ Node.js ${nodeVersion} (Нужна версия >= 16)\n`);
    errors++;
}

// 2. Проверка .env файла
console.log('2️⃣  Проверка .env файла...');
const envPath = path.join(__dirname, '.env');

if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    console.log('   ✅ Файл .env найден');
    
    // Проверка токена
    if (envContent.includes('TELEGRAM_BOT_TOKEN=') && 
        !envContent.includes('YOUR_BOT_TOKEN') &&
        !envContent.includes('your_bot_token_here')) {
        console.log('   ✅ Токен бота настроен');
    } else {
        console.log('   ❌ Токен бота НЕ настроен или использует пример');
        console.log('      → Откройте .env и добавьте токен от @BotFather');
        errors++;
    }
    
    // Проверка URL
    if (envContent.includes('MINI_APP_URL=')) {
        console.log('   ✅ URL Mini App настроен\n');
    } else {
        console.log('   ⚠️  URL Mini App не найден\n');
        warnings++;
    }
} else {
    console.log('   ❌ Файл .env НЕ НАЙДЕН');
    console.log('      → Скопируйте: cp .env.example .env\n');
    errors++;
}

// 3. Проверка package.json
console.log('3️⃣  Проверка package.json...');
const packagePath = path.join(__dirname, 'package.json');

if (fs.existsSync(packagePath)) {
    console.log('   ✅ package.json найден\n');
} else {
    console.log('   ❌ package.json НЕ НАЙДЕН\n');
    errors++;
}

// 4. Проверка node_modules
console.log('4️⃣  Проверка зависимостей...');
const nodeModulesPath = path.join(__dirname, 'node_modules');

if (fs.existsSync(nodeModulesPath)) {
    console.log('   ✅ node_modules найден');
    
    // Проверка важных пакетов
    const requiredPackages = [
        'express',
        'node-telegram-bot-api',
        'discord.js'
    ];
    
    let missingPackages = [];
    requiredPackages.forEach(pkg => {
        const pkgPath = path.join(nodeModulesPath, pkg);
        if (!fs.existsSync(pkgPath)) {
            missingPackages.push(pkg);
        }
    });
    
    if (missingPackages.length === 0) {
        console.log('   ✅ Все зависимости установлены\n');
    } else {
        console.log(`   ⚠️  Отсутствуют пакеты: ${missingPackages.join(', ')}`);
        console.log('      → Запустите: npm install\n');
        warnings++;
    }
} else {
    console.log('   ❌ node_modules НЕ НАЙДЕН');
    console.log('      → Запустите: npm install\n');
    errors++;
}

// 5. Проверка основных файлов
console.log('5️⃣  Проверка файлов проекта...');
const requiredFiles = [
    'server.js',
    'main-bot.js',
    'simple-bot.js',
    'bot-constructor-miniapp.html'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
    if (fs.existsSync(path.join(__dirname, file))) {
        console.log(`   ✅ ${file}`);
    } else {
        console.log(`   ❌ ${file} НЕ НАЙДЕН`);
        allFilesExist = false;
        errors++;
    }
});

if (allFilesExist) {
    console.log('');
}

// 6. Проверка портов
console.log('6️⃣  Проверка доступных портов...');
const net = require('net');

function checkPort(port) {
    return new Promise((resolve) => {
        const server = net.createServer();
        
        server.once('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                resolve(false);
            } else {
                resolve(true);
            }
        });
        
        server.once('listening', () => {
            server.close();
            resolve(true);
        });
        
        server.listen(port);
    });
}

(async () => {
    const port3000Available = await checkPort(3000);
    
    if (port3000Available) {
        console.log('   ✅ Порт 3000 свободен\n');
    } else {
        console.log('   ⚠️  Порт 3000 занят');
        console.log('      → Измените PORT в .env или остановите другое приложение\n');
        warnings++;
    }

    // Итоги
    console.log('╔══════════════════════════════════════════╗');
    console.log('║   📊 Результаты диагностики              ║');
    console.log('╚══════════════════════════════════════════╝\n');

    if (errors === 0 && warnings === 0) {
        console.log('✅ Всё отлично! Можно запускать бота.\n');
        console.log('📝 Следующие шаги:');
        console.log('   1. npm start           # Запустить сервер');
        console.log('   2. node simple-bot.js  # Запустить бота\n');
        process.exit(0);
    } else {
        console.log(`❌ Найдено ошибок: ${errors}`);
        console.log(`⚠️  Предупреждений: ${warnings}\n`);
        
        console.log('🔧 Что нужно исправить:\n');
        
        if (errors > 0) {
            console.log('Критические проблемы:');
            console.log('  1. Проверьте .env файл (токен бота)');
            console.log('  2. Установите зависимости: npm install');
            console.log('  3. Проверьте версию Node.js: node -v\n');
        }
        
        if (warnings > 0) {
            console.log('Предупреждения можно игнорировать, но лучше исправить.\n');
        }
        
        process.exit(1);
    }
})();
