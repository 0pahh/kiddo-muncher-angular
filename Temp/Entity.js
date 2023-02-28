"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KiddoFactory = exports.Creator = exports.DeadKiddo = exports.Kiddo = exports.Ogre = void 0;
class Ogre {
    constructor() {
        this.lastMove = null;
        this.symbol = '👹';
    }
    createInstance(position) {
        const instance = new Ogre();
        instance.position = position;
        return instance;
    }
    eat(kiddo) {
        const deadKiddo = new DeadKiddo(kiddo.position);
        return deadKiddo;
    }
    move(direction) {
        switch (direction) {
            case 'up':
                this.position.x--;
                break;
            case 'down':
                this.position.x++;
                break;
            case 'left':
                this.position.y--;
                break;
            case 'right':
                this.position.y++;
                break;
        }
    }
}
exports.Ogre = Ogre;
var MovementType;
(function (MovementType) {
    MovementType["Random"] = "random";
    MovementType["MoveRight"] = "right";
    MovementType["MoveLeft"] = "left";
    MovementType["MoveUp"] = "up";
    MovementType["MoveDown"] = "down";
    MovementType["Stay"] = "stay";
})(MovementType || (MovementType = {}));
var DisplayType;
(function (DisplayType) {
    DisplayType["Standard"] = "\uD83D\uDC76";
    DisplayType["Girl"] = "\uD83D\uDC67";
    DisplayType["Boy"] = "\uD83D\uDC66";
    DisplayType["Hat"] = "\uD83E\uDD20";
    DisplayType["Instrument"] = "\uD83E\uDDD1\u200D\uD83C\uDFA4";
})(DisplayType || (DisplayType = {}));
var DeadType;
(function (DeadType) {
    DeadType["Nothing"] = "\uD83D\uDC7B";
    DeadType["Dust"] = "\uD83C\uDF2B\uFE0F";
    DeadType["Fall"] = "\uD83D\uDCA9";
    DeadType["Bones"] = "\uD83E\uDDB4";
})(DeadType || (DeadType = {}));
class Kiddo {
    constructor(position, movementType = MovementType.Random, displayType = DisplayType.Standard, symbol = 'K') {
        this.lastMove = null;
        this.position = position;
        this.movementType = movementType;
        this.displayType = displayType;
        this.symbol = symbol;
    }
    move(direction) {
        switch (direction) {
            case 'up':
                this.position.x--;
                break;
            case 'down':
                this.position.x++;
                break;
            case 'left':
                this.position.y--;
                break;
            case 'right':
                this.position.y++;
                break;
        }
    }
    display() {
        // TODO: implémenter la logique d'affichage en fonction de displayType
    }
}
exports.Kiddo = Kiddo;
class DeadKiddo extends Kiddo {
    constructor(position) {
        super(position);
        this.symbol = 'X';
        this.deadType = this.attributeDeadType();
        this.symbol = this.attributeDeadType();
    }
    display() {
        // TODO: implémenter la logique d'affichage en fonction de deadType
    }
    attributeDeadType() {
        const deathTypes = [DeadType.Nothing, DeadType.Dust, DeadType.Fall, DeadType.Bones];
        const deathType = deathTypes[Math.floor(Math.random() * deathTypes.length)];
        return deathType;
    }
}
exports.DeadKiddo = DeadKiddo;
class Creator {
}
exports.Creator = Creator;
class KiddoFactory extends Creator {
    createInstance(position) {
        const kiddosMovementsType = [
            MovementType.Random,
            MovementType.MoveRight,
            MovementType.MoveLeft,
            MovementType.MoveUp,
            MovementType.MoveDown,
            MovementType.Stay,
        ];
        const kiddosDisplayType = [
            DisplayType.Standard,
            DisplayType.Boy,
            DisplayType.Girl,
            DisplayType.Hat,
            DisplayType.Instrument,
        ];
        const movementType = kiddosMovementsType[Math.floor(Math.random() * kiddosMovementsType.length)];
        const displayType = kiddosDisplayType[Math.floor(Math.random() * kiddosDisplayType.length)];
        return new Kiddo(position, movementType, displayType, displayType);
    }
}
exports.KiddoFactory = KiddoFactory;
