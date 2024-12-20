const createPlayer = function(name, marker) {
    
    const getPlayerName = function() {
        return name;
    }

    const getMarker = function() {
        return marker;
    }

    return { getPlayerName, getMarker };
}

const createBoard = function() {
    let squares = new Array(9);

    const getBoardSize = function() {
        return squares.length;
    }

    const selectSquare = function(squareOrder, marker) {
        if (squares[squareOrder] === undefined) {
            squares[squareOrder] = marker;
            return true;
        }
        return false;
    }

    const getMarkerOnSquare = function(squareOrder) {
        return squares[squareOrder];
    }

    const checkGameOver = function() {
        let [one, two, three, four, five, six, seven, eight, nine] = squares;
        return (isTheSame(one, two, three) 
            || isTheSame(four, five, six)
            || isTheSame(seven, eight, nine)
            || isTheSame(one, four, seven)
            || isTheSame(two, five, eight)
            || isTheSame(three, six, nine)
            || isTheSame(one, five, nine)
            || isTheSame(three, five, seven)
            || !squares.includes(undefined));
    }

    function isTheSame(...numbers) {
        const firstNumber = numbers[0];
        return numbers.every(number => (number === firstNumber && number !== undefined));
    }

    function clear() {
        squares = new Array(9);
    }

    return { selectSquare, getMarkerOnSquare, getBoardSize, checkGameOver, clear };
}

const createGame = (function() {
    const squares = document.querySelectorAll(".square");

    const player1 = createPlayer("player1", "O");
    const player2 = createPlayer("player2", "X");
    const board = createBoard();

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

            if (board.selectSquare(currentPlayerChoice, currentPlayer.getMarker()))
                player1Turn = !player1Turn;

            displayBoard();
            if (board.checkGameOver()) {
                gameOver = true;
                setTimeout(() => {
                    alert(`${currentPlayer.getPlayerName()} wins`);
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

