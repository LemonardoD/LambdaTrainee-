#! /usr/bin/env node

const TelegramBot = require('node-telegram-bot-api');
//bot token
const token = '5515496224:AAFWnMiNlGkxXTt7egHaJzk5dTOpzdrVS9w';

const bot = new TelegramBot(token, {polling: true});


const { program }  = require('commander');

const fs=require('fs');
const { exit } = require('process');


program.version('0.0.1');


//Commands
bot.onText(/\/start/, (msg) => {
    fs.writeFile('id.txt', msg.chat.id.toString(), err=>{
        if (err) throw err;
    })
     
});

bot.onText(/\/help/, (msg) => {
    chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Тут важный текст, о том как пользоваться ботом!');
});

const commandText = (text) => {
    function sendMess(){fs.readFile('id.txt', 'utf8', function(err,  fileId) { 
        if (err) throw err;
        let id = Number(fileId)
        bot.sendMessage(id, text)

        }
    )};
    setTimeout(sendMess, 150)
    
};
const commandPhoto = (photo)=> {
    function sendPh(){fs.readFile('id.txt', 'utf8', function(err,  fileId) { 
        if (err) throw err;
        let id = Number(fileId)
        bot.sendPhoto(id, photo)
        }
    )};
    setTimeout(sendPh, 150)
    
};
setTimeout(exit, 700)
program
.command('message')
.description('Send ur message to TB')
.argument('<message>')
.alias('m')
.action(commandText)
program
.command('photo')
.description('Send ur photo to TB')
.argument('<path>')
.alias('p')
.action(commandPhoto)
program.parse()


