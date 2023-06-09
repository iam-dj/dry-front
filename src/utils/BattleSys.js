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
const mercy = require("./Mercy");

var lost = 0;
var win = 1;
var battleLogData = [];
let userHpArray = [];
let compHpArray = [];
var mercyAttackMod = 0;

function startBattle(userPokemon, opponentPokemon, opp, gym) {
  battleLogData = [];
  const userPoke = userPokemon;
  const compPoke = opponentPokemon;
  const name = opp;
  userHpArray = [];
  compHpArray = [];

  let userTypeWeaknessAndPowerModifier = 0;
  let userTypeStrengthModifier = 0;
  let compTypeWeaknessAndPowerModifier = 0;
  let compTypeStrengthModifier = 0;

  let randomUserMovePower = 0;
  let randomCompMovePower = 0;

  const updateMyHP = hpModify.updateHP(userPoke);
  const updateCompHP = hpModify.updateHP(compPoke);

  const updateMyAttack = myAttackModbylvl.modAttack(userPoke);
  //returns a attack mod to add to the user attack

  const updateCompHPbaseOnlvl =
    npcHealth.modCompHealthBasedOnUserLevel(userPoke);
  //returns a number to add to the comp hp based on user HP

  const myTierAttack = tierAttackMod.tierAttack(userPoke);
  //returns a number to add to damage

  const compTierAttack = tierAttackMod.tierAttack(compPoke);
  //returns a number to add to damage

  const mercyAttackMod = mercy.mercyRule(userPoke, compPoke);

  userPoke[0].hp = userPoke[0].hp + updateMyHP;
  compPoke[0].hp = compPoke[0].hp + updateCompHP + updateCompHPbaseOnlvl;

  const HorT = coinflip.flip();

  if (HorT === 1 || HorT === 2) {
    startGame(userHpArray, compHpArray);
  }

  console.log("starting comp health", compPoke[0].hp);
  console.log("starting user health", userPoke[0].hp);

  function startGame(userHpArray, compHpArray) {
    console.log("starting comp health", compPoke[0].hp);
    console.log("starting user health", userPoke[0].hp);

    randomUserMovePower = moveSelect.randMovePower(userPoke);
    randomCompMovePower = moveSelect.randMovePower(compPoke);

    userTypeWeaknessAndPowerModifier = weaknessAndPowerMod.modifier(
      randomUserMovePower.randomMoveType.toLowerCase(),
      compPoke[0].type.toLowerCase()
    );
    compTypeWeaknessAndPowerModifier = weaknessAndPowerMod.modifier(
      randomCompMovePower.randomMoveType.toLowerCase(),
      userPoke[0].type.toLowerCase()
    );

    if (userPoke[0].hp <= 0) {
      return compWon(userHpArray, compHpArray); // Return 0 if the opponent wins
    } else if (compPoke[0].hp <= 0) {
      return userWon(userHpArray, compHpArray); // Return 1 if the user wins
    } else {
      battle(userHpArray, compHpArray);
    }
  }

  function battle(userHpArray, compHpArray) {
    if (hitormiss.flip() === 10) {
      compPoke[0].hp = compPoke[0].hp - 0;
      console.log(`You missed. Your HP left ${userPoke[0].hp}\n`);
      battleLogData.push(`Your pokemon ${userPoke[0].name} missed. \n`);
      compHpArray.push(`Your pokemon ${userPoke[0].name} missed. \n`);
    } else {
      const damage = Math.trunc(
        randomUserMovePower.randomMyMove *
          (0.1 + updateMyAttack + myTierAttack) *
          userTypeWeaknessAndPowerModifier
      );

      compPoke[0].hp = compPoke[0].hp - damage;

      compHpArray.push(`${compPoke[0].hp}`);

      if (damage > randomUserMovePower.randomMyMove * 0.6) {
        console.log("YOUR ATTACK WAS SUPER EFFECTIVE!\n");
        battleLogData.push("Your attack was SUPER effective!\n");
        compHpArray.push("Your attack was SUPER effective!\n");
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
        return userWon(userHpArray, compHpArray);
      }
    }

    if (hitormiss.flip() === 10) {
      userPoke[0].hp = userPoke[0].hp - 0;
      console.log(`${name}'s pokemon ${compPoke[0].name} missed. \n`);
      battleLogData.push(`${name}'s pokemon ${compPoke[0].name} missed. \n`);
      userHpArray.push(`${name}'s pokemon ${compPoke[0].name} missed. \n`);
    } else {
      const damageTwo = Math.trunc(
        randomCompMovePower.randomMyMove *
          (0.1 + compTierAttack + mercyAttackMod) *
          compTypeWeaknessAndPowerModifier
      );
      userPoke[0].hp = userPoke[0].hp - damageTwo;
      userHpArray.push(`${userPoke[0].hp}`);
      // console.log("recursive", userHpArray);

      if (damageTwo > randomCompMovePower.randomMyMove * 0.6) {
        console.log(`${name}'S POKEMON'S ATTACK WAS SUPER EFFECTIVE!\n`);
        battleLogData.push(`${name}'s Pokemon's attack was SUPER effective!\n`);
        compHpArray.push(`${name}'s Pokemon's attack was SUPER effective!\n`);
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
        return compWon(userHpArray, compHpArray);
      }
    }

    console.log("\n\n");

    startGame(userHpArray, compHpArray);
  }

  function userWon(userHpArray, compHpArray) {
    compHpArray.push(0);
    userHpArray.push(userPoke[0].hp);
    battleLogData.push("You win!!");
    return {
      result: win,
      battleLogData: battleLogData,
      userHpArray: userHpArray,
      compHpArray: compHpArray,
    };
  }

  function compWon(userHpArray, compHpArray) {
    userHpArray.push(0);
    compHpArray.push(compPoke[0].hp);
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
