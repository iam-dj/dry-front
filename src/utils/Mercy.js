
function mercyRule(myPokemon,opponPokemon) {

    const levelDifference = myPokemon[0].level - opponPokemon[0].level;

    if (levelDifference >= 10 && levelDifference <= 90) {
        for (let i = 10; i <= 90; i += 10) {
          if (levelDifference <= i) {
            return i / 200; 
          }
        }
      }
      
      // If the level difference is outside the specified range, return a default value
      return 0;
    
    
    
}
    
    
    
    
    module.exports = {
        mercyRule,
      };
    
    