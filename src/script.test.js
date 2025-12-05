const {newShip }= require("./index.js");

describe('createShip', () => {
    test('should create a ship object with the correct properties', () => {
        const ship = newShip(4);
        expect(ship).toBeDefined();
        expect(ship.length).toBe(4);
        expect(ship.hits).toBe(0);
        expect(ship.sunk).toBe(false);
    })
})


const {Gameboard} = require('./index.js');

describe('Gameboard', () => {
    let board;

    beforeEach(() => {
        board = Gameboard();
    });

    test('should place a ship horizontally', () => {
        const ships = board.placeShip(3, [1, 1], 'horizontal');
        expect(ships).toHaveLength(1);
        expect(ships[0].position).toEqual([[1,1],[1,2],[1,3]]);
    });

    test('should place a ship vertically', () => {
        const ships = board.placeShip(2, [2, 2], 'vertical');
        expect(ships).toHaveLength(1);
        expect(ships[0].position).toEqual([[2,2],[3,2]]);
    });

    test('should not place a ship outside the board', () => {
        const ships = board.placeShip(4, [10, 10], 'horizontal');
        expect(ships).toBeUndefined();
    });

    test('should not overlap ships', () => {
        board.placeShip(2, [1, 1], 'horizontal');
        const ships = board.placeShip(2, [1, 2], 'horizontal');
        expect(ships).toBeUndefined();
    });

    test('should add hit to the ship', () => {
        const ships = board.placeShip(3, [3,2], 'horizontal');
        board.receiveAttack(3, 4);
        expect(board.ships[0].ship.hits).toBe(1);
    });

    test('should sunk the ship if hits === length', () => {
        const ships = board.placeShip(1, [1,1], 'horizontal');
        board.receiveAttack(1, 1);
        expect(board.ships[0].ship.sunk).toBe(true);
    })
});