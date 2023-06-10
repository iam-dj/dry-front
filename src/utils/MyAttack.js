function modAttack(pokemon) {
  if (pokemon[0].level >= 1 && pokemon[0].level <= 9) {
    // Code for level 1 - 9
    return 0;
  } else if (pokemon[0].level >= 10 && pokemon[0].level <= 19) {
    // Code for level 10-19
    return 0.055;
  } else if (pokemon[0].level >= 20 && pokemon[0].level <= 29) {

    return 0.08;
  } else if (pokemon[0].level >= 30 && pokemon[0].level <= 39) {

    return 0.1;
  } else if (pokemon[0].level >= 40 && pokemon[0].level <= 49) {

    return 0.13;
  } else if (pokemon[0].level >= 50 && pokemon[0].level <= 59) {

    return 0.15;
  } else if (pokemon[0].level >= 60 && pokemon[0].level <= 69) {

    return 0.196;
  } else if (pokemon[0].level >= 70 && pokemon[0].level <= 79) {

    return 0.2;
  } else if (pokemon[0].level >= 80 && pokemon[0].level <= 89) {

    return 0.23;
  } else if (pokemon[0].level >= 90 && pokemon[0].level <= 99) {

    return 0.27;
  } else  {

    return 1;
  }
}

module.exports = {
  modAttack,
};
