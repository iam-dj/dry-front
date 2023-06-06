
function mercyRule(myPokemon,opponPokemon) {
    
    if (myPokemon[0].hp < opponPokemon[0].hp){
        // const hpShare = 1-(myPokemon[0].hp / opponPokemon[0].hp ) 
        return .069;
    } 
    else {
        return 0; 
    } 
    
    
    
}
    
    
    
    
    module.exports = {
        mercyRule,
      };
    
    