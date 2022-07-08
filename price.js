#! /usr/bin/env node

function priceCheck(letters, language, docktype,){
    let doc = ['doc', 'docx', 'rtf'];
    let ratio = 0;
    let price = 0;
    if (letters < 1000){
        letters = 1000
        
    };
    if(!doc.includes(docktype)){
        ratio = 0.2 
    };
    if (language === 'en'){
        price = 0.12
    }else if (language === 'ua' || language === 'ru'){
        price = 0.05
    };
    let res = (letters * price) + ((letters * price)* ratio);
    console.log(`Сумма заказа составляет: ${Math.floor(res)}`);
    return Math.floor(res)
}

module.exports = priceCheck;
