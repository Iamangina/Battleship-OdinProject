function newShip(length, hits = 0, sunk = false) {
    return {
        length: length,
        hits: hits,
        sunk: sunk,
        hit: function() {
            this.hits += 1;
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
    function placeShip(length, startCoordinate, direction = 'horizontal'){
        const ship = newShip(length);
        
        let x = startCoordinate[0];
        let y = startCoordinate[1];
        let coordinates = [x, y];

        const position = [];

        if(x > 0 && x < 10 && y > 0 && y < 10 && !placed.some(coord => coord[0] === x && coord[1] === y)){
            position.push(coordinates);
            placed.push(coordinates);
        }

        if(direction === 'horizontal'){
            for(let i = 0; i < ship.length - 1; i++){
                y++;
                if(x > 0 && x < 10 && y > 0 && y < 10 && !placed.some(coord => coord[0] === x && coord[1] === y)){
                position.push([x, y]);
                placed.push([x, y]);
            }}

        }else if(direction === 'vertical'){
            
            for(let i = 0; i < ship.length - 1; i++){
                x++;
                if(x > 0 && x < 10 && y > 0 && y < 10 && !placed.some(coord => coord[0] === x && coord[1] === y)){
                position.push([x, y]);
                placed.push([x, y]);
            }}
        }
        if(position.length === ship.length){
            ships.push({ship, position});
        } else {
            return;
        }

        return ships;
    }
    

    function receiveAttack(x, y){

    }
    return{
        ships: ships,
        placeShip,
        receiveAttack
    }
}



module.exports = {newShip, Gameboard};