// import React, { useState } from "react";
const weaknessPowerMod = require("./WeaknessPowerModifier");
const strengthPowerMod = require("./StrengthPowerModifier");
const moveSelect = require("./MoveSelector");
const hpModify = require("./HPModifier");
const coinflip = require("./CoinFlip");
const hitormiss = require("./HitOrMiss");
const mercy = require("./Mercy");

var lost = 0;
var win = 1;
var battleLogData = [];

function trackHealth (userPokemon, opponentPokemon, trackOpp, trackme) {
  console.log("oppenent pokemon", opponentPokemon.hp);
  console.log("userpokemon", userPokemon);
  battleLogData = [];
  const userPoke = userPokemon;
  const compPoke = opponentPokemon;
  const name = trackOpp;

  console.log("battle sys check", compPoke.hp);
  console.log("battle sys check", userPoke);
  console.log(trackme);

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

  userPoke[0].hp = userPoke[0].hp + updateMyHP
  compPoke[0].hp = compPoke[0].hp + updateCompHP

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
      return compWon(); // Return 0 if the opponent wins
    } else if (compPoke[0].hp <= 0) {
      return userWon(); // Return 1 if the user wins
    } else {
      battle();
    }
  }

  function battle() {
    trackOpp(compPoke[0].hp);
    trackme(userPoke[0].hp);

    console.log(compPoke[0].hp);
    console.log(userPoke[0].hp);

    if (hitormiss.flip() === 10) {
      compPoke[0].hp = compPoke[0].hp - 0;
      
    } else {
      const damage =
        Math.trunc(
          randomUserMovePower.randomMyMove * 0.1 * userTypeWeaknessModifier
        ) * userTypeStrengthModifier;
      compPoke[0].hp = compPoke[0].hp - damage;
      if (damage >= 7) {
        
      }
     
    }

    if (hitormiss.flip() === 10) {
      userPoke[0].hp = userPoke[0].hp - 0;
      
    } else {
      const damageTwo =
        Math.trunc(
          randomCompMovePower.randomMyMove * 0.1 * compTypeWeaknessModifier
        ) * compTypeStrengthModifier;
      userPoke[0].hp = userPoke[0].hp - damageTwo;

      
      
    }

    console.log("\n\n");

function startGameWithInterval() {
  const interval = setInterval(() => {
    startGame();
  }, 5000);

//   Clear the interval when needed
  clearInterval(interval);
}

startGameWithInterval();
  }

  function userWon() {
    // console.log("You win!!");
    // console.log(battleLogData);
    // battleLogData.push("You win!!");
    // return {
    //   result: win,
    //   battleLogData: battleLogData,
    // };
  }

  function compWon() {
    // console.log("You lose");
    // console.log(battleLogData);
    // battleLogData.push("You lose");
    // return {
    //   result: lost,
    //   battleLogData: battleLogData,
    // };
  }

  return startGame(); // Start the battle and return the result
}

export default { trackHealth  };
