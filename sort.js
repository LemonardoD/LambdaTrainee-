#! /usr/bin/env node

var readline = require('readline');
const { PassThrough } = require('stream');
const { isNumber } = require('util');

var rl = readline.createInterface(
    {
        input:process.stdin,
        output: process.stdout

});
let result = {
    sort: '',
    text : []
};

rl.question('Type any words or digits, but separate them by whitespaces: ', function(data) {
    result.text = data.split(' ');

    rl.setPrompt('How did u want to sort it?\n1 - Sort words in order from A to Z, \n2 - Sort digits from max to min, \n3 - Sort digits from min to max, \n4 - Sort words by quantity of letters, \n5 - Only uniq words, \n6 - Only uniq words and digits.\nSelect number from 1 to 6: ');
    rl.prompt();

    rl.on('line', function(sorting) {
        result.sort = sorting
        if(result.sort.toLocaleLowerCase().trim() != 'exit'){
            rl.setPrompt('How did u want to sort it?\n1 - Sort words in order from A to Z, \n2 - Sort digits from max to min, \n3 - Sort digits from min to max, \n4 - Sort words by quantity of letters, \n5 - Only uniq words, \n6 - Only uniq words and digits.\nSelect number from 1 to 6(type"exit" if u want end it): ');
           
            rl.prompt();
            if (result.sort === '1'){
                let words = [] 

                for (let i = 0; i < result.text.length; i++) {
                    if (!!result.text[i].trim() && result.text[i]*0==0){
                        PassThrough
                    }else{
                        words.push(result.text[i])
                    }
                }
                console.log(words.sort())
            }else if (result.sort === '2'){
                let digits = [] 
                for (let i = 0; i < result.text.length; i++) {
                    if (!!result.text[i].trim() && result.text[i]*0==0){
                        digits.push(result.text[i])
                    }
                }
                console.log(digits.sort((a,b)=>a-b))
            }else if (result.sort === '3'){
                let digits = [] 
                for (let i = 0; i < result.text.length; i++) {
                    if (!!result.text[i].trim() && result.text[i]*0==0){
                        digits.push(result.text[i])
                    }
                }
                console.log(digits.sort((a,b)=>a-b).reverse())
            }else if (result.sort === '4'){
                console.log(result.text.sort((a,b) => (a.length > b.length) ? 1 : ((b.length > a.length) ? -1 : 0)))
            }else if (result.sort === '5'){
                let words = [] 

                for (let i = 0; i < result.text.length; i++) {
                    if (!!result.text[i].trim() && result.text[i]*0==0){
                        PassThrough
                    }else{
                        words.push(result.text[i])
                    }
                }
                let uniq = new Set(words)
                console.log(uniq)
            }else if (result.sort === '6'){
                let uniq = new Set(result.text)
                console.log(uniq)
            }
      
        }else {
            rl.close()
            }
    })
})