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
    const squares = new Array(9);

    const getBoardSize = function() {
        return squares.length;
    }

    const selectSquare = function(squareOrder, marker) {
        squares[squareOrder] = marker;
    }

    const getMarkerOnSquare = function(squareOrder) {
        return squares[squareOrder] || ".";
    }

    const checkGameOver = function() {
        const [one, two, three, four, five, six, seven, eight, nine] = squares;
        return (isTheSame(one, two, three) 
            || isTheSame(four, five, six)
            || isTheSame(seven, eight, nine)
            || isTheSame(one, four, seven)
            || isTheSame(two, five, eight)
            || isTheSame(three, six, nine)
            || isTheSame(one, five, nine)
            || isTheSame(three, five, seven));
    }

    function isTheSame(...numbers) {
        const firstNumber = numbers[0];
        return numbers.every(number => (number === firstNumber && number !== undefined) );
    }

    return { selectSquare, getMarkerOnSquare, getBoardSize, checkGameOver };
}

const createGame = (function() {
    const player1 = createPlayer("player1", "O");
    const player2 = createPlayer("player2", "X");
    const board = createBoard();

    let gameOver = false;
    let player1Turn = true;

    const playGame = function() {
        let currentPlayer;
        while(!gameOver) {
            const choice = (prompt ("Choose the square number")) - 1;
            if (player1Turn) {
                currentPlayer = player1;
            }
            else {
                currentPlayer = player2;
            }
            player1Turn = !player1Turn;

            board.selectSquare(choice, currentPlayer.getMarker());

            const printBoard = (function() {
                let printedBoard = "";
                for (let i=0; i<board.getBoardSize(); i++) {
                    printedBoard += board.getMarkerOnSquare(i) + " ";
        
                    if ((i + 1) % 3 === 0)
                        printedBoard += "\n";
                }
                return printedBoard;
            })();

            console.log(printBoard);
            gameOver = board.checkGameOver();
        }
        console.log("Won");
    }

    return playGame;
})();



createGame();

