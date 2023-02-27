"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decor = exports.DecorFactory = void 0;
var DecorSymbol;
(function (DecorSymbol) {
    DecorSymbol["Tree"] = "Arbre";
    DecorSymbol["Rock"] = "Rocher";
    DecorSymbol["Water"] = "Eau";
    DecorSymbol["Bridge"] = "Pont";
    DecorSymbol["Ground"] = "Sol";
})(DecorSymbol || (DecorSymbol = {}));
class DecorType {
    constructor(symbol, traversable) {
        this.symbol = symbol;
        this.traversable = traversable;
    }
    createInstance(position) {
        const instance = new Decor();
        instance.traversable = this.traversable;
        instance.symbol = this.symbol;
        instance.position = position;
        return instance;
    }
}
class Blocking extends DecorType {
    constructor(type) {
        super(type, false);
    }
}
class NonBlocking extends DecorType {
    constructor(type) {
        super(type, true);
    }
}
class DecorFactory {
    createInstance(position) {
        const blockingTypes = [DecorSymbol.Tree, DecorSymbol.Rock, DecorSymbol.Water];
        const nonBlockingTypes = [DecorSymbol.Bridge, DecorSymbol.Ground];
        const blocking = Math.random() < 0.5;
        const tempType = blocking
            ? blockingTypes[Math.floor(Math.random() * blockingTypes.length)]
            : nonBlockingTypes[Math.floor(Math.random() * nonBlockingTypes.length)];
        switch (tempType) {
            case DecorSymbol.Tree:
                return new Blocking(DecorSymbol.Tree).createInstance(position);
            case DecorSymbol.Rock:
                return new Blocking(DecorSymbol.Rock).createInstance(position);
            case DecorSymbol.Water:
                return new Blocking(DecorSymbol.Water).createInstance(position);
            case DecorSymbol.Bridge:
                return new NonBlocking(DecorSymbol.Bridge).createInstance(position);
            case DecorSymbol.Ground:
                return new NonBlocking(DecorSymbol.Ground).createInstance(position);
        }
    }
}
exports.DecorFactory = DecorFactory;
class Decor {
    constructor() {
        this.traversable = false;
    }
}
exports.Decor = Decor;
