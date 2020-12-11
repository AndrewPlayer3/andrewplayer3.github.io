// Helpful Stuff:
//  https://dlbeer.co.nz/articles/sudoku.html
//  https://www.youtube.com/watch?v=G_UYXzGuqvM
//  https://sudoku.game/

let empty_grid = [
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

let solved = [
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

function possible(board, y, x, n) {
    for (var i = 0; i < 9; i++) {
        if (board[y][i] === n) {
            return false;
        }
        if (board[i][x] === n) {
            return false;
        }
    }
    y0 = Math.floor(y / 3) * 3;
    x0 = Math.floor(x / 3) * 3;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[y0+i][x0+j] === n) {
                return false;
            }
        }
    }
    return true;
}

function solver(board, count) {
    for (var y = 0; y < 9; y++) {
        for (var x = 0; x < 9; x++) {
            if (board[y][x] === 0) {
                for (var n = 1; n < 10; n++) {
                    if (possible(board, y, x, n)) {
                        board[y][x] = n;
                        count = solver(board, count);
                        board[y][x] = 0; 
                    } 
                }
              return count
            }
        }
    }
    count = count + 1;
    return count
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

function checkBoard(board) {
    for(var row = 0; row < 9; row++) {
        for(var col = 0; col < 9; col++) {
            if(board[row][col] === 0) {
                return false;
            }
        }
    }
    return true;
}

numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function fillBoard(board) {
    for(var i = 0; i < 81; i++) {
        var row = Math.floor(i / 9);
        var col = i % 9;
        if(board[row][col] === 0) {
            numberList = shuffle(numberList);
            for(var number of numberList) {
                var not_in_row = true;
                for(var c of board[row]) {
                    if(c === number) {
                        not_in_row = false;
                    }
                }
                var not_in_col = true;
                for(var r of board) {
                    if(r[col] === number) {
                        not_in_col = false;
                    }
                }
                if(not_in_row) {
                    if(not_in_col) {
                        var row_bounds = Math.floor(row/3)*3;
                        var rows = board.slice(row_bounds, row_bounds+3);
                        var col_bounds = Math.floor(col/3)*3;
                        var square = []
                        for(var i = row_bounds; i < row_bounds+3; i++) {
                            for(var j = col_bounds; j < col_bounds+3; j++) {
                                square.push(board[i][j]);
                            }
                        }
                        var not_in_box = true;
                        for(var v of square) {
                            if(v === number) {
                                not_in_box = false;
                            }
                        }
                        if(not_in_box) {
                            board[row][col] = number;
                            solved[row][col] = number;
                            if(checkBoard(board)) {
                                return true;
                            } else if(fillBoard(board)) {
                                return true;
                            }
                        }
                    }
                }
            }
            break;
        }
    }
    board[row][col] = 0;
    solved[row][col] = 0;
}

function pruneBoard(board) {
    positions = [];
    for(var i = 0; i < 81; i++) {
        row = Math.floor(i / 9);
        col = i % 9;
        if(board[row][col] != 0) {
            positions.push(i);
        }
    }
    positions = shuffle(positions);
    for(var position of positions.slice(0, 60)) {
        y = Math.floor(position / 9);
        x = position % 9;
        temp = board[y][x];
        board[y][x] = 0;
        count = solver(board, 0);
        if(count != 1) {
            board[y][x] = temp;
        }
        count = 0;
    }
}

function checkIfSolved(board) {
    if(checkBoard(board)) {
        for(var i = 0; i < 81; i++) {
            row = Math.floor(i / 9);
            col = i % 9;
            if(empty_grid[row][col] != solved[row][col]) {
                return false;
            }
            board[row][col] = temp;
        }
        return true;
    }
    return false;
}