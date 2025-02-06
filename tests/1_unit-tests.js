const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('Function convertHandler.getNum(input)', function(){
        
        test('Whole number input', function() {
            assert.strictEqual(convertHandler.getNum("5kg"), 5);
        });

        test('Decimal number input', function(){
            assert.strictEqual(convertHandler.getNum("5.1kg"), 5.1)
        })
        
        test('Fraction number input', function(){
            assert.strictEqual(convertHandler.getNum("5/2L"), 2.5)
        })
        
        test('Fraction number with decimal input', function(){
            assert.strictEqual(convertHandler.getNum("5.1/2kg"), 2.55)
        })

        test('Double fraction should return invalid number', function() {
            assert.throws(() => convertHandler.getNum("3/2/2kg"), Error, "invalid number");
        });
        
        test('Default input', function(){
            assert.strictEqual(convertHandler.getNum("l"), 1)
        })
        
    })

    suite('Function convertHandler.getUnit(input)', function(){

        test('Correct unit reading', function() {
            assert.strictEqual(convertHandler.getUnit("5kg"), "kg");
        });

        test('Unit corvension', function() {
            assert.strictEqual(convertHandler.getReturnUnit("kg"), "lbs");
        });
        
        test('Liters letter upper case ', function() {
            assert.strictEqual(convertHandler.getUnit("5l"), "L");
            assert.strictEqual(convertHandler.getUnit("5L"), "L");
        });

        test('Invalid unit input', function(){
            assert.throws(() =>convertHandler.getUnit("kgg"),Error, "invalid unit")
        })

        test('Only unit input', function(){
            assert.strictEqual(convertHandler.getUnit("kg"), "kg");
        })
    })

    suite('Function convertHandler.getReturnUnit(initUnit)', function(){

        test('Correct unit reading', function() {
            assert.strictEqual(convertHandler.getReturnUnit("kg"), "lbs");
            assert.strictEqual(convertHandler.getReturnUnit("lbs"), "kg");
            assert.strictEqual(convertHandler.getReturnUnit("gal"), "L");
            assert.strictEqual(convertHandler.getReturnUnit("L"), "gal");
            assert.strictEqual(convertHandler.getReturnUnit("mi"), "km");
            assert.strictEqual(convertHandler.getReturnUnit("km"), "mi");
        });

        test('Invalid unit input', function() {
            assert.throws(()=> convertHandler.getReturnUnit("g"), Error, "invalid unit");
        });
       
    })

    suite('Function convertHandler.spellOutUnit(initUnit)', function(){
        
        test('Correct unit spellOut', function() {
            assert.strictEqual(convertHandler.spellOutUnit("kg"), "kilograms")
            assert.strictEqual(convertHandler.spellOutUnit("lbs"), "pounds")
            assert.strictEqual(convertHandler.spellOutUnit("L"), "Liters")
            assert.strictEqual(convertHandler.spellOutUnit("gal"), "galons")
            assert.strictEqual(convertHandler.spellOutUnit("mi"), "miles")
            assert.strictEqual(convertHandler.spellOutUnit("km"), "kilometers")
        })

        test('Invalid unit spellOut', function() {
            assert.throws(()=> convertHandler.spellOutUnit('g', Error, "invalid unit"))
        })
    })

    suite('Function convertHandler.convert(initNum, initUnit)', function(){
        
        test('Convert convert functionality', function(){
            const tolerance = 0.00001
            assert.closeTo(convertHandler.convert(1 ,"kg"), 2.20462, tolerance)
            assert.closeTo(convertHandler.convert(10 ,"lbs"), 4.53592, tolerance)
            assert.closeTo(convertHandler.convert(1, "L"), 0.26417, tolerance)
            assert.closeTo(convertHandler.convert(5, "gal"), 18.92705, tolerance)
            assert.closeTo(convertHandler.convert(10, "mi"), 16.0934, tolerance)
            assert.closeTo(convertHandler.convert( 1, "km"), 0.62137, tolerance)
        })
    })
});