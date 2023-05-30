
function modifier(attackerType, defenderType) {
    if (attackerType === 'grass' && (defenderType === 'fire' || defenderType === 'ice' || defenderType === 'bug')) {
        return 0.75;
    } else if (attackerType === 'fire' && (defenderType === 'water' || defenderType === 'ground' || defenderType === 'rock')) {
        return 0.75;
    } else if (attackerType === 'water' && (defenderType === 'electric' || defenderType === 'grass')) {
        return 0.75;
    } else if (attackerType === 'electric' && (defenderType === 'rock' || defenderType === 'ground')) {
        return 0.75;
    } else if (attackerType === 'rock' && (defenderType === 'water' || defenderType === 'grass' || defenderType === 'ground')) {
        return 0.75;
    } else if (attackerType === 'ground' && (defenderType === 'fighting' || defenderType === 'grass' || defenderType === 'water')) {
        return 0.75;
    } else if (attackerType === 'fighting' && (defenderType === 'ghost' || defenderType === 'psychic' || defenderType === 'flying')) {
        return 0.75;
    } else if (attackerType === 'ghost' && (defenderType === 'psychic' || defenderType === 'ghost')) {
        return 0.75;
    } else if (attackerType === 'psychic' && (defenderType === 'bug' || defenderType === 'ghost' || defenderType === 'dark')) {
        return 0.75;
    } else if (attackerType === 'flying' && (defenderType === 'electric' || defenderType === 'ice' || defenderType === 'rock')) {
        return 0.75;
    } else if (attackerType === 'dragon' && (defenderType === 'ice' || defenderType === 'dragon')) {
        return 0.75;
    } else if (attackerType === 'ice' && (defenderType === 'rock' || defenderType === 'fire' || defenderType === 'fighting')) {
        return 0.75;
    } else if (attackerType === 'normal' && (defenderType === 'fighting' || defenderType === '')) {
        return 0.75;
    } else if (attackerType === 'bug' && (defenderType === 'normal' || defenderType === 'flying' || defenderType === 'fighting')) {
        return 0.75;
    } else if (attackerType === 'poison' && (defenderType === 'psychic' || defenderType === 'ground')) {
        return 0.75;
    } else {
        return 1;
    }
}








module.exports = {
    modifier,
  };

