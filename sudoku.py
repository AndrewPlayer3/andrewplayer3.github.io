import numpy as np
from random import shuffle

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

# Solver and Possible from Computerphile Tutorial

def possible(grid, y, x, n):
    for i in range(0,9):
        if grid[y][i] == n:
            return False
        if grid[i][x] == n:
            return False
    x0 = (x//3)*3
    y0 = (y//3)*3
    for i in range(0,3):
        for j in range(0,3):
            if grid[y0+i][x0+j] == n:
                return False
    return True

count = 0
board = []

def solver(grid):
    global count
    global board
    for y in range(9):
        for x in range(9):
            if grid[y][x] == 0:
                for n in range(1,10):
                    if possible(grid, y, x, n):
                        grid[y][x] = n
                        solver(grid)
                        grid[y][x] = 0
                return
    count += 1

def generateBoard():
    global count    
    length = 81    
    board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    positions = np.arange(81)
    shuffle(positions)    
    for position in positions[0:-40]:
        for i in range(1,10):
            row = position // 9
            col = position %  9
            if possible(board, row, col, i):
                board[row][col] = i
    solver(board)   
    if count != 1:
        count = 0
        return generateBoard()
    else: 
        count = 0
        return board

def pruneBoard(board):
    global count
    positions = []
    for i in range(81):
        row = i // 9
        col = i %  9
        if board[row][col] != 0:
            positions.append((row, col));
    shuffle(positions)
    for position in positions[0:-20]:
        temp = board[position[0]][position[1]]
        board[position[0]][position[1]] = 0
        solver(board)
        if count != 1:
            board[position[0]][position[1]] = temp
        count = 0

    return board

def countNonZero(board):
    nonzero = 0
    for row in board:
        for col in row:
            if col != 0:
                nonzero += 1
    return nonzero

board = generateBoard()
board = pruneBoard(board)

print(countNonZero(board))
print(np.matrix(board))