export interface Entity {
    position: { x: number; y: number };
    lastMove: 'up' | 'down' | 'left' | 'right' | null;
    symbol: string;
    move(direction: 'up' | 'down' | 'left' | 'right'): void;
}

export class Ogre implements Entity {
    position!: { x: number; y: number };
    lastMove: 'up' | 'down' | 'left' | 'right' | null = null;
    symbol: string = 'O';

    createInstance(position: { x: number; y: number }): Ogre {
        const instance = new Ogre();
        instance.position = position;
        return instance;
    }

    eat(kiddo: Kiddo): DeadKiddo {
        const deadKiddo = new DeadKiddo(kiddo.position);
        console.log('position', kiddo.position);
        // Set any additional properties of the DeadKiddo instance here, if needed
        return deadKiddo;
    }
    move(direction: 'up' | 'down' | 'left' | 'right') {
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

enum MovementType {
    Random,
    MoveRight,
    MoveLeft,
    MoveUp,
    MoveDown,
    Stay,
}

enum DisplayType {
    Standard = 'Standard',
    Girl = 'Girl',
    Boy = 'Boy',
    Hat = 'Hat',
    Instrument = 'Instrument',
}

enum DeadType {
    Nothing = 'Nothing',
    Dust = 'Dust',
    Fall = 'Fall',
    Bones = 'Bones',
}

export class Kiddo implements Entity {
    position: { x: number; y: number };
    movementType: MovementType;
    displayType: DisplayType;
    lastMove: 'up' | 'down' | 'left' | 'right' | null = null;
    symbol!: string;

    constructor(
        position: { x: number; y: number },
        movementType: MovementType = MovementType.Random,
        displayType: DisplayType = DisplayType.Standard,
        symbol: string = 'K',
    ) {
        this.position = position;
        this.movementType = movementType;
        this.displayType = displayType;
        this.symbol = symbol;
    }

    move(direction: 'up' | 'down' | 'left' | 'right') {}

    display() {
        // TODO: implémenter la logique d'affichage en fonction de displayType
    }
}

export class DeadKiddo extends Kiddo {
    deadType: DeadType;
    symbol: string = 'X';
    constructor(position: { x: number; y: number }) {
        super(position);
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

export class KiddoFactory {
    public createInstance(position: { x: number; y: number }): Kiddo {
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
