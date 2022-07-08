#! /usr/bin/env node

const timeCheck = require('./time')
const priceCheck = require('./price')

function totalReturn(letters, language, docktype){

    let doc = ['doc', 'docx', 'rtf'];
    let ratio = 0;
    let endTime = 0;
    if(!doc.includes(docktype)){
        ratio = 0.2 
    };
    if (language === 'en' && letters <= 333){
        endTime = 60
    }else if(language === 'en' && letters > 333){
        endTime = (letters/ (333/60)) + 30
    };
    if(language === 'ua' && letters <= 1333 || language === 'ru' && letters <= 1333){
        endTime = 60
    }else if (language === 'ua' && letters > 1333 || language === 'ru' && letters > 1333){
        endTime = (letters/ (1333/60)) + 30
    };
    
    let res = endTime + (endTime* ratio);
    timeCheck(Math.floor(res)), priceCheck(letters, language, docktype);
    return Number(res.toFixed(2))
}

module.exports = totalReturn;
