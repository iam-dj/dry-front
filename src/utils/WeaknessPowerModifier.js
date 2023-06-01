
function modifier(attackerMoveType, defenderPokemonType) {
    if (attackerMoveType === 'grass' && (defenderPokemonType === 'fire' || defenderPokemonType === 'ice' || defenderPokemonType === 'bug')) {
        return 0.75;
    } else if (attackerMoveType === 'fire' && (defenderPokemonType === 'water' || defenderPokemonType === 'ground' || defenderPokemonType === 'rock')) {
        return 0.75;
    } else if (attackerMoveType === 'water' && (defenderPokemonType === 'electric' || defenderPokemonType === 'grass')) {
        return 0.75;
    } else if (attackerMoveType === 'electric' && (defenderPokemonType === 'rock' || defenderPokemonType === 'ground')) {
        return 0.75;
    } else if (attackerMoveType === 'rock' && (defenderPokemonType === 'water' || defenderPokemonType === 'grass' || defenderPokemonType === 'ground')) {
        return 0.75;
    } else if (attackerMoveType === 'ground' && (defenderPokemonType === 'fighting' || defenderPokemonType === 'grass' || defenderPokemonType === 'water')) {
        return 0.75;
    } else if (attackerMoveType === 'fighting' && (defenderPokemonType === 'ghost' || defenderPokemonType === 'psychic' || defenderPokemonType === 'flying')) {
        return 0.75;
    } else if (attackerMoveType === 'ghost' && (defenderPokemonType === 'psychic' || defenderPokemonType === 'ghost')) {
        return 0.75;
    } else if (attackerMoveType === 'psychic' && (defenderPokemonType === 'bug' || defenderPokemonType === 'ghost' || defenderPokemonType === 'dark')) {
        return 0.75;
    } else if (attackerMoveType === 'flying' && (defenderPokemonType === 'electric' || defenderPokemonType === 'ice' || defenderPokemonType === 'rock')) {
        return 0.75;
    } else if (attackerMoveType === 'dragon' && (defenderPokemonType === 'ice' || defenderPokemonType === 'dragon')) {
        return 0.75;
    } else if (attackerMoveType === 'ice' && (defenderPokemonType === 'rock' || defenderPokemonType === 'fire' || defenderPokemonType === 'fighting')) {
        return 0.75;
    } else if (attackerMoveType === 'normal' && (defenderPokemonType === 'fighting' || defenderPokemonType === '')) {
        return 0.75;
    } else if (attackerMoveType === 'bug' && (defenderPokemonType === 'normal' || defenderPokemonType === 'flying' || defenderPokemonType === 'fighting')) {
        return 0.75;
    } else if (attackerMoveType === 'poison' && (defenderPokemonType === 'psychic' || defenderPokemonType === 'ground')) {
        return 0.75;
    } else {
        return 1;
    }
}








module.exports = {
    modifier,
  };

