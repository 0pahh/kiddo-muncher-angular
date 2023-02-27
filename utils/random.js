"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomPosition = void 0;
const randomPosition = (board) => {
    let foundNull = false;
    for (const row of board.console) {
        if (row.includes(null)) {
            foundNull = true;
            break;
        }
    }
    if (!foundNull)
        return { x: null, y: null };
    const x = Math.floor(Math.random() * board.nbRows);
    const y = Math.floor(Math.random() * board.nbCols);
    while (board.console[x][y] !== null) {
        return (0, exports.randomPosition)(board);
    }
    return { x, y };
};
exports.randomPosition = randomPosition;
