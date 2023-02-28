'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Simulation = void 0;
const random_1 = require('../utils/random');
const Board_1 = require('./Board');
const Decor_1 = require('./Decor');
const Entity_1 = require('./Entity');
class Simulation {
    constructor() {
        this.start = false;
        this.nbTurns = 10;
        this.board = new Board_1.Board();
        this.data = [];
        this.generateData = () => {
            this.generateOgre(); // Generate Ogre, 1
            this.generateKiddos(); // Generate Kiddos, 15% to 25% of the board wo ogre
            this.generateDecors(); // Generate Decors, 10% to 40% of the board wo ogre
            this.launchSimulation(); // Launch the simulation
        };
        this.launchSimulation = () => {
            this.start = true;
            for (let i = 0; i < this.nbTurns; i++) {
                this.data.forEach((entity) => {
                    if (entity instanceof Entity_1.Ogre) {
                        let hasMoved = false;
                        let aroundEntities = this.getEntitiesAround(entity); // Get entities around the ogre
                        const directions = ['up', 'down', 'left', 'right'];
                        for (const direction of directions) {
                            const kiddo = aroundEntities[direction];
                            if (kiddo instanceof Entity_1.Kiddo) {
                                const deadKiddo = entity.eat(kiddo);
                                const index = this.data.indexOf(kiddo);
                                this.data.splice(index, 1, deadKiddo);
                                entity.position = deadKiddo.position;
                                hasMoved = true;
                                break;
                            }
                        }

                        if (!hasMoved) {
                            const direction = Math.floor(Math.random() * 4);
                            switch (direction) {
                                case 0:
                                    // déplacer en haut
                                    if (aroundEntities.up === null && entity.position.x > 0) {
                                        entity.move({ x: entity.position.x - 1, y: entity.position.y });
                                    }
                                case 1:
                                    if (aroundEntities.down === null && entity.position.x < this.board.nbRows - 1) {
                                        entity.move({ x: entity.position.x + 1, y: entity.position.y });
                                    }
                                case 2:
                                    if (aroundEntities.left === null && entity.position.y > 0) {
                                        entity.move({ x: entity.position.x, y: entity.position.y - 1 });
                                    }
                                case 3:
                                    if (aroundEntities.right === null && entity.position.y < this.board.nbCols - 1) {
                                        entity.move({ x: entity.position.x, y: entity.position.y + 1 });
                                    }
                            }
                        }
                    }
                });
                this.board.console = this.board.generateBlankConsole();
                for (let data of this.data) {
                    if (data instanceof Entity_1.DeadKiddo) {
                        let existingEntity = this.data.find(
                            (entity) => entity.position.x === data.position.x && entity.position.y === data.position.y,
                        );
                        if (existingEntity) continue;
                        else this.board.console[data.position.x][data.position.y] = data.symbol;
                    }
                    this.board.console[data.position.x][data.position.y] = data.symbol;
                }
                console.log(this.board.console);
            }
        };
        this.generateOgre = () => {
            let pos = (0, random_1.randomPosition)(this.board);
            if (pos.x === null || pos.y === null) throw new Error('No more space on the board');
            const ogre = new Entity_1.Ogre().createInstance({ x: pos.x, y: pos.y });
            this.data.push(ogre);
            this.board.console[pos.x][pos.y] = ogre.symbol;
        };
        this.generateDecors = () => {
            const maxNumber = Math.floor((this.board.nbRows * this.board.nbCols - 1) * 0.4);
            const minNumber = Math.ceil((this.board.nbRows * this.board.nbCols - 1) * 0.1);
            const nbDecors = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
            for (let i = 0; i < nbDecors; i++) {
                let pos = (0, random_1.randomPosition)(this.board);
                if (pos.x === null || pos.y === null) throw new Error('No more space on the board');
                const decor = new Decor_1.DecorFactory().createInstance({ x: pos.x, y: pos.y });
                this.data.push(decor);
                this.board.console[pos.x][pos.y] = decor.symbol;
            }
        };
        this.generateKiddos = () => {
            let pos = (0, random_1.randomPosition)(this.board);
            if (pos.x === null || pos.y === null) throw new Error('No more space on the board');
            const maxNumber = Math.floor((this.board.nbRows * this.board.nbCols - 1) * 0.25);
            const minNumber = Math.ceil((this.board.nbRows * this.board.nbCols - 1) * 0.15);
            const nbKiddos = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
            for (let i = 0; i < nbKiddos; i++) {
                let pos = (0, random_1.randomPosition)(this.board);
                if (pos.x === null || pos.y === null) throw new Error('No more space on the board');
                const kiddo = new Entity_1.KiddoFactory().createInstance({ x: pos.x, y: pos.y });
                this.data.push(kiddo);
                this.board.console[pos.x][pos.y] = kiddo.displayType;
            }
        };
        this.getEntitiesAround = (entity) => {
            const { x, y } = entity.position;
            const entities = ['up', 'down', 'left', 'right'].reduce((result, direction) => {
                const [dx, dy] =
                    direction === 'up'
                        ? [-1, 0]
                        : direction === 'down'
                        ? [1, 0]
                        : direction === 'left'
                        ? [0, -1]
                        : [0, 1];
                result[direction] = this.data.find((e) => e.position.x === x + dx && e.position.y === y + dy) || null;
                return result;
            }, {});
            return entities;
        };
        this.newTurn = () => {};
        this.generateData();
    }
}
exports.Simulation = Simulation;