#! /usr/bin/env node
const fs = require('fs');

function uniqValues(folder){
    let fileNames = fs.readdirSync(folder);
    let result = []
    fileNames.forEach(name => {
        let data = fs.readFileSync(folder + '/' +name, 'utf8')
        data = data.toString().split('\n')
        for(name of data){
            result.push(`{"name":"${name}"}`)
        }
    })
    let unique = Array.from(new Set(result)).map(item => JSON.parse(item));

    console.log(`Количество уникальных юзернеймов: ${unique.length}`)
    var time = performance.now()
    console.log(`Ушло секунд на код: ${(time / 1000).toFixed(4)}`)
 
}



function existInEveryFolder(folder){
    let fileNames = fs.readdirSync(folder);  
    let result =[];
    fileNames.forEach(name => {
            let data = fs.readFileSync(folder + '/' +name, 'utf8')
            let othNames = [...new Set(data.toString().split('\n'))]
            result.push(othNames)
        });
    let allNames = result.flat()
    let countItems = allNames.reduce((dt, item) => {
        dt[item] = dt[item] ? dt[item] + 1 : 1; 
        return dt;
    }, {});
    function isEnough(value) {
        return value === 20
      };
    let num = Object.values(countItems).filter(isEnough);

    console.log(`Количество юзернеймов встречаются во всех 20 файлах: ${num.length}`);
    var time = performance.now();
    console.log(`Ушло ceкунд на код: ${(time / 1000).toFixed(2)}`);    

}               



function existAlmostInEveryFolder(folder){
    let fileNames = fs.readdirSync(folder);  
    let result =[];
    fileNames.forEach(name => {
            let data = fs.readFileSync(folder + '/' +name, 'utf8')
            let othNames = [...new Set(data.toString().split('\n'))]
            result.push(othNames)
        });
    let allNames = result.flat()
    let countItems = allNames.reduce((dt, item) => {
        dt[item] = dt[item] ? dt[item] + 1 : 1; 
        return dt;
    }, {});
    function isEnough(value) {
        return value >= 10
      };
    let num = Object.values(countItems).filter(isEnough);

    console.log(`Количество юзернеймов встречаются в 10 и более файлах: ${num.length}`);
    var time = performance.now();
    console.log(`Ушло ceкунд на код: ${(time / 1000).toFixed(2)}`);    

}               



