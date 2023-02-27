import { Board } from '../Temp/Board';

export const randomPosition = (board: Board): { x: number | null; y: number | null } => {
    let foundNull = false;
    for (const row of board.console) {
        if (row.includes(null)) {
            foundNull = true;
            break;
        }
    }
    if (!foundNull) return { x: null, y: null };

    const x = Math.floor(Math.random() * board.nbRows);
    const y = Math.floor(Math.random() * board.nbCols);

    while (board.console[x][y] !== null) {
        return randomPosition(board);
    }
    return { x, y };
};
