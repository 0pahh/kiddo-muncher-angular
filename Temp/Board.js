"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
class Board {
    constructor() {
        this.nbRows = 6;
        this.nbCols = 6;
        this.generateBlankConsole = () => {
            const consoleData = [];
            for (let i = 0; i < this.nbRows; i++) {
                consoleData[i] = [];
                for (let j = 0; j < this.nbCols; j++) {
                    consoleData[i][j] = null;
                }
            }
            return consoleData;
        };
        this.console = this.generateBlankConsole();
    }
}
exports.Board = Board;
