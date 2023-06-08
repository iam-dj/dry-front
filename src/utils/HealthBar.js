// import React, { useState } from "react";
const weaknessPowerMod = require("./WeaknessPowerModifier");
const strengthPowerMod = require("./StrengthPowerModifier");
const moveSelect = require("./MoveSelector");
const hpModify = require("./HPModifier");
const coinflip = require("./CoinFlip");
const hitormiss = require("./HitOrMiss");

// const mercy = require("./Mercy");

// var lost = 0;
// var win = 1;
var battleLogData = [];

let userHpArray = [];
let compHpArray = [];

function trackHealth(
  userPokemon,
  opponentPokemon,
  setNPCHealth, //Starting Opponent Health
  setTrainerHealth,
  setNPCDamage,
  setMyDamage
) {
  console.log("oppenent pokemon", opponentPokemon.hp);
  console.log("userpokemon", userPokemon);
  battleLogData = [];
  userHpArray = [];
  compHpArray = [];
  const userPoke = userPokemon;
  const compPoke = opponentPokemon;
  // const name = trackOpp;

  console.log("battle sys check", compPoke);
  console.log("battle sys check", userPoke);
  console.log(setTrainerHealth);

  let userTypeWeaknessModifier = 0;
  let userTypeStrengthModifier = 0;
  let compTypeWeaknessModifier = 0;
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

  compHpArray.push(compPoke[0].hp);
  userHpArray.push(userPoke[0].hp);

  const startHpMe = userPoke[0].hp;
  const startHpComp = compPoke[0].hp;

  // setNPCHealth(compPoke[0].hp);
  // setTrainerHealth(userPoke[0].hp);

  const HorT = coinflip.flip();

  if (HorT === 1 || HorT === 2) {
    startGame(userHpArray, compHpArray);
  }

  function startGame(userHpArray, compHpArray) {
    // userHpArray = [];
    // compHpArray = [];

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
      console.log("health bar user array", userHpArray);
      return compWon(userHpArray, compHpArray); // Return 0 if the opponent wins
    } else if (compPoke[0].hp <= 0) {
      console.log("health bar comp array", compHpArray);
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
    } else {
      const damage =
        Math.trunc(
          randomUserMovePower.randomMyMove * 0.1 * userTypeWeaknessModifier
        ) * userTypeStrengthModifier;
      compPoke[0].hp = compPoke[0].hp - damage;
      console.log("compHP after damage", compPoke[0].hp);
      // compHpArray.push(`user damage was ${damage}`);
      compHpArray.push(compPoke[0].hp);
      console.log("recursive", compHpArray);
    }

    if (hitormiss.flip() === 10) {
      userPoke[0].hp = userPoke[0].hp - 0;
    } else {
      const damageTwo =
        Math.trunc(
          randomCompMovePower.randomMyMove * 0.1 * compTypeWeaknessModifier
        ) * compTypeStrengthModifier;
      userPoke[0].hp = userPoke[0].hp - damageTwo;
      console.log("userHP after damage", userPoke[0].hp);
      // userHpArray.push(`npc damage was ${damageTwo}`);
      userHpArray.push(userPoke[0].hp);

      console.log("recursive", userHpArray);
    }

    console.log("\n\n");

    startGame(userHpArray, compHpArray);
  }

  function userWon(userHpArray, compHpArray) {
    // console.log("You win!!");
    // console.log(battleLogData);
    // battleLogData.push("You win!!");
    return {
      userHpArray: userHpArray,
      compHpArray: compHpArray,
    };
  }

  function compWon(userHpArray, compHpArray) {
    // console.log("You lose");
    // console.log(battleLogData);
    // battleLogData.push("You lose");
    return {
      userHpArray: userHpArray,
      compHpArray: compHpArray,
    };
  }

  return startGame(userHpArray, compHpArray); // Start the battle and return the result
}

export default { trackHealth };
