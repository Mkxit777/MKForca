const words = [
    'maça', 'banana', 'coco', 'manga', 'cereja',
    'jaca', 'kiwi', 'uva', 'pera', 'amora'
];

const gameContainer = document.getElementById('game-container');
const audioAcerto = new Audio('acerto.mp3');
const audioErro = new Audio('erro.mp3');

startGame();

function startGame() {
    let word = '';
    let firstLetter = '';
    let guessedWord = '';
    let attempts = 0;

    renderGame();

    function renderGame() {
        if (!word) {
            // Seleciona uma nova palavra se não houver uma palavra atual
            word = words[Math.floor(Math.random() * words.length)];
            firstLetter = word.charAt(0);
            guessedWord = '_'.repeat(word.length);
        }

        gameContainer.innerHTML = `
            <h2>Palavra: ${word}</h2>
            <p>Inicial da palavra: ${firstLetter}</p>
            <input type="text" id="guess-input">
            <button id="submit-guess">Submeter</button>
            <p>Tentativas restantes: ${3 - attempts}</p>
        `;

        const input = document.getElementById('guess-input');
        const submitGuess = document.getElementById('submit-guess');

        submitGuess.addEventListener('click', submitGuessHandler);

        function submitGuessHandler() {
            const guess = input.value.toLowerCase().trim();

            if (guess === word) {
                gameContainer.innerHTML += `
                    <p>Parabéns! Você acertou!</p>
                `;
                audioAcerto.play();
                // Seleciona uma nova palavra após o acerto
                word = '';
                attempts = 0;
            } else {
                attempts++;
                if (attempts >= 3) {
                    gameContainer.innerHTML += `
                        <p>Que pena! Você esgotou suas tentativas. A palavra correta era: ${word}</p>
                    `;
                    audioErro.play();
                    // Seleciona uma nova palavra após esgotar as tentativas
                    word = '';
                    attempts = 0;
                } else {
                    gameContainer.innerHTML += `
                        <p>Palavra incorreta. Tente novamente.</p>
                    `;
                    audioErro.play();
                }
            }

            renderGame();
        }
    }
}