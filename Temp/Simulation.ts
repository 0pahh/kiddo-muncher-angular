import { randomPosition } from '../utils/random';
import { Board } from './Board';
import { Decor, DecorFactory } from './Decor';
import { Entity, Kiddo, KiddoFactory, Ogre } from './Entity';

export class Simulation {
    start: boolean = false;
    nbTurns: number = 1;
    board: Board = new Board();
    data: (Entity | Decor)[] = [];
    constructor() {
        this.generateData();
    }

    generateData = (): void => {
        this.generateOgre(); // Generate Ogre, 1
        this.generateKiddos(); // Generate Kiddos, 15% to 25% of the board wo ogre
        this.generateDecors(); // Generate Decors, 10% to 40% of the board wo ogre

        this.launchSimulation(); // Launch the simulation
    };

    launchSimulation = (): void => {
        this.start = true;
        for (let i = 0; i < this.nbTurns; i++) {
            this.data.forEach((entity) => {
                if (entity instanceof Ogre) {
                    let aroundEntities = this.getEntitiesAround(entity); // Get entities around the ogre

                    if (aroundEntities.up instanceof Kiddo) {
                        aroundEntities.up = entity.eat(aroundEntities.up);
                    } else if (aroundEntities.down instanceof Kiddo) {
                        aroundEntities.down = entity.eat(aroundEntities.down);
                    } else if (aroundEntities.left instanceof Kiddo) {
                        aroundEntities.left = entity.eat(aroundEntities.left);
                    } else if (aroundEntities.right instanceof Kiddo) {
                        aroundEntities.right = entity.eat(aroundEntities.right);
                    }
                }
            });
            console.log(this.board.console);
            console.log('générer une nouvelle matrice', this.data);
            this.board.console = this.board.generateBlankConsole();
            for (let data of this.data) {
                this.board.console[data.position.x][data.position.y] = data.symbol;
            }
            console.log(this.board.console);
        }
    };

    generateOgre = (): void => {
        let pos = randomPosition(this.board);
        if (pos.x === null || pos.y === null) throw new Error('No more space on the board');

        const ogre = new Ogre().createInstance({ x: pos.x, y: pos.y });
        this.data.push(ogre);

        this.board.console[pos.x][pos.y] = ogre.symbol;
    };

    generateDecors = (): void => {
        const maxNumber = Math.floor((this.board.nbRows * this.board.nbCols - 1) * 0.4);
        const minNumber = Math.ceil((this.board.nbRows * this.board.nbCols - 1) * 0.1);

        const nbDecors = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

        for (let i = 0; i < nbDecors; i++) {
            let pos = randomPosition(this.board);

            if (pos.x === null || pos.y === null) throw new Error('No more space on the board');

            const decor = new DecorFactory().createInstance({ x: pos.x, y: pos.y });
            this.data.push(decor);

            this.board.console[pos.x][pos.y] = decor.symbol;
        }
    };
    generateKiddos = (): void => {
        let pos = randomPosition(this.board);
        if (pos.x === null || pos.y === null) throw new Error('No more space on the board');

        const maxNumber = Math.floor((this.board.nbRows * this.board.nbCols - 1) * 0.25);
        const minNumber = Math.ceil((this.board.nbRows * this.board.nbCols - 1) * 0.15);

        const nbKiddos = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

        for (let i = 0; i < nbKiddos; i++) {
            let pos = randomPosition(this.board);

            if (pos.x === null || pos.y === null) throw new Error('No more space on the board');

            const kiddo = new KiddoFactory().createInstance({ x: pos.x, y: pos.y });
            this.data.push(kiddo);

            this.board.console[pos.x][pos.y] = kiddo.displayType;
        }
    };

    getEntitiesAround = (entity: Entity) => {
        const { x, y } = entity.position;
        const entities = ['up', 'down', 'left', 'right'].reduce((result, direction) => {
            const [dx, dy] =
                direction === 'up' ? [-1, 0] : direction === 'down' ? [1, 0] : direction === 'left' ? [0, -1] : [0, 1];
            result[direction] = this.data.find((e) => e.position.x === x + dx && e.position.y === y + dy) || null;
            return result;
        }, {} as Record<string, Entity | Decor | null>);
        return entities;
    };
}
