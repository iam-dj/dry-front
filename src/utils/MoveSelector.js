
function randMove(pokemon) {
    
const myPokemon = pokemon[Math.floor(Math.random() * pokemon.length)];

const myMoveIndex = Math.floor(Math.random() * 4);

const randomMyMove = myPokemon[`move${myMoveIndex + 1}`];

return randomMyMove;
}








module.exports = {
    randMove,
  };

