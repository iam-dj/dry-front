import API from "./API";

export async function updateWins(arg) {
  try {
    const data = await API.updateWin(arg);
    // Process the data as needed
    console.log("new win:", data);
  } catch (error) {
    console.log(error);
  }
}
