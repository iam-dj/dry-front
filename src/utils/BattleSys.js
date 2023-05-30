const weakness = require("./Weakness");

const userPokemon = [
  {
    name: "Venusaur",
    type: "Grass",
    secondary_type: "Poison",
    weakness: "fire",
    strength: "water",
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
]
const compPokemon = [
  {
    name: "Venusaur",
    type: "Grass",
    secondary_type: "Poison",
    weakness: "fire",
    strength: "water",
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
]
/*
 AttackerType: fire,
 weakness:  true -- 1.5
 restance: true -- .75
 both false? 1.0
      Fire: 0.75, // -25% damage against Fire
      Grass: 0.75, // -25% damage against Grass
      Water: 1.5, // +50% damage against Water
      Bug: 0.75, // -25% damage against Bug
      Ice: 1.5, // +50% damage against Ice
      Ground: 1, // Normal damage against Ground
      Rock: 1.5, // +50% damage against Rock
      Dragon: 0.75, // -25% damage against Dragon
*/
const typeEffectivenessChart = [
    {
      AttackerType: fire,
      Fire: 0.75, // -25% damage against Fire
      Grass: 0.75, // -25% damage against Grass
      Water: 1.5, // +50% damage against Water
      Bug: 0.75, // -25% damage against Bug
      Ice: 1.5, // +50% damage against Ice
      Ground: 1, // Normal damage against Ground
      Rock: 1.5, // +50% damage against Rock
      Dragon: 0.75, // -25% damage against Dragon
    },
    Grass: {
      Fire: 1.5, // +50% damage against Fire
      Water: 0.75, // -25% damage against Water
      Bug: 1.5, // +50% damage against Bug
      Poison: 1.5, // +50% damage against Poison
      Flying: 0.75, // -25% damage against Flying
      Grass: 0.75, // -25% damage against Grass
      Dragon: 0.75, // -25% damage against Dragon
    },
    Water: {
      Fire: 0.75, // -25% damage against Fire
      Water: 0.75, // -25% damage against Water
      Grass: 1.5, // +50% damage against Grass
      Ground: 1.5, // +50% damage against Ground
      Rock: 1.5, // +50% damage against Rock
      Dragon: 0.75, // -25% damage against Dragon
    },
    Bug: {
      Fire: 0.75, // -25% damage against Fire
      Grass: 1.5, // +50% damage against Grass
      Fighting: 0.75, // -25% damage against Fighting
      Poison: 0.75, // -25% damage against Poison
      Flying: 0.75, // -25% damage against Flying
      Ghost: 0.75, // -25% damage against Ghost
      Psychic: 1.5, // +50% damage against Psychic
    },
    Ghost: {
      Normal: 0, // No damage against Normal
      Psychic: 1.5, // +50% damage against Psychic
      Ghost: 1.5, // +50% damage against Ghost
    },
    Psychic: {
      Fighting: 1.5, // +50% damage against Fighting
      Poison: 1.5, // +50% damage against Poison
      Psychic: 0.75, // -25% damage against Psychic
    },
    Fairy: {
      Fire: 0.75, // -25% damage against Fire
      Fighting: 1.5, // +50% damage against Fighting
      Poison: 0.75, // -25% damage against Poison
      Dragon: 1.5, // +50% damage against Dragon
    },
    Fighting: {
      Normal: 1.5, // +50% damage against Normal
      Ice: 1.5, // +50% damage against Ice
      Poison: 0.75, // -25% damage against Poison
      Flying: 0.75, // -25% damage against Flying
      Psychic: 0.75, // -25% damage against Psychic
      Bug: 0.75, // -25% damage against Bug
      Rock: 1.5, // +50% damage against Rock
      Ghost: 0, // No damage against Ghost
    },
    Ground: {
      Water: 1.5, // +50% damage against Water
      Grass: 0.75, // -25% damage against Grass
      Ice: 1.5, // +50% damage against Ice
      Poison: 1.5, // +50% damage against Poison
      Rock: 0.75, // -25% damage against Rock
      Electric: 2, // +100% damage against Electric
    },
    Rock: {
      Fire: 1.5, // +50% damage against Fire
      Ice: 1.5, // +50% damage against Ice
      Fighting: 0.75, // -25% damage against Fighting
      Ground: 1.5, // +50% damage against Ground
      Flying: 1.5, // +50% damage against Flying
      Bug: 1.5, // +50% damage against Bug
    },
    Electric: {
      Water: 1.5, // +50% damage against Water
      Flying: 0.75, // -25% damage against Flying
      Electric: 0.75, // -25% damage against Electric
      Grass: 1.5, // +50% damage against Grass
      Ground: 0, // No damage against Ground
      Dragon: 0.75, // -25% damage against Dragon
    },
    Flying: {
      Grass: 1.5, // +50% damage against Grass
      Fighting: 1.5, // +50% damage against Fighting
      Bug: 1.5, // +50% damage against Bug
      Rock: 0.75, // -25% damage against Rock
      Electric: 1.5, // +50% damage against Electric
    },
    Poison: {
      Grass: 0.75, // -25% damage against Grass
      Poison: 0.75, // -25% damage against Poison
      Ground: 1.5, // +50% damage against Ground
      Rock: 0.75, // -25% damage against Rock
      Ghost: 0.75, // -25% damage against Ghost
    },
    Normal: {
      Rock: 0.75, // -25% damage against Rock
      Ghost: 0, // No damage against Ghost
    },
];

  function getTypeModifier(attackerType, defenderType) {
    const myPoke = attackerType;
    const challengePoke = defenderType;
    // typeEffectivenessChart.attackerType.defenderType;

    const pokeAttackType = typeEffectivenessChart.filter((type)=> type.myPoke); 

    console.log (pokeAttackType);
  
    // const typeModifier = typeEffectivenessChart[attackerType][defenderType] || 1;
  
    // return typeModifier;
  }




const myPokemon = userPokemon[Math.floor(Math.random() * userPokemon.length)];

const myMoveIndex = Math.floor(Math.random() * 4);

const randomMyMove = myPokemon[`move${myMoveIndex + 1}`];

console.log(randomMyMove);


const defenderPokemon = compPokemon[Math.floor(Math.random() * compPokemon.length)];

const CompMoveIndex = Math.floor(Math.random() * 4);

const randomCompMove = defenderPokemon[`move${CompMoveIndex + 1}`];

console.log(randomCompMove);




calculateDamage (userPokemon,compPokemon)



function calculateDamage(attacker, defender) {
  const myTierModifier = getTierModifier(attacker[0].tier);
  const compTierModifier = getTierModifier(defender[0].tier);
  const typeModifier = getTypeModifier(attacker[0].type, defender[0].type);

//   const baseDamage = 50 * 0.1; // Base damage value for the move
//   const myAttackPower = getPower();
//   const compAttackPower = getPower();


  const damage = baseDamage * typeModifier;

//   console.log(attacker[0].tier);
  console.log(myTierModifier);
  console.log(compTierModifier);
}

function getTierModifier(tier) {
    //modifify HP
  if (tier == 3) {
    return 1;
  } else if (tier == 2) {
    return 0.5;
  } else {
    return 0.75;
  }
}

