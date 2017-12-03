const MOVEMENT_TYPE_NUMBER_LIST = {
    0: 'standing',
    1: 'walking'
};

const MOVEMENT_TYPE_STRING_LIST = {
    STANDING: 0,
    WALKING: 1
};


class MovementType {

    constructor(movement) {
        if (typeof movement === 'string') {
            this.label = movement;
            this.number = MOVEMENT_TYPE_STRING_LIST[movement.toUpperCase()];
        } else {
            this.number = movement;
            this.label = MOVEMENT_TYPE_NUMBER_LIST[movement];
        }
    }

    getNumber() {
        return this.number;
    }

    getLabel() {
        return this.label;
    }
}

module.exports = MovementType;
