function newShip(length, hits = 0, sunk = false) {
    return {
        length: length,
        hits: hits,
        sunk: sunk,
        hit: function() {
            this.hits += 1;
            return this.hits;
        },
        isSunk: function() {
            if (this.hits >= this.length) {
                this.sunk = true;
            }
            return this.sunk;
        }
    };
}

function Gameboard(){
    const ships = [];
    const placed = [];
    const missed = [];

    function placeShip(length, startCoordinate, direction = 'horizontal') {
        const ship = newShip(length);
        let x = startCoordinate[0];
        let y = startCoordinate[1];

        const tempPosition = [];
        tempPosition.push([x, y]);

        if (direction === 'horizontal') {
            for (let i = 1; i < length; i++) {
                tempPosition.push([x, y + i]);
            }
        } else {
            for (let i = 1; i < length; i++) {
                tempPosition.push([x + i, y]);
            }
        }

        const valid = tempPosition.every(coord => coord[0] >= 0 && coord[0] < 10 && coord[1] >= 0 && coord[1] < 10);
        if (!valid) return;

        const overlap = tempPosition.some(coord =>
            placed.some(p => p[0] === coord[0] && p[1] === coord[1])
        );
        if (overlap) return;

        ships.push({ ship, position: tempPosition });
        placed.push(...tempPosition);

        return ships;
    }
    
    function receiveAttack(x, y) {
    const attackCoord = [x, y];

    for (const shipObj of ships) {
        if (shipObj.position.some(coord => coord[0] === x && coord[1] === y)) {
            const currentShip = shipObj.ship;
            currentShip.hit();
            const sunk = currentShip.isSunk();
            return { hit: true, sunk };
        }
    }
    missed.push(attackCoord);
    return { hit: false };
}


    return{
        ships: ships,
        placeShip,
        receiveAttack,
        missed
    }
}



module.exports = {newShip, Gameboard};