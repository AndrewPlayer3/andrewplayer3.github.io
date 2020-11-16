// Helpful Stuff:
//  https://dlbeer.co.nz/articles/sudoku.html
//  https://www.youtube.com/watch?v=G_UYXzGuqvM
//  https://sudoku.game/

let board = [
    [4, 2, 3, 0, 0, 0, 0, 0, 9],
    [0, 0, 5, 4, 0, 0, 0, 0, 0],
    [8, 0, 0, 0, 0, 9, 0, 4, 0],
    [0, 0, 7, 1, 6, 5, 0, 0, 0],
    [9, 0, 0, 7, 3, 0, 5, 1, 0],
    [0, 1, 0, 0, 0, 2, 6, 7, 0],
    [0, 5, 8, 0, 9, 1, 4, 2, 7],
    [0, 4, 2, 0, 0, 8, 0, 0, 0],
    [0, 7, 9, 0, 0, 3, 0, 0, 1]
];

function generator() {

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