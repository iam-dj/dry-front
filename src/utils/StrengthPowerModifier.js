
function modifier(attackerType, defenderType) {
    if (attackerType === 'grass' && (defenderType === 'water' || defenderType === 'ground' || defenderType === 'rock')) {
        return 1.5;
    } else if (attackerType === 'fire' && (defenderType === 'grass' || defenderType === 'bug' || defenderType === 'ice')) {
        return 1.5;
    } else if (attackerType === 'water' && (defenderType === 'fire' || defenderType === 'ground' || defenderType === 'rock')) {
        return 1.5;
    } else if (attackerType === 'electric' && (defenderType === 'water' || defenderType === 'flying')) {
        return 1.5;
    } else if (attackerType === 'rock' && (defenderType === 'water' || defenderType === 'grass' || defenderType === 'ground')) {
        return 1.5;
    } else if (attackerType === 'ground' && (defenderType === 'poison' || defenderType === 'rock')) {
        return 1.5;
    } else if (attackerType === 'fighting' && (defenderType === 'ghost' || defenderType === 'psychic')) {
        return 1.5;
    } else if (attackerType === 'ghost' && (defenderType === 'psychic' || defenderType === 'ghost')) {
        return 1.5;
    } else if (attackerType === 'psychic' && (defenderType === 'bug' || defenderType === 'ghost' || defenderType === 'dark')) {
        return 1.5;
    } else if (attackerType === 'flying' && (defenderType === 'electric' || defenderType === 'ice' || defenderType === 'rock')) {
        return 1.5;
    } else if (attackerType === 'dragon' && (defenderType === 'ice' || defenderType === 'dragon')) {
        return 1.5;
    } else if (attackerType === 'ice' && (defenderType === 'rock' || defenderType === 'fire' || defenderType === 'fighting')) {
        return 1.5;
    } else if (attackerType === 'normal' && (defenderType === 'fighting')) {
        return 1.5;
    } else if (attackerType === 'bug' && (defenderType === 'normal' || defenderType === 'flying' || defenderType === 'fighting')) {
        return 1.5;
    } else if (attackerType === 'poison' && (defenderType === 'psychic' || defenderType === 'ground')) {
        return 1.5;
    } else {
        return 1;
    }
}








module.exports = {
    modifier,
  };

