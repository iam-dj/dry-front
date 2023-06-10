
function tierAttack(pokemon) {
    
    if (pokemon[0].tier == 3){
        return .075; 
    } 
    else if (pokemon[0].tier == 2){
        return .055; 
    } 
    else {
        return .021; 

    } 
    
    
    
}
    
    
    
    
    module.exports = {
        tierAttack,
      };
    
    