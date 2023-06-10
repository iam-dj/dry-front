function modCompHealthBasedOnUserLevel(pokemon) {
  if (pokemon[0].level >= 1 && pokemon[0].level <= 9) {
    // Code for level 1 - 9
    return 1;
  } else if (pokemon[0].level >= 10 && pokemon[0].level <= 19) {
    // Code for level 10-19
    return 125;
  } else if (pokemon[0].level >= 20 && pokemon[0].level <= 29) {
    return 200;
  } else if (pokemon[0].level >= 30 && pokemon[0].level <= 39) {
    return 225;
  } else if (pokemon[0].level >= 40 && pokemon[0].level <= 49) {
    return 300;
  } else if (pokemon[0].level >= 50 && pokemon[0].level <= 59) {
    return 325;
  } else if (pokemon[0].level >= 60 && pokemon[0].level <= 69) {
    return 400;
  } else if (pokemon[0].level >= 70 && pokemon[0].level <= 79) {
    return 425;
  } else if (pokemon[0].level >= 80 && pokemon[0].level <= 89) {
    return 500;
  } else if (pokemon[0].level >= 90 && pokemon[0].level <= 99) {
    return 525;
  } else {
    return 600;
  }
}

module.exports = {
    modCompHealthBasedOnUserLevel,
};
