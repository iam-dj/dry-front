
function randMovePower(pokemon) {
    
const myPokemon = pokemon[Math.floor(Math.random() * pokemon.length)];

// console.log('===============');

const myMoveIndex = Math.floor(Math.random() * 4)+1;

const randomMyMove = myPokemon['move' + myMoveIndex].power;
const randomMoveType = myPokemon['move' + myMoveIndex].type;
const randomMoveName = myPokemon['move' + myMoveIndex].name;


// console.log(randomMyMove);

return {randomMyMove, randomMoveType, randomMoveName};
}








module.exports = {
    randMovePower,
  };

