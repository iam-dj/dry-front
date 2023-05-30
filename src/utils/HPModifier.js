
function updateHP(pokemon) {
    
    if (pokemon[0].tier == 3){
        return 100; 
    } 
    else if (pokemon[0].tier == 2){
        return 50; 
    } 
    else {
        return 1; 

    } 
    
    
    
}
    
    
    
    
    module.exports = {
        updateHP,
      };
    
    