//for local development
const URL_PREFIX = "http://localhost:3001";
//deployed
// const URL_PREFIX = "";

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
    console.log(trainerId);
    return fetch(`${URL_PREFIX}/api/trainers/${trainerId}`).then((res) =>
      res
        .json()
        .then((data) => {
          // if (res.ok) {
          //   res.json();
          //   console.log(data);
          //   return data;
          // } else {
          //   throw new Error("falied to fetch trainer " + trainerId);
          // }
          console.log(data);
          return data;
        })
        .catch((err) => {
          console.log(err);
        })
    );
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
