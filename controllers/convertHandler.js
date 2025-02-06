function ConvertHandler() {

  this.getNum = function(input) {
    let result;
    const numRegex = /^([\d\.\/]+)/;
    const match = input.match(numRegex);

    // If no match is found, return a special result to indicate invalid number
    if (match) {
        result = match[1];

        if (result.includes('/')) {
            const fraction = result.split("/");

            if (fraction.length !== 2) {
                throw new Error("invalid number");
            }

            const numerator = parseFloat(fraction[0]);
            const denominator = parseFloat(fraction[1]);

            if (isNaN(numerator) || isNaN(denominator)) {
                throw new Error("invalid number");
            }

            result = numerator / denominator;
        } else {
            result = parseFloat(result);
        }
    } else {
        result = 1; 
    }

    if (isNaN(result)) {
        throw new Error("invalid number");
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
        throw new Error("invalid unit");
      }

      if (result === 'l' || result === 'L'){
          result = result.toUpperCase();
        } else {
          result = result.toLowerCase();
      }
    const validResult = ['gal', 'L', 'kg', 'lbs', 'mi', 'km']
      if (!validResult.includes(result)){
        throw new Error("invalid unit")
      }



    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch(initUnit) {
      case 'gal' :
        result = 'L';
        break;
      case 'L' :
        result = 'gal';
        break;
      case 'lbs' :
        result = 'kg';
        break;
      case 'kg' :
        result = 'lbs';
        break;
      case 'mi' :
        result = 'km';
        break;
      case 'km' :
        result = 'mi';
        break;
      default:
        throw new Error("invalid unit");
    }

    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    const unitMap = {
      "gal" : "galons",
      "L"   : "Liters",
      "lbs" : "pounds",
      "kg"  : "kilograms",
      "mi"  : "miles",
      "km"  : "kilometers"
    }
    if(unitMap[unit]){
      result = unitMap[unit];
    }else{
      throw new Error("invalid unit")
    }

    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    let decimal = 100000;
    let conNum;

    switch(initUnit) {
      case 'gal' :
       conNum = initNum * galToL;
       result = Math.round(conNum * decimal) / decimal;
        break;
      case 'L' :
        conNum = initNum / galToL;
        result = Math.round(conNum * decimal) / decimal;
        break;
      case 'lbs' :
        conNum = initNum * lbsToKg;
        result = Math.round(conNum * decimal) / decimal;
        break;
      case 'kg' :
        conNum = initNum / lbsToKg;
        result = Math.round(conNum * decimal) / decimal;
        break;
      case 'mi' :
        conNum = initNum * miToKm;
        result = Math.round(conNum * decimal) / decimal;
        break;
      case 'km' :
        conNum = initNum / miToKm;
        result = Math.round(conNum * decimal) / decimal;
        break;
      default:
        throw new Error("invalid unit");
    }
    console.log(result)
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
