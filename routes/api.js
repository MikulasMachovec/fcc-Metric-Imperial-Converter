'use strict';

const expect = require('chai').expect;
const { application } = require('express');
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req,res)=>{
    const inputQuery = req.query.input;
    const regex = /^([\d]+(?:[\/,\.][\d]+)?)([a-zA-Z]+)$/;
    const regexUnit = /^[a-zA-Z]+$/
    let value = convertHandler.getNum(inputQuery);
    let unit = convertHandler.getUnit(inputQuery)
    res.json({ value: value, unit: unit }) 
  })
};
