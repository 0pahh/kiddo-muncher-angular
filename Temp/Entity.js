"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KiddoFactory = exports.DeadKiddo = exports.Kiddo = exports.Ogre = void 0;
class Ogre {
    constructor() {
        this.symbol = 'O';
    }
    createInstance(position) {
        const instance = new Ogre();
        instance.position = position;
        return instance;
    }
    eat(kiddo) {
        const deadKiddo = new DeadKiddo(kiddo.position);
        console.log("position", kiddo.position);
        // Set any additional properties of the DeadKiddo instance here, if needed
        return deadKiddo;
    }
    move(position) {
        this.position = position;
    }
}
exports.Ogre = Ogre;
var MovementType;
(function (MovementType) {
    MovementType[MovementType["Random"] = 0] = "Random";
    MovementType[MovementType["MoveRight"] = 1] = "MoveRight";
    MovementType[MovementType["MoveLeft"] = 2] = "MoveLeft";
    MovementType[MovementType["MoveUp"] = 3] = "MoveUp";
    MovementType[MovementType["MoveDown"] = 4] = "MoveDown";
    MovementType[MovementType["Stay"] = 5] = "Stay";
})(MovementType || (MovementType = {}));
var DisplayType;
(function (DisplayType) {
    DisplayType["Standard"] = "Standard";
    DisplayType["Girl"] = "Girl";
    DisplayType["Boy"] = "Boy";
    DisplayType["Hat"] = "Hat";
    DisplayType["Instrument"] = "Instrument";
})(DisplayType || (DisplayType = {}));
var DeadType;
(function (DeadType) {
    DeadType["Nothing"] = "Nothing";
    DeadType["Dust"] = "Dust";
    DeadType["Fall"] = "Fall";
    DeadType["Bones"] = "Bones";
})(DeadType || (DeadType = {}));
class Kiddo {
    constructor(position, movementType = MovementType.Random, displayType = DisplayType.Standard, symbol = 'K') {
        this.position = position;
        this.movementType = movementType;
        this.displayType = displayType;
        this.symbol = symbol;
    }
    move(position) {
        this.position = position;
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
class KiddoFactory {
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
