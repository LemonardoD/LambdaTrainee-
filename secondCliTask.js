#! /usr/bin/env node

let inquirer = require('inquirer');

const fs=require('fs');


let questions = [
    {
        type:'list',
        name:'Gender',
        message:'Your gender?',
        choices:['male','femail','it'] 
        
    },
    {
        type:'input',
        name:'Age',
        message:'Type ur age!'
            
    },
    
]

inquirer.prompt({
    type:'input',
    name:'UserName',
    message:'Write down ur user name. To cansel just press ENTER: ',
    
    })
    .then((answer1) => {
        let usrname =  JSON.stringify(answer1, null, '') 
    if (answer1.UserName === ''){
        process.exit
    }else{
            inquirer.prompt(questions)
                
                .then((answer2) => {
                    fs.appendFile('primDB.txt', usrname.replace('}',',') + JSON.stringify(answer2, null, '').replace('{','')  , err=>{
                        if(err){
                            console.err;
                            return;
                        }
                        fs.appendFile('primDB.txt', '|',err=>{
                            if(err){
                                console.err;
                                return;
                            }})
                        
                        inquirer.prompt([
                            {
                                type:'list',
                                name:'choice',
                                message:'Do u want to searh someone by his name?',
                                choices:['Y','N'] 
                            }])
                            .then((answer3) => {
                                if (answer3.choice === 'Y'){
                                    inquirer.prompt([
                                        {
                                            type:'input',
                                            name:'srhname',
                                            message:'Type in his name?',
                                        }])
                                        
                                    .then((answer4)=>{
                                        fs.readFile('primDB.txt', 'utf8', function(err, content) { 
                                            if (err) throw err;
                                            let result = content.split('|')
                                            for (let i = 0; i < result.length -1 ; i++  ){
                                                let typo = JSON.parse(result[i])
                                                console.log(typo)
                                                if (answer4.srhname === typo.UserName ){
                                                    console.log(typo)
                                                }else{
                                                    console.log('Sorry, there is no user with such name :c')
                                                };
                                            };
                                        })
                                    })
                                };
                            })
                    })
                })                      
        };
    })


                   
                    
