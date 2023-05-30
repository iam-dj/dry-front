const weaknessPowerMod = require("./WeaknessPowerModifier");
const strengthPowerMod = require("./StrengthPowerModifier");
const moveSelect = require("./MoveSelector");
const hpModify = require("./HPModifier");
const coinflip = require("./CoinFlip");
// const userGoes = require("./StartGame");

const userPokemon = [
  {
    name: "Venusaur",
    type: "Grass",
    secondary_type: "Poison",
    weakness: "fire",
    strength: "water",
    tier: 3,
    move1: 73,
    move2: 74,
    move3: 73,
    move4: 74,
    rarity: "very rare",
    evolutionId: 3,
    img_url:
      "https://res.cloudinary.com/duaznt4wg/image/upload/v1684896179/003venusaur_zkyiww.png",
    hp: 100,
  },
];
const compPokemon = [
  {
    name: "Charizard",
    type: "Fire",
    secondary_type: "Dragon",
    weakness: "water",
    strength: "grass",
    tier: 3,
    move1: 32,
    move2: 21,
    move3: 73,
    move4: 74,
    rarity: "very rare",
    evolutionId: 3,
    img_url:
      "https://res.cloudinary.com/duaznt4wg/image/upload/v1684896179/003venusaur_zkyiww.png",
    hp: 100,
  },
];

const userTypeWeaknessModifier = weaknessPowerMod.modifier(
  userPokemon[0].type.toLowerCase(),
  compPokemon[0].type.toLowerCase()
);
const userTypeStrengthModifier = strengthPowerMod.modifier(
  userPokemon[0].type.toLowerCase(),
  compPokemon[0].type.toLowerCase()
);
const compTypeWeaknessModifier = weaknessPowerMod.modifier(
  compPokemon[0].type.toLowerCase(),
  userPokemon[0].type.toLowerCase()
);
const compTypeStrengthModifier = strengthPowerMod.modifier(
  compPokemon[0].type.toLowerCase(),
  userPokemon[0].type.toLowerCase()
);

// console.log(userTypeWeaknessModifier); //weakeness modifier #
// console.log(userTypeStrengthModifier); //strength modifier #

var randomUserMove = moveSelect.randMove(userPokemon);
var randomCompMove = moveSelect.randMove(compPokemon);


// console.log(randomUserMove); //move #
// console.log(randomCompMove); //move #

const updateMyHP = hpModify.updateHP(userPokemon);
const updateCompHP = hpModify.updateHP(compPokemon);

// console.log(updateMyHP); //update to hp
// console.log(updateCompHP); //update to hp

// console.log(coinflip.flip());
//flips either 1-heads or 2-tails

userPokemon[0].hp = userPokemon[0].hp + updateMyHP;
compPokemon[0].hp = compPokemon[0].hp + updateCompHP;

const HorT = coinflip.flip();

if (HorT == 1 || HorT == 2) {
  StartGame();
}

function StartGame() {
  randomUserMove = moveSelect.randMove(userPokemon);
  randomCompMove = moveSelect.randMove(compPokemon);
  
  if (userPokemon[0].hp <= 0){
    compWon();
  } else if (compPokemon[0].hp <= 0) {
    userWon();
  } else {
    battle();
  }
}

function battle() {

console.log(userTypeWeaknessModifier); //weakeness modifier #
console.log(userTypeStrengthModifier); //strength modifier #
console.log(compTypeWeaknessModifier); //weakeness modifier #
console.log(compTypeStrengthModifier); //strength modifier #

console.log('=========================');

  
  const damage = (Math.trunc((randomUserMove * 0.1) * userTypeWeaknessModifier) * userTypeStrengthModifier);
  compPokemon[0].hp = compPokemon[0].hp - damage;

  console.log("You're pokemon "+userPokemon[0].name+` used ${randomUserMove} it did ${damage} damage you have ` +userPokemon[0].hp+ " hp left! and your opponent has "+compPokemon[0].hp+ " hp left!");

  

  const damageTwo = (Math.trunc((randomCompMove * 0.1) * compTypeWeaknessModifier) * compTypeStrengthModifier);
  userPokemon[0].hp = userPokemon[0].hp - damageTwo;

  console.log("The opponent's pokemon "+compPokemon[0].name+` used ${randomCompMove} it did ${damageTwo} damage they have ` +compPokemon[0].hp+ " hp left! and you have "+userPokemon[0].hp+ " hp left!");

  console.log("\n\n");


StartGame();
}

function userWon () {
  console.log('you win!!');
  
}
function compWon () {
  console.log('you lose');

}

