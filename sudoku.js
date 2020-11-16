// Helpful Stuff:
//  https://dlbeer.co.nz/articles/sudoku.html
//  https://www.youtube.com/watch?v=G_UYXzGuqvM
//  https://sudoku.game/

/*
let board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];
*/

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

function pruneBoard() {
    
}

//let board = generateCompleteBoard();

let board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

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

function possible(row, col, n) {
    for(i = 0; i < 9; i++) {
        if(board[row][i] == n) {
            return false;
        }
    }
    for(i = 0; i < 9; i++) {
        if(board[i][col] == n) {
            return false;
        }
    }
    y0 = (row/3)*3;
    x0 = (col/3)*3;
    console.log(y0, ", ", x0);
    for(i = 0; i < 3; i++) {
        for(j = 0; j < 3; j++) {
            if(board[y0+i][x0+j] == n) {
                return false;
            }
        }
    }
    return true;
} 

function solver() {
    for(i = 0; i < 9; i++) {
        console.log(board);
        for(j = 0; j < 9; j++) {
            if(board[i][j] == 0) {
                for(k = 1; k < 10; k++) {
                    console.log(i, ", ", j, ", ", k);
                    if(possible(i, j, k)) {
                        board[i][j] = k;
                        solver();
                        board[i][j] = 0;
                    }
                }
                return true;
            }
        }
    }
    console.log(board);
}

function difficulty() {

}