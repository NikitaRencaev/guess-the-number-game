document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const checkBtn = document.getElementById('checkBtn');
    const recordHTML = document.getElementById('record');
    const hint = document.getElementById('hint')
    const cardGame = document.getElementById('cardGame');
    const cardWin = document.getElementById('cardWin');
    const restartBtn = document.getElementById('restartBtn');

    let record = JSON.parse(localStorage.getItem('record'));
    record = record ? Number(record) : null;

    recordHTML.textContent = record !== null ? record : '—'; // Показываем рекорд
    let number = Math.floor(Math.random() * 100) + 1; // Загадываем случайно число от 1 до 100

    let attempts = 0; // Кол-во попыток

    function checkNumber() {
        const numberUser = parseInt(input.value);
        attempts += 1;
        input.value = '';

        if (numberUser === number)
            winGame();
        else if (numberUser > number)
            hint.textContent = 'Бери ниже ⬇';
        else if (numberUser < number)
            hint.textContent = 'Бери выше ⬆';
        else 
            return;
    };

    function winGame() {
        hint.textContent = '';
        cardGame.classList.remove('visible');
        cardWin.classList.add('visible');
        const attemptsHTML = document.querySelectorAll('.attempts');
        attemptsHTML.forEach(item => item.textContent = attempts);
        const newRecord = document.getElementById('newRecord');

        const winRecord = document.getElementById('winRecord');
        const winDefolt = document.getElementById('winDefolt');

        if (attempts < record || record == null) {
            localStorage.setItem('record', JSON.stringify(attempts));
            newRecord.textContent = record = JSON.parse(localStorage.getItem('record'));
            winRecord.classList.add('visible');
            winDefolt.classList.remove('visible');
        } else {
            winRecord.classList.remove('visible');
            winDefolt.classList.add('visible');
        }

        newRecord.textContent = record;
        attempts = 0;
    }

    function restartGame() {
        record = JSON.parse(localStorage.getItem('record'));
        recordHTML.textContent = record; 
        number = Math.floor(Math.random() * 100) + 1; 

        cardGame.classList.add('visible');
        cardWin.classList.remove('visible');
    }

    restartBtn.addEventListener('click', restartGame)

    input.addEventListener('keypress', (e) => {
        if (e.key == 'Enter') {
            checkBtn.click();
        }
    });

    checkBtn.addEventListener('click', checkNumber);

});


