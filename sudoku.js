// Helpful Stuff:
//  https://dlbeer.co.nz/articles/sudoku.html
//  https://www.youtube.com/watch?v=G_UYXzGuqvM
//  https://sudoku.game/

function possible(board, row, col, n) {
    for(i = 0; i < 9; i++) {
        if(board[col][i] == n) {
            return false;
        }
    }
    for(i = 0; i < 9; i++) {
        if(board[i][row] == n) {
            return false;
        }
    }
    y0 = (row/3)*3;
    x0 = (col/3)*3;
    for(i = 0; i < 3; i++) {
        for(j = 0; j < 3; j++) {
            if(board[col+y0][row+x0] == n) {
                return false;
            }
        }
    }
    return true;
} 

function solve(board, row, col, solutions) {
    if(row == 9) {
        row = 0;
        if(++cols == 9) return ++solutions;
    }
    if(board[row][col] != 0) {
        return solve(board, row+1, col, solutions);
    }
    for(k = 1; k <= 9 && solutions < 2; ++k) {
        if(possible(board, row, col, k)) {
            board[row][col] = k;
            solutions = solve(board, row+1, col, solutions)
            board[row][col] = 0;
        }
    }
}

function solver(board) {
    for(i = 0; i < 9; i++) {
        for(j = 0; j < 9; j++) {
            if(board[i][j] == 0) {
                for(k = 1; k < 10; k++) {
                    if(possible(board, i, j, k)) {
                        board[i][j] = k;
                        solver();
                        board[i][j] = 0;
                    }
                }
                return true;
            }
        }
    }
    print(board)
}

function hasUniqueSolution(arr) {

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