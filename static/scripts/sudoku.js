// Helpful Stuff:
//  https://dlbeer.co.nz/articles/sudoku.html
//  https://www.youtube.com/watch?v=G_UYXzGuqvM
//  https://sudoku.game/

count = 0

function possible(board, y, x, n) {
    for(i = 0; i < 9; i++) {
        if(board[y][i] === n) {
            return false;
        }
        if(board[i][x] === n) {
            return false;
        }
    }
    y0 = Math.floor(y/3)*3;
    x0 = Math.floor(x/3)*3;
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
    console.log(count++)
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
                return;
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