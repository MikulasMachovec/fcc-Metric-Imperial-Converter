function ConvertHandler() {

  this.getNum = function(input) {
    let result;
    const numRegex = /^([\d\/\.]+)/;
    const match = input.match(numRegex);
    if(match){
      result=match[1];
      if(result.includes('/')){
        const fraction = result.split("/")
        if (fraction.length > 2){
          return ({ error: "Invalid number"})
        } else {
        result = parseFloat(fraction[0]) / parseFloat(fraction[1]);
        }
      } else {
        result = parseFloat(result.replace(",","."));
      }
    }else{
      result = 1 ;
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    const unitRegex = /([a-zA-Z])+$/;
    let match = input.match(unitRegex);
      if (match){
        result = match[0];
      }else{
        result = "error"
      }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
