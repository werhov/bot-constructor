/**
 * Bot Examples - Готовые шаблоны ботов
 * Используйте эти примеры как основу для своих ботов
 */

// 🤖 Пример 1: Простой информационный бот
const simpleInfoBot = {
    name: 'InfoBot',
    description: 'Простой информационный бот',
    welcomeMessage: 'Привет! Я помогу тебе узнать информацию о нашей компании.',
    commands: [
        {
            command: 'about',
            description: 'О компании',
            response: '🏢 Мы занимаемся разработкой инновационных решений с 2020 года.'
        },
        {
            command: 'contact',
            description: 'Контакты',
            response: '📞 Контакты:\nEmail: info@company.com\nТелефон: +7 (999) 123-45-67'
        },
        {
            command: 'hours',
            description: 'Часы работы',
            response: '⏰ Режим работы:\nПн-Пт: 9:00 - 18:00\nСб-Вс: Выходной'
        }
    ]
};

// 🎮 Пример 2: Игровой бот
const gameBot = {
    name: 'GameBot',
    description: 'Бот с мини-играми',
    welcomeMessage: 'Привет! Давай поиграем! 🎮\n\nДоступные игры:\n/dice - Брось кубик\n/coin - Подбрось монетку\n/8ball - Магический шар',
    commands: [
        {
            command: 'dice',
            description: 'Бросить кубик',
            response: '🎲 Результат броска: [используйте эмодзи dice в реальном боте]'
        },
        {
            command: 'coin',
            description: 'Подбросить монетку',
            response: '🪙 Монетка упала... Орёл!'
        },
        {
            command: '8ball',
            description: 'Магический шар предсказаний',
            response: '🔮 Магический шар говорит: Определённо да!'
        },
        {
            command: 'score',
            description: 'Ваш счёт',
            response: '📊 Ваша статистика:\n🎲 Бросков кубика: 15\n🪙 Подбрасываний монеты: 8\n🔮 Вопросов шару: 12'
        }
    ]
};

// 📚 Пример 3: Образовательный бот
const educationBot = {
    name: 'LearnBot',
    description: 'Образовательный бот для изучения программирования',
    welcomeMessage: '👨‍💻 Привет! Я помогу тебе изучать программирование.\n\nВыбери тему:\n/python - Python\n/javascript - JavaScript\n/html - HTML/CSS',
    commands: [
        {
            command: 'python',
            description: 'Изучить Python',
            response: '🐍 Python - мощный язык программирования!\n\nПервый урок:\nprint("Hello, World!")\n\nПопробуй написать свою первую программу!'
        },
        {
            command: 'javascript',
            description: 'Изучить JavaScript',
            response: '⚡ JavaScript - язык веба!\n\nПервый урок:\nconsole.log("Hello, World!");\n\nЭто твоя первая JS программа!'
        },
        {
            command: 'html',
            description: 'Изучить HTML',
            response: '🎨 HTML - структура веб-страниц!\n\nПример:\n<h1>Привет, мир!</h1>\n<p>Это мой первый сайт</p>'
        },
        {
            command: 'quiz',
            description: 'Пройти квиз',
            response: '❓ Вопрос 1:\nЧто выводит print("2" + "2") в Python?\n\nA) 4\nB) 22\nC) Ошибка'
        }
    ]
};

// 🛍️ Пример 4: E-commerce бот
const shopBot = {
    name: 'ShopBot',
    description: 'Бот интернет-магазина',
    welcomeMessage: '🛍️ Добро пожаловать в наш магазин!\n\nКоманды:\n/catalog - Каталог\n/cart - Корзина\n/orders - Мои заказы\n/support - Поддержка',
    commands: [
        {
            command: 'catalog',
            description: 'Посмотреть каталог',
            response: '📱 Каталог товаров:\n\n1. iPhone 15 Pro - 99,990₽\n2. Samsung S24 - 89,990₽\n3. AirPods Pro - 24,990₽\n\nДля заказа используйте /order [номер]'
        },
        {
            command: 'cart',
            description: 'Моя корзина',
            response: '🛒 Ваша корзина:\n\n1. iPhone 15 Pro - 99,990₽\n\nИтого: 99,990₽\n\n/checkout - Оформить заказ'
        },
        {
            command: 'orders',
            description: 'Мои заказы',
            response: '📦 Ваши заказы:\n\n#12345 - В пути (прибудет завтра)\n#12344 - Доставлен\n\nТрек-номер: TR123456789'
        },
        {
            command: 'support',
            description: 'Связаться с поддержкой',
            response: '💬 Поддержка:\n\nОтветим в течение 5 минут!\nEmail: support@shop.com\nТелефон: 8-800-555-35-35'
        }
    ]
};

// 🎵 Пример 5: Музыкальный бот
const musicBot = {
    name: 'MusicBot',
    description: 'Музыкальный бот с плейлистами',
    welcomeMessage: '🎵 Привет, меломан!\n\nЯ помогу тебе найти классную музыку!\n\n/trending - Тренды\n/genres - Жанры\n/playlist - Мой плейлист',
    commands: [
        {
            command: 'trending',
            description: 'Популярные треки',
            response: '🔥 Топ треков сегодня:\n\n1. Artist - Song Name\n2. Artist - Song Name\n3. Artist - Song Name\n\nХочешь послушать? /play [номер]'
        },
        {
            command: 'genres',
            description: 'Выбрать жанр',
            response: '🎸 Доступные жанры:\n\n1. Rock\n2. Pop\n3. Hip-Hop\n4. Electronic\n5. Jazz\n\n/genre [номер]'
        },
        {
            command: 'playlist',
            description: 'Мой плейлист',
            response: '💿 Ваш плейлист (12 треков):\n\n1. Любимая песня\n2. Другая песня\n\n/shuffle - Перемешать\n/clear - Очистить'
        },
        {
            command: 'search',
            description: 'Поиск музыки',
            response: '🔍 Введите название трека или исполнителя после команды\n\nПример: /search Queen Bohemian Rhapsody'
        }
    ]
};

// 🏋️ Пример 6: Фитнес бот
const fitnessBot = {
    name: 'FitBot',
    description: 'Персональный фитнес-тренер',
    welcomeMessage: '💪 Привет! Я твой фитнес-помощник!\n\nДавай приведём тебя в форму!\n\n/workout - Тренировка\n/diet - Питание\n/progress - Прогресс',
    commands: [
        {
            command: 'workout',
            description: 'Тренировка на сегодня',
            response: '🏋️ Тренировка дня:\n\n• Разминка - 5 мин\n• Приседания - 3x15\n• Отжимания - 3x10\n• Планка - 3x30 сек\n\n/done - Отметить выполнение'
        },
        {
            command: 'diet',
            description: 'План питания',
            response: '🥗 Рацион на сегодня:\n\nЗавтрак: Овсянка + банан\nОбед: Курица + рис + овощи\nУжин: Рыба + салат\n\nКалории: 1800 ккал'
        },
        {
            command: 'progress',
            description: 'Мой прогресс',
            response: '📈 Твой прогресс:\n\n🏃 Тренировок: 45\n🔥 Сожжено калорий: 15,000\n📉 Потеряно вес: -5 кг\n💪 Новый рекорд!\n\nПродолжай в том же духе!'
        },
        {
            command: 'water',
            description: 'Напоминание о воде',
            response: '💧 Не забывай пить воду!\n\nВыпито сегодня: 1.5л / 2.5л\n\n/drink - Отметить стакан воды'
        }
    ]
};

// 🎓 Пример 7: Бот-викторина
const quizBot = {
    name: 'QuizMaster',
    description: 'Бот для викторин и тестов',
    welcomeMessage: '🎯 Проверь свои знания!\n\nТемы викторин:\n/history - История\n/science - Наука\n/movies - Кино\n/random - Случайные вопросы',
    commands: [
        {
            command: 'history',
            description: 'Викторина по истории',
            response: '📜 Вопрос 1/10:\n\nВ каком году началась Первая мировая война?\n\nA) 1912\nB) 1914\nC) 1916\nD) 1918\n\nОтветь буквой!'
        },
        {
            command: 'science',
            description: 'Викторина по науке',
            response: '🔬 Вопрос 1/10:\n\nКакая планета самая большая в Солнечной системе?\n\nA) Земля\nB) Юпитер\nC) Сатурн\nD) Нептун'
        },
        {
            command: 'movies',
            description: 'Викторина о фильмах',
            response: '🎬 Вопрос 1/10:\n\nКто режиссёр фильма "Начало" (Inception)?\n\nA) Спилберг\nB) Нолан\nC) Тарантино\nD) Скорсезе'
        },
        {
            command: 'score',
            description: 'Моя статистика',
            response: '🏆 Твоя статистика:\n\nВикторин пройдено: 15\nПравильных ответов: 87%\nМесто в рейтинге: 42\nОчки: 1,250\n\n/leaderboard - Таблица лидеров'
        }
    ]
};

// 🌤️ Пример 8: Погодный бот
const weatherBot = {
    name: 'WeatherBot',
    description: 'Бот прогноза погоды',
    welcomeMessage: '🌤️ Узнай прогноз погоды!\n\n/weather - Погода сейчас\n/forecast - Прогноз на неделю\n/alerts - Предупреждения',
    commands: [
        {
            command: 'weather',
            description: 'Текущая погода',
            response: '🌡️ Погода в Москве:\n\nТемпература: +15°C\nОщущается: +13°C\nВлажность: 65%\nВетер: 5 м/с\nОсадки: Нет\n\n☁️ Облачно'
        },
        {
            command: 'forecast',
            description: 'Прогноз на неделю',
            response: '📅 Прогноз на неделю:\n\nПн: ☀️ +18°C\nВт: ⛅ +16°C\nСр: 🌧️ +12°C\nЧт: 🌧️ +10°C\nПт: ☁️ +14°C\nСб: ☀️ +17°C\nВс: ☀️ +19°C'
        },
        {
            command: 'alerts',
            description: 'Погодные предупреждения',
            response: '⚠️ Погодные предупреждения:\n\nСегодня: Сильный ветер\nЗавтра: Гроза возможна\n\n/notify - Включить уведомления'
        },
        {
            command: 'settings',
            description: 'Настройки',
            response: '⚙️ Настройки:\n\nГород: Москва\nЕдиницы: Цельсий\nЯзык: Русский\n\n/setcity - Изменить город'
        }
    ]
};

// Экспорт всех примеров
module.exports = {
    simpleInfoBot,
    gameBot,
    educationBot,
    shopBot,
    musicBot,
    fitnessBot,
    quizBot,
    weatherBot,
    
    // Функция для получения примера по имени
    getExample: (name) => {
        const examples = {
            info: simpleInfoBot,
            game: gameBot,
            education: educationBot,
            shop: shopBot,
            music: musicBot,
            fitness: fitnessBot,
            quiz: quizBot,
            weather: weatherBot
        };
        return examples[name.toLowerCase()] || null;
    },
    
    // Получить список всех примеров
    getAllExamples: () => [
        { id: 'info', name: 'InfoBot', category: 'business', emoji: '🏢' },
        { id: 'game', name: 'GameBot', category: 'entertainment', emoji: '🎮' },
        { id: 'education', name: 'LearnBot', category: 'education', emoji: '📚' },
        { id: 'shop', name: 'ShopBot', category: 'ecommerce', emoji: '🛍️' },
        { id: 'music', name: 'MusicBot', category: 'entertainment', emoji: '🎵' },
        { id: 'fitness', name: 'FitBot', category: 'health', emoji: '🏋️' },
        { id: 'quiz', name: 'QuizBot', category: 'education', emoji: '🎓' },
        { id: 'weather', name: 'WeatherBot', category: 'utility', emoji: '🌤️' }
    ]
};

// Если запущен напрямую, показать все примеры
if (require.main === module) {
    console.log('\n╔══════════════════════════════════════════╗');
    console.log('║   📚 Bot Examples Library                ║');
    console.log('╚══════════════════════════════════════════╝\n');
    
    const examples = module.exports.getAllExamples();
    
    console.log('Доступные примеры ботов:\n');
    
    examples.forEach((example, index) => {
        console.log(`${index + 1}. ${example.emoji} ${example.name}`);
        console.log(`   Категория: ${example.category}`);
        console.log('');
    });
    
    console.log('Использование в коде:');
    console.log("const { getExample } = require('./examples');");
    console.log("const bot = getExample('game');\n");
}
