// import React, { useState } from "react";
const weaknessAndPowerMod = require("./Power&WeaknessPowerModifier");
// const weaknessPowerMod = require("./WeaknessPowerModifier");
// const strengthPowerMod = require("./StrengthPowerModifier");
const moveSelect = require("./MoveSelector");
const hpModify = require("./HPModifier");
const coinflip = require("./CoinFlip");
const hitormiss = require("./HitOrMiss");
// const mercy = require("./Mercy");

var lost = 0;
var win = 1;
var battleLogData = [];

function startBattle(userPokemon, opponentPokemon, opp, gym) {
  // console.log("oppenent pokemon", opponentPokemon.hp);
  // console.log("userpokemon", userPokemon);
  battleLogData = [];
  const userPoke = userPokemon;
  const compPoke = opponentPokemon;
  const name = opp;

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

  userPoke[0].hp = userPoke[0].hp + updateMyHP;
  compPoke[0].hp = compPoke[0].hp + updateCompHP;

  const HorT = coinflip.flip();

  if (HorT === 1 || HorT === 2) {
    startGame();
  }

  function startGame() {
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
      return compWon(); // Return 0 if the opponent wins
    } else if (compPoke[0].hp <= 0) {
      return userWon(); // Return 1 if the user wins
    } else {
      battle();
    }
  }

  function battle() {
    console.log("=========================");

    // console.log(compPoke[0].hp);
    // console.log(userPoke[0].hp);

    if (hitormiss.flip() === 10) {
      compPoke[0].hp = compPoke[0].hp - 0;
      // console.log(
      //   `Your pokemon ${userPoke[0].name} missed. You have ${userPoke[0].hp} hp left! ${name} has ${compPoke[0].hp} hp left!\n`
      // );
      battleLogData.push(
        `Your pokemon ${userPoke[0].name} missed. ${userPoke[0].name} has ${userPoke[0].hp} hp left!  ${compPoke[0].name} has ${compPoke[0].hp} hp left!\n`
      );
    } else {
      const damage =
        Math.trunc(
          randomUserMovePower.randomMyMove * 0.1 * userTypeWeaknessAndPowerModifier
        ) 
        // * userTypeStrengthModifier;
      compPoke[0].hp = compPoke[0].hp - damage;
      if (damage >= 7) {
        console.log("YOUR ATTACK WAS SUPER EFFECTIVE!\n");
        battleLogData.push("Your attack was SUPER effective!\n");
      }
      console.log(
        `Your pokemon ${userPoke[0].name} used ${randomUserMovePower.randomMoveName}. It did ${damage} damage. You have ${userPoke[0].hp} hp left! ${name} has ${compPoke[0].hp} hp left!\n`
      );
      battleLogData.push(
        `Your pokemon ${userPoke[0].name} used ${randomUserMovePower.randomMoveName}. It did ${damage} damage. ${userPoke[0].name} has ${userPoke[0].hp} hp left! ${compPoke[0].name} has ${compPoke[0].hp} hp left!\n`
      );
    }

    if (hitormiss.flip() === 10) {
      userPoke[0].hp = userPoke[0].hp - 0;
      console.log(
        `${name}'s pokemon ${compPoke[0].name} missed. You have ${userPoke[0].hp} hp left! ${name} has ${compPoke[0].hp} hp left!\n`
      );
      battleLogData.push(
        `${name}'s pokemon ${compPoke[0].name} missed. Your ${userPoke[0].name} has ${userPoke[0].hp} hp left! ${compPoke[0].name} has ${compPoke[0].hp} hp left!\n`
      );
    } else {
      const damageTwo =
        Math.trunc(
          randomCompMovePower.randomMyMove * 0.1 * compTypeWeaknessAndPowerModifier
        ) 
        // * compTypeStrengthModifier;
      userPoke[0].hp = userPoke[0].hp - damageTwo;

      if (damageTwo >= 7) {
        console.log(`${name}'S POKEMON'S ATTACK WAS SUPER EFFECTIVE!\n`);
        battleLogData.push(`${name}'s Pokemon's attack was SUPER effective!\n`);
      }
      console.log(
        `${name}'s pokemon ${compPoke[0].name} used ${randomCompMovePower.randomMoveName}. It did ${damageTwo} damage. They have ${compPoke[0].hp} hp left! You have ${userPoke[0].hp} hp left!\n`
      );
      battleLogData.push(
        `${name}'s pokemon ${compPoke[0].name} used ${randomCompMovePower.randomMoveName}. It did ${damageTwo} damage. They have ${compPoke[0].hp} hp left! Your ${userPoke[0].name} has ${userPoke[0].hp} hp left!\n`
      );
    }

    console.log("\n\n");

    startGame();
  }

  function userWon() {
    // console.log("You win!!");
    // console.log(battleLogData);
    battleLogData.push("You win!!");
    console.log("function userWon is going off!");
    return {
      result: win,
      battleLogData: battleLogData,
    };
  }

  function compWon() {
    // console.log("You lose");
    // console.log(battleLogData);
    console.log("function userLost is going off!");
    battleLogData.push("You lose");
    return {
      result: lost,
      battleLogData: battleLogData,
    };
  }

  return startGame(); // Start the battle and return the result
}

export default { startBattle };
