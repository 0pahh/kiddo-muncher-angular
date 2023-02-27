export class Board {
    public nbRows: number = 6;
    public nbCols: number = 6;

    public console!: (string | null)[][];

    constructor() {
        this.console = this.generateBlankConsole();
    }

    public generateBlankConsole = (): (string | null)[][] => {
        const consoleData: (string | null)[][] = [];

        for (let i = 0; i < this.nbRows; i++) {
            consoleData[i] = [];
            for (let j = 0; j < this.nbCols; j++) {
                consoleData[i][j] = null;
            }
        }
        return consoleData;
    };
}
