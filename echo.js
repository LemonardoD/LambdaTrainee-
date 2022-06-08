#! /usr/bin/env node

const TelegramBot = require('node-telegram-bot-api');
//bot token
const token = '5515496224:AAFWnMiNlGkxXTt7egHaJzk5dTOpzdrVS9w';

const bot = new TelegramBot(token, {polling: true});

const axios = require('axios').default;

const fs=require('fs');

bot.onText(/\/start/, (msg) => {
    
    bot.sendMessage(msg.chat.id, `Вы написали:${ msg.text }`); 
    console.log(msg.text)
});

bot.on('message', (msg) => {
    if(msg.text === 'photo'){
        axios({
            method: 'get',
            url: 'https://picsum.photos/200/300',
            responseType: 'stream'
          })
            .then(function (response) {
              response.data.pipe(fs.createWriteStream('img.jpg'))
            });
        bot.sendPhoto(msg.chat.id, 'img.jpg' );
        if(msg.from.first_name == undefined || msg.from.last_name == undefined){
            console.log(`Пользователь ${ msg.from.username } запросил картинку.`)
        }else{
            console.log(`Пользователь ${ msg.from.first_name } ${ msg.from.last_name } запросил картинку.`)
        }

    }else{
        bot.sendMessage(msg.chat.id, `Вы написали: "${ msg.text }"`);
    if(msg.from.first_name == undefined || msg.from.last_name == undefined){
        console.log(`Пользователь ${ msg.from.username } написал: "${ msg.text }".`)
    }else{
        console.log(`Пользователь ${ msg.from.first_name } ${ msg.from.last_name } написал: "${ msg.text }". `)
    }
    }
    
});

console.log('Telegram bot is on now...')