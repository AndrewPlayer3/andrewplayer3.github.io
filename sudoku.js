// Helpful Stuff:
//  https://dlbeer.co.nz/articles/sudoku.html
//  https://www.youtube.com/watch?v=G_UYXzGuqvM
//  https://sudoku.game/

function possible(board, row, col, n) {
    for(i = 0; i < 9; i++) {
        if(board[row][i] === n) {
            return false;
        }
        if(board[i][col] === n) {
            return false;
        }
    }
    y0 = (Math.floor(row/3))*3;
    x0 = (Math.floor(col/3))*3;
    for(i = 0; i < 3; i++) {
        for(j = 0; j < 3; j++) {
            if(board[i+y0][j+x0] === n) {
                return false;
            }
        }
    }
    return true;
} 

function solver(board) {
    for(y = 0; y < 9; y++) {
        for(x = 0; x < 9; x++) {
            if(board[y][x] === 0) {
                for(n = 1; n < 10; n++) {
                    if(possible(board, y, x, n)) {
                        board[y][x] = n;
                        solver(board);
                        board[y][x] = 0;
                    }
                }
                return true;
            }
        }
    }
    console.log(board);
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function generateCompleteBoard() {
    let board = [];
    let starter = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let row = shuffle(starter)
    board.push(row);
    for(i = 1; i < 9; i++) {
        generator:
        while(true) {
            let new_row = shuffle(starter);
            for(j = 0; j < i; j++) {
                for(k = 0; k < 9; k++) {
                    if(new_row[k] == board[j][k]) {
                        continue generator;
                    }
                }
            }
            board.push(new_row);
            break;
        }
    }
    return board;
}

function pruneBoard(arr) {
    let cells = []
    for(i = 0; i < 81; i++) cells.push(i);
    cells = shuffle(cells);
    for(i = 0; i < 81; i++) {
        let row = floor(cells[i]/9);
        let col = cells[i] % 9;
        let temp = arr[row][col];
        arr[row][col] = 0;
        if(!hasUniqueSolution(arr)) {
            arr[row][col] = temp;
        }
    }
    return arr
}

grid = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];