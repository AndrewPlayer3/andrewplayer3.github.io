import numpy as np

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

def possible(grid, y, x, n):
    for i in range(0,9):
        if grid[y][i] == n:
            return False
    for i in range(0,9):
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

def solver(grid):
    for y in range(9):
        for x in range(9):
            if grid[y][x] == 0:
                for n in range(1,10):
                    if possible(grid, y, x, n):
                        grid[y][x] = n
                        solver(grid)
                        grid[y][x] = 0
                return 1

def solve(board, row, col, solutions: int) -> int:
    if row == 9:
        row = 0
        cols = cols + 1
        if(cols == 9):
             return solutions + 1
    if(board[row][col] != 0):
        return solve(board, row+1, col, solutions)
    for k in range(1,10):
        if solutions > 1:
            break
        if possible(board, row, col, k):
            board[row][col] = k
            solutions = solve(board, row+1, col, solutions)
            board[row][col] = 0
        
    
