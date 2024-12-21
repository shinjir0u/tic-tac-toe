class Player {
    #name;
    #marker;
    
    constructor (name, marker) {
        this.name = name;
        this.marker = marker;
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }

    get marker() {
        return this.#marker;
    }

    set marker(marker) {
        this.#marker = marker;
    }
}

class Board {
    #squares = new Array(9);

    getBoardSize() {
        return this.#squares.length;
    }

    selectSquare(squareOrder, marker) {
        if (this.#squares[squareOrder] === undefined) {
            this.#squares[squareOrder] = marker;
            return true;
        }
        return false;
    }

    getMarkerOnSquare(squareOrder) {
        return this.#squares[squareOrder];
    }

    checkGameOver() {
        let [one, two, three, four, five, six, seven, eight, nine] =this.#squares;
        return (this.#isTheSame(one, two, three) 
            || this.#isTheSame(four, five, six)
            || this.#isTheSame(seven, eight, nine)
            || this.#isTheSame(one, four, seven)
            || this.#isTheSame(two, five, eight)
            || this.#isTheSame(three, six, nine)
            || this.#isTheSame(one, five, nine)
            || this.#isTheSame(three, five, seven)
            || !this.#squares.includes(undefined));
    }

    #isTheSame(...numbers) {
        const firstNumber = numbers[0];
        return numbers.every(number => (number === firstNumber && number !== undefined));
    }

    clear() {
       this.#squares = new Array(9);
    }
}

const createGame = (function() {
    const squares = document.querySelectorAll(".square");

    const player1 = new Player("player1", "O");
    const player2 = new Player("player2", "X");
    const board = new Board();

    let currentPlayerChoice;
    let gameOver = false;
    let player1Turn = true;

    const playGame = function() {
        let currentPlayer;
        if (!gameOver) {
            if (player1Turn) {
                currentPlayer = player1;
            }
            else {
                currentPlayer = player2;
            }

            if (board.selectSquare(currentPlayerChoice, currentPlayer.marker))
                player1Turn = !player1Turn;

            displayBoard();
            if (board.checkGameOver()) {
                gameOver = true;
                setTimeout(() => {
                    alert(`${currentPlayer.name} wins`);
                    if (prompt("Do u want to restart? y or n").toLowerCase() === 'y')
                        resetGame();
                }, 800);
            }
        }
        startGame();
    }

    function startGame() {
       squares.forEach(square => {
            square.addEventListener("click", clickSquareEvent);
        });
    }

    function clickSquareEvent(event) {
        const square = event.target;
        currentPlayerChoice = +square.lastElementChild.textContent;
        playGame();
    }

    function displayBoard() {
        for (let i=0; i<squares.length; i++) {
           squares[i].firstElementChild.textContent = board.getMarkerOnSquare(i);
        }
    }

    function resetGame() {
        board.clear();
        displayBoard();
        startGame();
        gameOver = false;
        player1Turn = true;
    }

    return startGame;
})();

createGame();

