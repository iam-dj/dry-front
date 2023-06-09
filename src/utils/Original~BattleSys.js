// import React, { useState } from "react";
const weaknessAndPowerMod = require("./Power&WeaknessPowerModifier");
// const strengthPowerMod = require("./StrengthPowerModifier");
const moveSelect = require("./MoveSelector");

const myAttackModbylvl = require("./MyAttack");
const tierAttackMod = require("./AttackModifierTier");
const npcHealth = require("./NPCAttack");

const hpModify = require("./HPModifier");
const coinflip = require("./CoinFlip");
const hitormiss = require("./HitOrMiss");
// const mercy = require("./Mercy");

var lost = 0;
var win = 1;
var battleLogData = [];
let userHpArray = [];
let compHpArray = [];

function startBattle(userPokemon, opponentPokemon, opp, gym) {
  // console.log("oppenent pokemon", opponentPokemon.hp);
  // console.log("userpokemon", userPokemon);
  battleLogData = [];
  const userPoke = userPokemon;
  const compPoke = opponentPokemon;
  const name = opp;
  userHpArray = [];
  compHpArray = [];

  // console.log("battle sys check", compPoke.hp);
  // console.log("battle sys check", userPoke);
  console.log(gym);

  let userTypeWeaknessAndPowerModifier = 0;
  let userTypeStrengthModifier = 0;
  let compTypeWeaknessAndPowerModifier = 0;
  let compTypeStrengthModifier = 0;

  let randomUserMovePower = 0;
  let randomCompMovePower = 0;
  // var userMercyHelp;
  // var compMercyHelp;

  // if (gym === false) {
  //   userMercyHelp = mercy.mercyRule(userPoke, compPoke);
  //   compMercyHelp = mercy.mercyRule(compPoke, userPoke);
  // } else {
  //   compMercyHelp = 0;
  //   userMercyHelp = 0;
  // }

  const updateMyHP = hpModify.updateHP(userPoke);
  const updateCompHP = hpModify.updateHP(compPoke);

  const updateMyAttack = myAttackModbylvl.modAttack(userPoke);
  //returns a attack mod to add to the user attack

  const updateCompHPbaseOnlvl = npcHealth.modCompHealthBasedOnUserLevel(userPoke);
  //returns a number to add to the comp hp

  const myTierAttack = tierAttackMod.tierAttack(userPoke)
  //returns a number to add to damage

  const compTierAttack = tierAttackMod.tierAttack(compPoke)
  //returns a number to add to damage







  userPoke[0].hp = userPoke[0].hp + updateMyHP;
  compPoke[0].hp = compPoke[0].hp + updateCompHP;

  // compHpArray.push(`${compPoke[0].hp}`);
  // userHpArray.push(`${userPoke[0].hp}`);

  const HorT = coinflip.flip();

  if (HorT === 1 || HorT === 2) {
    startGame(userHpArray, compHpArray);
  }

  function startGame(userHpArray, compHpArray) {
    randomUserMovePower = moveSelect.randMovePower(userPoke);
    randomCompMovePower = moveSelect.randMovePower(compPoke);

    userTypeWeaknessAndPowerModifier = weaknessAndPowerMod.modifier(
      randomUserMovePower.randomMoveType.toLowerCase(),
      compPoke[0].type.toLowerCase()
    );
    // userTypeStrengthModifier = strengthPowerMod.modifier(
    //   randomUserMovePower.randomMoveType.toLowerCase(),
    //   compPoke[0].type.toLowerCase()
    // );
    compTypeWeaknessAndPowerModifier = weaknessAndPowerMod.modifier(
      randomCompMovePower.randomMoveType.toLowerCase(),
      userPoke[0].type.toLowerCase()
    );
    // compTypeStrengthModifier = strengthPowerMod.modifier(
    //   randomCompMovePower.randomMoveType.toLowerCase(),
    //   userPoke[0].type.toLowerCase()
    // );

    if (userPoke[0].hp <= 0) {
      console.log("user pokemon hp check:", userPoke[0].hp);
      return compWon(userHpArray, compHpArray); // Return 0 if the opponent wins
    } else if (compPoke[0].hp <= 0) {
      console.log("comp pokemon hp check:", compPoke[0].hp);
      return userWon(userHpArray, compHpArray); // Return 1 if the user wins
    } else {
      battle(userHpArray, compHpArray);
    }
  }

  function battle(userHpArray, compHpArray) {
    console.log("=========================");

    // console.log(compPoke[0].hp);
    // console.log(userPoke[0].hp);

    if (hitormiss.flip() === 10) {
      compPoke[0].hp = compPoke[0].hp - 0;
      // console.log(
      //   `Your pokemon ${userPoke[0].name} missed. You have ${userPoke[0].hp} hp left! ${name} has ${compPoke[0].hp} hp left!\n`
      // );
      // battleLogData.push(`Your pokemon ${userPoke[0].name} missed. \n`);
      // compHpArray.push(`Your pokemon ${userPoke[0].name} missed. \n`);
    } else {
      const damage = Math.trunc(
        randomUserMovePower.randomMyMove *
          (0.1 + updateMyAttack + myTierAttack) *
          userTypeWeaknessAndPowerModifier
      );
        // * userTypeStrengthModifier;
      compPoke[0].hp = compPoke[0].hp - damage;
      console.log("recursive", compHpArray);
      compHpArray.push(`${compPoke[0].hp}`);
      if (damage >= 20) {
        // console.log("YOUR ATTACK WAS SUPER EFFECTIVE!\n");
        // battleLogData.push("Your attack was SUPER effective!\n");
        // compHpArray.push("Your attack was SUPER effective!\n");
      }
      if (compPoke[0].hp >= 0) {
        console.log(
          `Your pokemon ${userPoke[0].name} used ${randomUserMovePower.randomMoveName}. It did ${damage} damage. \n`
        );
        battleLogData.push(
          `Your pokemon ${userPoke[0].name} used ${randomUserMovePower.randomMoveName}. It did ${damage} damage. \n`
        );
      } else {
        console.log(`${name}'s pokemon ${compPoke[0].name} fainted\n`);
        battleLogData.push(`${name}'s pokemon ${compPoke[0].name} fainted\n`);
      }
    }

    if (hitormiss.flip() === 10) {
      userPoke[0].hp = userPoke[0].hp - 0;
      // console.log(`${name}'s pokemon ${compPoke[0].name} missed. \n`);
      // battleLogData.push(`${name}'s pokemon ${compPoke[0].name} missed. \n`);
      // userHpArray.push(`${name}'s pokemon ${compPoke[0].name} missed. \n`);
    } else {
      const damageTwo = Math.trunc(
        randomCompMovePower.randomMyMove *
          (0.1 + compTierAttack) *
          compTypeWeaknessAndPowerModifier
      );
        // * compTypeStrengthModifier;
      userPoke[0].hp = userPoke[0].hp - damageTwo;
      userHpArray.push(`${userPoke[0].hp}`);
      console.log("recursive", userHpArray);
      if (damageTwo >= 20) {
        // console.log(`${name}'S POKEMON'S ATTACK WAS SUPER EFFECTIVE!\n`);
        // battleLogData.push(`${name}'s Pokemon's attack was SUPER effective!\n`);
        // compHpArray.push(`${name}'s Pokemon's attack was SUPER effective!\n`);
      }
      if (userPoke[0].hp >= 0) {
        console.log(
          `${name}'s pokemon ${compPoke[0].name} used ${randomCompMovePower.randomMoveName}. It did ${damageTwo} damage. \n`
        );
        battleLogData.push(
          `${name}'s pokemon ${compPoke[0].name} used ${randomCompMovePower.randomMoveName}. It did ${damageTwo} damage.\n`
        );
      } else {
        console.log(`Your pokemon ${userPoke[0].name} fainted\n`);
        battleLogData.push(`Your pokemon ${userPoke[0].name} fainted\n`);
      }
    }

    console.log("\n\n");

    startGame(userHpArray, compHpArray);
  }

  function userWon(userHpArray, compHpArray) {
    // console.log("You win!!");
    // console.log(battleLogData);
    compHpArray.push(0);
    userHpArray.push(userPoke[0].hp);
    battleLogData.push("You win!!");
    console.log("function userWon is going off!");
    return {
      result: win,
      battleLogData: battleLogData,
      userHpArray: userHpArray,
      compHpArray: compHpArray,
    };
  }

  function compWon(userHpArray, compHpArray) {
    // console.log("You lose");
    // console.log(battleLogData);
    userHpArray.push(0);
    compHpArray.push(compPoke[0].hp);
    console.log("function userLost is going off!");
    battleLogData.push("You lose");
    return {
      result: lost,
      battleLogData: battleLogData,
      userHpArray: userHpArray,
      compHpArray: compHpArray,
    };
  }

  return startGame(userHpArray, compHpArray); // Start the battle and return the result
}

export default { startBattle };
