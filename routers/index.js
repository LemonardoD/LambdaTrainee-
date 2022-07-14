#! /usr/bin/env node

const express = require('express');
const router = express.Router();
const fs = require('fs');

function int2ip (num) {
  return ((num>>>24)+'.'+(num>>16 & 255)+'.'+(num>>8 & 255)+'.'+(num & 255) )
};

function ip2int(ip){
  return ip.split`.`.reduce((int, value) => int * 256 + +value)
};

function ipKnower(req, res, next){
  fs.readFile('db.CSV', 'utf8', function(err, content) { 
    if (err) throw err;
    let ip = ip2int(req.ip);
    let information = content.split('\r\n');
    information.forEach(name =>  {
        let data = name.replaceAll('"','').split(',');
        let num1 = Number(data[0]);
        let num2 = Number(data[1]);
        next();
        if (num1 <= ip &&  ip <= num2){
          return res.json({
            "Your IP adress": ip,
            "Range of IP":[int2ip(num1), int2ip(num2)],
            "Country": data[3]
          }) 
        }
      })
  })  
};

router.get('/',ipKnower,(req, res)=>{
});

module.exports = router;