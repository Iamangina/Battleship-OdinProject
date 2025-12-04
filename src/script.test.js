const newShip = require("./index.js");

describe('createShip', () => {
    test('should create a ship object with the correct properties', () => {
        const ship = newShip(4);
        expect(ship).toBeDefined();
        expect(ship.length).toBe(4);
        expect(ship.hits).toBe(0);
        expect(ship.sunk).toBe(false);
    })
})