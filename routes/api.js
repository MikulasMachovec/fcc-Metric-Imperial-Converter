'use strict';

const expect = require('chai').expect;
const { application } = require('express');
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const inputQuery = req.query.input;
    
    try {
        if (!inputQuery) {
            throw new Error("Input query is required.");
        }

        let initNum;
        let initUnit;

        // Validate the number part
        try {
            initNum = convertHandler.getNum(inputQuery); // First validate number
         } catch (error) {
            initNum = null; // Indicate invalid number
        }

        // Validate the unit part
        try {
            initUnit = convertHandler.getUnit(inputQuery); // Then validate unit
         } catch (error) {
            initUnit = null; // Indicate invalid unit
        }

        if (initNum === null && initUnit === null) {
            throw new Error("invalid number and unit");
        }

        if (initNum === null) {
            throw new Error("invalid number");
        }
        if (initUnit === null) {
            throw new Error("invalid unit");
        }


        let returnNum = convertHandler.convert(initNum, initUnit); 
        let returnUnit = convertHandler.getReturnUnit(initUnit); 
        console.log(convertHandler.spellOutUnit(initUnit))
        console.log(convertHandler.spellOutUnit(returnUnit))
        // Return the results
        res.json({
            initNum: initNum,
            initUnit: initUnit,
            returnNum: returnNum,
            returnUnit: returnUnit
        });

    } catch (error) {
        res.json( error.message);
    }
});

};
