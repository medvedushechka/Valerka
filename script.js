// Глобальные переменные
let currentUser = '';
let balloonsPopped = 0;
let totalBalloons = 20;

// Данные для входа (можно настроить под конкретного именинника)
const validCredentials = {
    // Вариации имени с тремя возможными датами
    'Валера': ['12.11.1998', '12.11.1999', '12.11.2000'],
    'Валерий': ['12.11.1998', '12.11.1999', '12.11.2000'],
    'Валерка': ['12.11.1998', '12.11.1999', '12.11.2000'],
    'Валерчик': ['12.11.1998', '12.11.1999', '12.11.2000'],
    'Валерочка': ['12.11.1998', '12.11.1999', '12.11.2000'],
    'Валерушка': ['12.11.1998', '12.11.1999', '12.11.2000'],
    'Валерик': ['12.11.1998', '12.11.1999', '12.11.2000'],
    'Валерон': ['12.11.1998', '12.11.1999', '12.11.2000'],
    'Валёра': ['12.11.1998', '12.11.1999', '12.11.2000'],
    'Валёрик': ['12.11.1998', '12.11.1999', '12.11.2000'],
    // Варианты в нижнем регистре
    'валера': ['12.11.1998', '12.11.1999', '12.11.2000'],
    'валерий': ['12.11.1998', '12.11.1999', '12.11.2000'],
    'валерка': ['12.11.1998', '12.11.1999', '12.11.2000'],
    'валерчик': ['12.11.1998', '12.11.1999', '12.11.2000'],
    'валёра': ['12.11.1998', '12.11.1999', '12.11.2000']
};

// Поздравления
const wishes = [{
        text: "Поздравляю, шеф! СБШ тебя не добило, ГИБДД не поймало, собака не перегрызла проводку в тачке — это уже победа. Твои лохмы — как флаг сопротивления: чем гуще, тем страшнее врагам. Пусть в новом году тебе поднимут зарплату (хотя бы до уровня собачьего корма премиум-класса), а СБШ наконец починят. Или хотя бы перестанут винить тебя в том, что она опять в яме.",
        author: "Данила",
        avatar: "Assets/Danila.png"
    },
    {
        text: "Гав Гав Гав Гав........Гав......Лохматый.....Гав Гав",
        author: "Кензо",
        avatar: "Assets/Kenzo.png"
    },
    {
        text: "Валера, утречко! Я это, на минут 800 сегодня опоздаю, норм же?",
        author: "Неизвестный",
        avatar: "Assets/Inkognito.png"
    },
    {
        text: "Здарова, это, не думал ддобавить ИИ в СБШ, Инкринометр, БКЗП ......",
        author: "Руденя",
        avatar: "Assets/Rudenya.png"
    },
    {
        text: "С днем рождения Валерка! Пусть легко даётся тебе все что ты планируешь и хочешь, желаю успехов в жизни и работе ну и по базе здоровья, счастья и всего хорошего, поменьше суеты и побольше расслабона)",
        author: "Саня",
        avatar: "Assets/Sanya.png"
    },
    {
        text: "Энергии тебе бесконечной, что б никто не мог ее ограничить как в искробезопасных цепях или засунуть во взрывозащищенную оболочку , дабы не дать ей выхода. Пусть энергии твоей хватит не только на себя, но и на твоих близких, приноси позитив, радуй, помогай. Все начинания пусть и не будут сильно прибыльными (по началу) , но главное что б были в кайф. Счастья, здоровья! (Бляяяяя , все-таки написал это)",
        author: "Влад",
        avatar: "Assets/Vlad.png"
    },
    {
        text: "Валера, с Днем Рождения!) Фарту по жизни, здоровья богатырского и успехов во всём)",
        author: "Денис",
        avatar: "Assets/Denis.png"
    }

];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', handleLogin);

    // Добавляем обработчик для поля даты рождения
    const birthdateInput = document.getElementById('birthdate');
    birthdateInput.addEventListener('input', formatBirthdate);
}

function formatBirthdate(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '.' + value.substring(2);
    }
    if (value.length >= 5) {
        value = value.substring(0, 5) + '.' + value.substring(5, 9);
    }
    e.target.value = value;
}

function handleLogin(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const birthdate = document.getElementById('birthdate').value.trim();

    if (validateCredentials(name, birthdate)) {
        currentUser = name;
        showGameScreen();
    } else {
        alert('Неверное имя или дата рождения! Попробуйте ещё раз.');
    }
}

function validateCredentials(name, birthdate) {
    const validDates = validCredentials[name];
    return validDates && validDates.includes(birthdate);
}

function showGameScreen() {
    hideAllScreens();
    document.getElementById('gameScreen').classList.add('active');
    createBalloons();
}

function hideAllScreens() {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
}

function createBalloons() {
    const container = document.getElementById('balloonsContainer');
    const colors = ['red', 'blue', 'yellow', 'green', 'purple', 'pink', 'orange'];

    for (let i = 0; i < totalBalloons; i++) {
        const balloon = document.createElement('div');
        balloon.className = `balloon ${colors[i % colors.length]} float`;
        balloon.style.left = Math.random() * (window.innerWidth - 80) + 'px';
        balloon.style.top = Math.random() * (window.innerHeight - 200) + 100 + 'px';
        balloon.style.animationDelay = Math.random() * 2 + 's';

        balloon.addEventListener('click', popBalloon);
        container.appendChild(balloon);
    }
}

function popBalloon(e) {
    const balloon = e.target;
    balloon.classList.add('pop');
    balloon.removeEventListener('click', popBalloon);

    balloonsPopped++;
    updateBalloonCounter();

    setTimeout(() => {
        balloon.remove();
        if (balloonsPopped === totalBalloons) {
            setTimeout(startCelebration, 500);
        }
    }, 300);
}

function updateBalloonCounter() {
    document.getElementById('balloonCount').textContent = totalBalloons - balloonsPopped;
}

function startCelebration() {
    hideAllScreens();
    document.getElementById('celebrationScreen').classList.add('active');

    playBirthdaySong();
    showWishes();
    createConfetti();
    createFloatingBalloons();
}

function playBirthdaySong() {
    const audio = document.getElementById('birthdaySong');
    // Создаём простую мелодию с помощью Web Audio API если нет файла
    if (!audio.src || audio.src === '') {
        createBirthdayMelody();
    } else {
        // Включаем зацикливание аудио
        audio.loop = true;
        audio.volume = 0.7;
        audio.play().catch(e => {
            console.log('Не удалось воспроизвести аудио:', e);
            createBirthdayMelody();
        });
    }
}

function createBirthdayMelody() {
    // Расширенная мелодия "С днём рождения" с повторением
    const audioContext = new(window.AudioContext || window.webkitAudioContext)();

    // Полная мелодия "С днём рождения тебя" (ускорена в 1.5 раза)
    const fullMelody = [
        // "С днём рождения тебя"
        { freq: 261.63, duration: 0.33 }, // C - С
        { freq: 261.63, duration: 0.33 }, // C - днём
        { freq: 293.66, duration: 0.67 }, // D - рож-
        { freq: 261.63, duration: 0.67 }, // C - де-
        { freq: 349.23, duration: 0.67 }, // F - ни-
        { freq: 329.63, duration: 1.33 }, // E - я

        // Пауза
        { freq: 0, duration: 0.33 },

        // "С днём рождения тебя" (повтор)
        { freq: 261.63, duration: 0.33 }, // C
        { freq: 261.63, duration: 0.33 }, // C
        { freq: 293.66, duration: 0.67 }, // D
        { freq: 261.63, duration: 0.67 }, // C
        { freq: 392.00, duration: 0.67 }, // G
        { freq: 349.23, duration: 1.33 }, // F

        // Пауза
        { freq: 0, duration: 0.33 },

        // "С днём рождения дорогой"
        { freq: 261.63, duration: 0.33 }, // C
        { freq: 261.63, duration: 0.33 }, // C
        { freq: 523.25, duration: 0.67 }, // C (октава выше)
        { freq: 440.00, duration: 0.67 }, // A
        { freq: 349.23, duration: 0.67 }, // F
        { freq: 329.63, duration: 0.67 }, // E
        { freq: 293.66, duration: 1.33 }, // D

        // Пауза
        { freq: 0, duration: 0.33 },

        // Финал "С днём рождения тебя"
        { freq: 466.16, duration: 0.33 }, // Bb
        { freq: 466.16, duration: 0.33 }, // Bb
        { freq: 440.00, duration: 0.67 }, // A
        { freq: 349.23, duration: 0.67 }, // F
        { freq: 392.00, duration: 0.67 }, // G
        { freq: 349.23, duration: 2 } // F (длинная нота)
    ];

    function playMelodyLoop(startTime, repeatCount = 0) {
        let currentTime = startTime;

        fullMelody.forEach(note => {
            if (note.freq > 0) { // Играем ноту только если частота больше 0
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

                oscillator.frequency.setValueAtTime(note.freq, currentTime);
                oscillator.type = 'sine';

                gainNode.gain.setValueAtTime(0.2, currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + note.duration);

                oscillator.start(currentTime);
                oscillator.stop(currentTime + note.duration);
            }

            currentTime += note.duration;
        });

        // Повторяем мелодию каждые 18.5 секунд (3 раза) - с паузой между повторами
        if (repeatCount < 2) {
            setTimeout(() => {
                playMelodyLoop(audioContext.currentTime, repeatCount + 1);
            }, 18500);
        }
    }

    // Начинаем воспроизведение
    playMelodyLoop(audioContext.currentTime);
}

function showWishes() {
    const container = document.getElementById('wishesContainer');

    // Очищаем контейнер перед добавлением поздравлений
    container.innerHTML = '';

    // Добавляем блоки по одному с задержкой
    wishes.forEach((wish, index) => {
        setTimeout(() => {
            const wishElement = document.createElement('li');
            wishElement.className = 'wish';

            wishElement.innerHTML = `
                <div class="wish-content">
                    <div class="wish-text">${wish.text}</div>
                    <div class="wish-author">— ${wish.author}</div>
                </div>
                <div class="wish-avatar">
                    <img src="${wish.avatar}" alt="${wish.author}">
                </div>
            `;

            // Добавляем блок в конец контейнера
            container.appendChild(wishElement);

            // Показываем кнопку после последнего поздравления
            if (index === wishes.length - 1) {
                console.log(`Показано последнее поздравление (${index + 1} из ${wishes.length})`);
                setTimeout(() => {
                    showReadButton();
                }, 1000);
            }
        }, index * 1500);
    });
}

function showReadButton() {
    console.log('Показываем кнопку "Прочитал"');
    const readButton = document.getElementById('readButton');

    if (readButton) {
        readButton.style.display = 'block';
        readButton.style.visibility = 'visible';
        readButton.style.opacity = '1';

        // Добавляем обработчик только один раз
        if (!readButton.hasAttribute('data-listener-added')) {
            readButton.addEventListener('click', showPhoto);
            readButton.setAttribute('data-listener-added', 'true');
        }

        // Прокручиваем к кнопке через небольшую задержку
        setTimeout(() => {
            readButton.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            });
            console.log('Прокрутили к кнопке "Прочитал"');
        }, 500);

        console.log('Кнопка "Прочитал" должна быть видна');
    } else {
        console.error('Кнопка "Прочитал" не найдена!');
    }
}

function showPhoto() {
    // Сразу показываем обратный отсчёт с фото
    startCountdownWithPhoto();
}

function startCountdownWithPhoto() {
    const countdownScreen = document.getElementById('countdownScreen');
    const countdownNumber = document.getElementById('countdownNumber');

    // Показываем экран обратного отсчёта
    countdownScreen.classList.add('active');

    // Добавляем фото в экран обратного отсчёта
    const photoContainer = countdownScreen.querySelector('.countdown-photo-container');
    if (!photoContainer) {
        const newPhotoContainer = document.createElement('div');
        newPhotoContainer.className = 'countdown-photo-container';

        const photo = document.createElement('img');
        photo.className = 'countdown-photo';
        photo.src = 'birthday-photo.jpg';
        photo.alt = 'Фото именинника';

        photo.onerror = function() {
            const placeholder = document.createElement('div');
            placeholder.className = 'countdown-photo';
            placeholder.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
            placeholder.style.display = 'flex';
            placeholder.style.alignItems = 'center';
            placeholder.style.justifyContent = 'center';
            placeholder.style.color = 'white';
            placeholder.style.fontSize = '32px';
            placeholder.style.fontWeight = 'bold';
            placeholder.innerHTML = '🎉<br>С Днём<br>Рождения!';
            newPhotoContainer.appendChild(placeholder);
        };

        newPhotoContainer.appendChild(photo);
        countdownScreen.insertBefore(newPhotoContainer, countdownScreen.firstChild);
    }

    let count = 5;
    countdownNumber.textContent = count;

    const countdownInterval = setInterval(() => {
        count--;

        if (count > 0) {
            countdownNumber.style.animation = 'none';
            setTimeout(() => {
                countdownNumber.textContent = count;
                countdownNumber.style.animation = 'countdownPulse 1s ease-in-out';
            }, 10);
        } else {
            clearInterval(countdownInterval);
            window.location.href = 'https://niva-motor.yougile.com/';
        }
    }, 1000);
}

function createConfetti() {
    const container = document.getElementById('confettiContainer');

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';

            container.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, Math.random() * 1000);
    }

    // Продолжаем создавать конфетти
    setTimeout(createConfetti, 3000);
}

function createFloatingBalloons() {
    const container = document.getElementById('floatingBalloons');
    const colors = ['red', 'blue', 'yellow', 'green', 'purple'];

    function addFloatingBalloon() {
        const balloon = document.createElement('div');
        balloon.className = `floating-balloon ${colors[Math.floor(Math.random() * colors.length)]}`;
        balloon.style.left = Math.random() * (window.innerWidth - 40) + 'px';
        balloon.style.animationDuration = (Math.random() * 3 + 5) + 's';

        balloon.addEventListener('click', function() {
            balloon.classList.add('pop');
            setTimeout(() => {
                balloon.remove();
                // Создаём новый шарик в случайном месте
                setTimeout(addFloatingBalloon, Math.random() * 2000);
            }, 300);
        });

        container.appendChild(balloon);

        setTimeout(() => {
            if (balloon.parentNode) {
                balloon.remove();
            }
        }, 8000);
    }

    // Создаём шарики с интервалом
    setInterval(addFloatingBalloon, 1500);
}

// Обработка изменения размера окна
window.addEventListener('resize', function() {
    // Пересоздаём шарики при изменении размера окна
    if (document.getElementById('gameScreen').classList.contains('active')) {
        const balloons = document.querySelectorAll('.balloon');
        balloons.forEach(balloon => {
            balloon.style.left = Math.random() * (window.innerWidth - 80) + 'px';
            balloon.style.top = Math.random() * (window.innerHeight - 200) + 100 + 'px';
        });
    }
});

// Предотвращение контекстного меню на шариках
document.addEventListener('contextmenu', function(e) {
    if (e.target.classList.contains('balloon') || e.target.classList.contains('floating-balloon')) {
        e.preventDefault();
    }
});