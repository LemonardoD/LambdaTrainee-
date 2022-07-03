#! /usr/bin/env node

const axios = require('axios');

const urls = [
  'https://jsonbase.com/lambdajson_type1/793','https://jsonbase.com/lambdajson_type1/955',
  'https://jsonbase.com/lambdajson_type1/231','https://jsonbase.com/lambdajson_type1/931',
  'https://jsonbase.com/lambdajson_type1/93', 'https://jsonbase.com/lambdajson_type2/342',
  'https://jsonbase.com/lambdajson_type2/770','https://jsonbase.com/lambdajson_type2/491',
  'https://jsonbase.com/lambdajson_type2/281','https://jsonbase.com/lambdajson_type2/718',
  'https://jsonbase.com/lambdajson_type3/310','https://jsonbase.com/lambdajson_type3/806',
  'https://jsonbase.com/lambdajson_type3/469','https://jsonbase.com/lambdajson_type3/258',
  'https://jsonbase.com/lambdajson_type3/516','https://jsonbase.com/lambdajson_type4/79',
  'https://jsonbase.com/lambdajson_type4/706','https://jsonbase.com/lambdajson_type4/521',
  'https://jsonbase.com/lambdajson_type4/350','https://jsonbase.com/lambdajson_type4/64',
]




async function getJson(){
  let truecount = 0;
  let falsecount= 0;
  
  for(one of urls ){
    let tries = 0
    while(tries < 3){
      try{
        let request = await axios.get(one);
        let info = request.data;
        if(Object.keys(info).includes('isDone')){
          if(info.isDone){
            truecount++
          }else{
            falsecount++
            }}else{
          for(el of Object.values(info)){
            if(Object.keys(el).includes('isDone')){
              if(el.isDone){
                truecount++
                }else{
                  falsecount++
                }
              }
            }
          }
        tries = 3
        }catch(error){
          tries++
          console.log(error.code)
        }
      
      }
  }
console.log(`Значений True: ${truecount}\nЗначений False: ${falsecount}`);
}   

getJson()   