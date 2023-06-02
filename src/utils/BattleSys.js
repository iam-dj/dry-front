const weaknessPowerMod = require("./WeaknessPowerModifier");
const strengthPowerMod = require("./StrengthPowerModifier");
const moveSelect = require("./MoveSelector");
const hpModify = require("./HPModifier");
const coinflip = require("./CoinFlip");
const hitormiss = require("./HitOrMiss");
// const userGoes = require("./StartGame");

const userPokemon = [
  {
    "id": 4,
    "name": "Ash Ketchum",
    "age": 16,
    "numwins": 32,
    "numLosses": 12,
    "boulder_badge": true,
    "cascade_badge": true,
    "thunder_badge": true,
    "rainbow_badge": true,
    "soul_badge": true,
    "marsh_badge": true,
    "volcano_badge": true,
    "earth_badge": true,
    "pokemons": [
      {
        "id": 151,
        "name": "Mew",
        "type": "psychic",
        "secondary_type": null,
        "level": 1,
        "hp": 100,
        "experience": 0,
        "img_url": "https://res.cloudinary.com/duaznt4wg/image/upload/v1684901802/mew-png_jppzde.png",
        "evolutionId": 1,
        "rarity": "Legendary",
        "tier": 3,
        "isCaught": false,
        "TrainerId": 4,
        "move1Id": 1,
        "move2Id": 5,
        "move3Id": 140,
        "move4Id": 211,
        "npcId": null,
        "move1": {
          "id": 1,
          "name": "Pound",
          "power": 15,
          "type": "Normal",
          "description": "The target is physically pounded with a long tail or a forelimb, etc.",
          "npcId": null
        },
        "move2": {
          "id": 5,
          "name": "Mega Punch",
          "power": 80,
          "type": "Normal",
          "description": "The target is slugged with a punch thrown at maximum power.",
          "npcId": null
        },
        "move3": {
          "id": 7,
          "name": "Gut Punch",
          "power": 69,
          "type": "Normal",
          "description": "The target is slugged with a punch thrown at maximum power.",
          "npcId": null
        },
        "move4": {
          "id": 9,
          "name": "Scratch",
          "power": 40,
          "type": "Normal",
          "description": "Hard, pointed, sharp claws rake the target to inflict damage.",
          "npcId": null
        }
      }
    ]
  }
];
const compPokemon = [
  {
    "id": 4,
    "name": "Ash Ketchum",
    "age": 16,
    "numwins": 32,
    "numLosses": 12,
    "boulder_badge": true,
    "cascade_badge": true,
    "thunder_badge": true,
    "rainbow_badge": true,
    "soul_badge": true,
    "marsh_badge": true,
    "volcano_badge": true,
    "earth_badge": true,
    "pokemons": [
      {
        "id": 151,
        "name": "Mew",
        "type": "psychic",
        "secondary_type": null,
        "level": 1,
        "hp": 100,
        "experience": 0,
        "img_url": "https://res.cloudinary.com/duaznt4wg/image/upload/v1684901802/mew-png_jppzde.png",
        "evolutionId": 1,
        "rarity": "Legendary",
        "tier": 3,
        "isCaught": false,
        "TrainerId": 4,
        "move1Id": 1,
        "move2Id": 5,
        "move3Id": 140,
        "move4Id": 211,
        "npcId": null,
        "move1": {
          "id": 1,
          "name": "Pound",
          "power": 49,
          "type": "Normal",
          "description": "The target is physically pounded with a long tail or a forelimb, etc.",
          "npcId": null
        },
        "move2": {
          "id": 5,
          "name": "Mega Punch",
          "power": 85,
          "type": "Normal",
          "description": "The target is slugged with a punch thrown at maximum power.",
          "npcId": null
        },
        "move3": {
          "id": 7,
          "name": "Mega Punch",
          "power": 30,
          "type": "Normal",
          "description": "The target is slugged with a punch thrown at maximum power.",
          "npcId": null
        },
        "move4": {
          "id": 9,
          "name": "Scratch",
          "power": 10,
          "type": "Normal",
          "description": "Hard, pointed, sharp claws rake the target to inflict damage.",
          "npcId": null
        }
      }
    ]
  }
];



function startBattle(userPokemon, opponentPokemon) {
  const userPoke = userPokemon[0].pokemons;
  const compPoke = opponentPokemon[0].pokemons;

  let userTypeWeaknessModifier = 0;
  let userTypeStrengthModifier = 0;
  let compTypeWeaknessModifier = 0;
  let compTypeStrengthModifier = 0;

  let randomUserMovePower = 0;
  let randomCompMovePower = 0;

  const updateMyHP = hpModify.updateHP(userPoke);
  const updateCompHP = hpModify.updateHP(compPoke);

  userPoke[0].hp = userPoke[0].hp + updateMyHP;
  compPoke[0].hp = compPoke[0].hp + updateCompHP;

  const HorT = coinflip.flip();

  if (HorT === 1 || HorT === 2) {
    startGame();
  }

  function startGame() {
    randomUserMovePower = moveSelect.randMovePower(userPoke);
    randomCompMovePower = moveSelect.randMovePower(compPoke);

    userTypeWeaknessModifier = weaknessPowerMod.modifier(
      randomUserMovePower.randomMoveType.toLowerCase(),
      compPoke[0].type.toLowerCase()
    );
    userTypeStrengthModifier = strengthPowerMod.modifier(
      randomUserMovePower.randomMoveType.toLowerCase(),
      compPoke[0].type.toLowerCase()
    );
    compTypeWeaknessModifier = weaknessPowerMod.modifier(
      randomCompMovePower.randomMoveType.toLowerCase(),
      userPoke[0].type.toLowerCase()
    );
    compTypeStrengthModifier = strengthPowerMod.modifier(
      randomCompMovePower.randomMoveType.toLowerCase(),
      userPoke[0].type.toLowerCase()
    );

    if (userPoke[0].hp <= 0) {
      compWon();
    } else if (compPoke[0].hp <= 0) {
      userWon();
    } else {
      battle();
    }
  }

  function battle() {
    console.log(userTypeWeaknessModifier); // weakness modifier #
    console.log(userTypeStrengthModifier); // strength modifier #
    console.log(compTypeWeaknessModifier); // weakness modifier #
    console.log(compTypeStrengthModifier); // strength modifier #
    console.log("=========================");

    if (hitormiss.flip() === 10) {
      compPoke[0].hp = compPoke[0].hp - 0;
      console.log(
        "Your pokemon " +
          userPoke[0].name +
          ` missed. You have ` +
          userPoke[0].hp +
          " hp left! Your opponent has " +
          compPoke[0].hp +
          " hp left!\n"
      );
    } else {
      const damage =
        Math.trunc(
          randomUserMovePower.randomMyMove * 0.1 * userTypeWeaknessModifier
        ) * userTypeStrengthModifier;
      compPoke[0].hp = compPoke[0].hp - damage;
      if (damage >= 7) {
        console.log("YOUR ATTACK WAS SUPER EFFECTIVE!\n");
      }
      console.log(
        "Your pokemon " +
          userPoke[0].name +
          ` used ${randomUserMovePower.randomMoveName}. It did ${damage} damage. You have ` +
          userPoke[0].hp +
          " hp left! Your opponent has " +
          compPoke[0].hp +
          " hp left!\n"
      );
    }

    if (hitormiss.flip() === 10) {
      userPoke[0].hp = userPoke[0].hp - 0;
      console.log(
        "Opponent's pokemon " +
          compPoke[0].name +
          ` missed. You have ` +
          compPoke[0].hp +
          " hp left! Your opponent has " +
          userPoke[0].hp +
          " hp left!\n"
      );
    } else {
      const damageTwo =
        Math.trunc(
          randomCompMovePower.randomMyMove * 0.1 * compTypeWeaknessModifier
        ) * compTypeStrengthModifier;
      userPoke[0].hp = userPoke[0].hp - damageTwo;

      if (damageTwo >= 7) {
        console.log("YOUR OPPONENT'S ATTACK WAS SUPER EFFECTIVE!\n");
      }
      console.log(
        "The opponent's pokemon " +
          compPoke[0].name +
          ` used ${randomCompMovePower.randomMoveName}. It did ${damageTwo} damage. They have ` +
          compPoke[0].hp +
          " hp left! You have " +
          userPoke[0].hp +
          " hp left!\n"
      );
    }

    console.log("\n\n");

    startGame();
  }

  function userWon() {
    console.log("You win!!");
  }

  function compWon() {
    console.log("You lose");
  }

  startGame();
}

module.exports = {
  startBattle,
};