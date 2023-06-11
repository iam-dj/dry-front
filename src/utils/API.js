//for local development
// const URL_PREFIX = "http://localhost:3001";
//deployed
const URL_PREFIX = "https://dry-pokemon-project.herokuapp.com";

const API = {
  login: (userObj) => {
    return fetch(`${URL_PREFIX}/api/users/login`, {
      method: "POST",
      body: JSON.stringify(userObj),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("falied login");
      }
    });
  },

  signup: (userObj) => {
    return fetch(`${URL_PREFIX}/api/users`, {
      method: "POST",
      body: JSON.stringify(userObj),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("falied signup");
      }
    });
  },
  
  verifyToken: (token) => {
    return fetch(`${URL_PREFIX}/api/users/verifytoken`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Bad token");
      }
    });
  },

  createTrainer: (userObj) => {
    return fetch(`${URL_PREFIX}/api/trainers`, {
      method: "POST",
      body: JSON.stringify(userObj),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("falied to create");
      }
    });
  },

  getOneTrainer: (trainerId) => {
    // console.log(trainerId);
    return fetch(`${URL_PREFIX}/api/trainers/${trainerId}`).then((res) =>
      res
        .json()
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        })
    );
  },

  changeMoveOne: (trainerId, pokemonName, newMove) => {
    // console.log(trainerId);
    return fetch(
      `${URL_PREFIX}/api/trainers/${trainerId}/pokemon/${pokemonName}/update-move1/${newMove}`,
      {
        method: "PUT",
      }
    ).then((res) =>
      res
        .json()
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        })
    );
  },   

  changeMoveTwo: (trainerId, pokemonName, newMove) => {
    // console.log(trainerId);
    return fetch(
      `${URL_PREFIX}/api/trainers/${trainerId}/pokemon/${pokemonName}/update-move2/${newMove}`,
      {
        method: "PUT",
      }
    ).then((res) =>
      res
        .json()
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        })
    );
  },

  changeMoveThree: (trainerId, pokemonName, newMove) => {
    // console.log(trainerId);
    return fetch(
      `${URL_PREFIX}/api/trainers/${trainerId}/pokemon/${pokemonName}/update-move3/${newMove}`,
      {
        method: "PUT",
      }
    ).then((res) =>
      res
        .json()
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        })
    );
  },

  changeMoveFour: (trainerId, pokemonName, newMove) => {
    // console.log(trainerId);
    return fetch(
      `${URL_PREFIX}/api/trainers/${trainerId}/pokemon/${pokemonName}/update-move4/${newMove}`,
      {
        method: "PUT",
      }
    ).then((res) =>
      res
        .json()
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        })
    );
  },

  getTrainerTm: (trainerId) => {
    // console.log(trainerId);
    return fetch(`${URL_PREFIX}/api/trainers/${trainerId}/tms`).then((res) =>
      res
        .json()
        .then((data) => {
          console.log(data);
          return data;
        })
        .catch((err) => {
          console.log(err);
        })
    );
  },

  // spin-add/:id
  getAddOneSpin: (trainerId) => {
    return fetch(`${URL_PREFIX}/api/trainers/spin-add/${trainerId}`, {
      method: "PUT",
    }).then((res) =>
      res
        .json()
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        })
    );
  },
  getNumSpins: (trainerId) => {
    // console.log(trainerId);
    return fetch(`${URL_PREFIX}/api/trainers/spinNum/${trainerId}`).then(
      (res) =>
        res
          .json()
          .then((data) => {
            return data;
          })
          .catch((err) => {
            console.log(err);
          })
    );
  },

  getNumWins: (trainerId) => {
    // console.log(trainerId);
    return fetch(`${URL_PREFIX}/api/trainers/numwins/${trainerId}`).then(
      (res) =>
        res
          .json()
          .then((data) => {
            return data;
          })
          .catch((err) => {
            console.log(err);
          })
    );
  },

  getSubtractSpins: (trainerId) => {
    // console.log(trainerId);
    return fetch(`${URL_PREFIX}/api/trainers/${trainerId}/numspins-sub`, {
      method: "PUT",
    }).then((res) =>
      res
        .json()
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        })
    );
  },

  updateMainPokemon: (trainerId, pokemonName) => {
    return fetch(
      `${URL_PREFIX}/api/trainers/${trainerId}/ismain/${pokemonName}`,
      {
        method: "PUT",
      }
    ).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update main Pokemon");
      }
    });
  },

  updatePokemonHp: (trainerId, pokemonName) => {
    return fetch(`${URL_PREFIX}/api/trainers/${trainerId}/hp/${pokemonName}`, {
      method: "PUT",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update Pokemon HP");
        }
      })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
  },

  catchPokemon: (trainerId, pokemonName) => {
    return fetch(
      `${URL_PREFIX}/api/trainers/${trainerId}/iscaught/${pokemonName}`,
      {
        method: "PUT",
      }
    )
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
  },

  getMove: (trainerId, moveName) => {
    return fetch(
      `${URL_PREFIX}/api/trainers/${trainerId}/isnewmove/${moveName}`,
      {
        method: "PUT",
      }
    )
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
  },

  getAllPoke: () => {
    return fetch(`${URL_PREFIX}/api/pokemon`)
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
  },

  getBattlePoke: (trainerId) => {
    return fetch(`${URL_PREFIX}/api/trainers/main/${trainerId}`)
      .then((res) =>
        res.json().then((data) => {
          // Filter the Pokémon array to show only the main Pokémon
          const mainPokemon = data.pokemons.filter((pokemon) => pokemon.isMain);
          return mainPokemon;
        })
      )
      .catch((err) => {
        console.log(err);
      });
  },

  updateWin: (trainerId) => {
    return fetch(`${URL_PREFIX}/api/trainers/${trainerId}/increment-num-wins`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        const { experienceGained, levelChange, hpChange, pokemonNewLevel } =
          data;
        // console.log("API Experience Change:", experienceGained);
        // console.log("API Level Change:", levelChange);
        // console.log("API HP Change:", hpChange);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  updateWinStage1: (trainerId, gymId) => {
    console.log(gymId);
    return fetch(
      `${URL_PREFIX}/api/trainers/${trainerId}/increment-num-wins-stage-1/${gymId}`,
      {
        method: "PUT",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const {
          experienceGained,
          levelChange,
          hpChange,
          gymStageChange,
          pokemonNewLevel,
        } = data;
        console.log("API Experience Change:", experienceGained);
        console.log("API Level Change:", levelChange);
        console.log("API HP Change:", hpChange);
        console.log("API gymStagechange:", gymStageChange);
        console.log("API pokemonNewLevel", pokemonNewLevel);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  updateWinStage2: (trainerId, gymId) => {
    console.log(gymId);
    return fetch(
      `${URL_PREFIX}/api/trainers/${trainerId}/increment-num-wins-stage-2/${gymId}`,
      {
        method: "PUT",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const {
          experienceGained,
          levelChange,
          hpChange,
          gymStageChange,
          pokemonNewLevel,
        } = data;
        console.log("API Experience Change:", experienceGained);
        console.log("API Level Change:", levelChange);
        console.log("API HP Change:", hpChange);
        console.log("API gymStagechange:", gymStageChange);
        console.log("API pokemonNewLevel", pokemonNewLevel);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  updateWinStage3: (trainerId, gymId) => {
    console.log(gymId);
    return fetch(
      `${URL_PREFIX}/api/trainers/${trainerId}/increment-num-wins-stage-3/${gymId}`,
      {
        method: "PUT",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const {
          experienceGained,
          levelChange,
          hpChange,
          gymStageChange,
          pokemonNewLevel,
        } = data;
        console.log("API Experience Change:", experienceGained);
        console.log("API Level Change:", levelChange);
        console.log("API HP Change:", hpChange);
        console.log("API gymStagechange:", gymStageChange);
        console.log("API pokemonNewLevel", pokemonNewLevel);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  updateLoss: (trainerId) => {
    return fetch(`${URL_PREFIX}/api/trainers/${trainerId}/increment-num-loss`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        const { experienceChange, levelChange, hpChange, pokemonNewLevel } =
          data;
        console.log("API Experience Change:", experienceChange);
        console.log("API Level Change:", levelChange);
        console.log("API HP Change:", hpChange);
        console.log("API pokemonNewLevel", pokemonNewLevel);

        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getAllTrainers: () => {
    return fetch(`${URL_PREFIX}/api/trainers`)
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
  },
};

export default API;
