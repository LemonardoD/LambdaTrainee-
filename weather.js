#! /usr/bin/env node

const axios = require('axios').default;

const fs=require('fs');

const TelegramBot = require('node-telegram-bot-api');

const token = '5580659522:AAF2VfEpn9rHEOww0GciL0K8OsZP2MjDivs';

const bot = new TelegramBot(token, {polling: true});
function getUsd(){axios({
  method: 'get',
  url: 'https://api.monobank.ua/bank/currency',
  responseType: 'json'
    })
  .then(function(usdRes){
    const findCurrency = usdRes.data.find((cur)=>{
      return cur.currencyCodeA === 840 })
    fs.writeFile('usd.txt',findCurrency.rateBuy+","+findCurrency.rateSell , err=>{
      if (err) throw err;
      })
  })
};
function getEurPB(){axios({
  method: 'get',
  url: ' https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',
  responseType: 'json'
    })
  .then(function(eurRes){
    const findCurrency = eurRes.data.find((cur)=>{
      return cur.ccy === 'EUR' })
    fs.writeFile('eur.txt',findCurrency.buy +","+findCurrency.sale , err=>{
      if (err) throw err;
      })
  })
};

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const opts = {
      reply_markup: {
          keyboard: [["Погода Токио, интервал 3 часа?", "Погода Токио, интервал 6 часов?"],   ["USD", "EUR"]]
          }
      };
      getUsd()
      getEurPB()
      

    bot.sendMessage(chatId,"Доброго времени суток! Даный бот будет показывать погоду в Токио, но интерфейс на русском(странно, да?)\n Выбрать интервал можно в закрепленном снизу меню.",opts);
    });
     


bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if(msg.text === "Погода Токио, интервал 3 часа?"){
      axios({
        method: 'get',
        url: 'https://api.openweathermap.org/data/2.5/forecast?',
        responseType: 'json',
        params: {
          lat:35.652832,
          lon:139.839478,
          appid:'bfa50961106077c387be33537862d333',
          units:'metric',
          mode:'json',
          cnt: 7 , 
          lang:'ua'
        },
      })
        .then(async function (response1) {
          var today = new Date()
          for await (let dt of response1.data.list){
            if(new Date(dt.dt_txt).getDate() === today.getDate() ){
              let time =  new Date(dt.dt_txt).getHours()
              let options = { weekday: 'long'}
              let  day =  new Intl.DateTimeFormat('ru-RU', options).format(new Date(dt.dt_txt))
              let dayN = new Date(dt.dt_txt).getDate()
              let namemonth = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря",]
              let mnth =  new Date(dt.dt_txt).getMonth()
              let temp = Number(dt.main.temp)
              let feels = Number(dt.main.feels_like)
              let des = dt.weather[0].description
  
              await bot.sendMessage(chatId,`${day}, ${dayN}-e ${namemonth[mnth]} ${time}.00: \n+${temp.toFixed(0)}°C, ощущается как +${feels.toFixed(0)} °C, ${des}`)
              
            }
        }
        })
        .catch(function (error) {
          console.log(error);
        })
        
    }else if(msg.text === "Погода Токио, интервал 6 часов?"){
      axios({
        method: 'get',
        url: 'https://api.openweathermap.org/data/2.5/forecast?',
        responseType: 'json',
        params: {
          lat:35.652832,
          lon:139.839478,
          appid:'bfa50961106077c387be33537862d333',
          units:'metric',
          mode:'json',
          cnt: 7 , 
          lang:'ua'
        },
      })
        .then(async function (response2) {
        for await (let inf of  response2.data.list){
          var today = new Date()
          if(new Date(inf.dt_txt).getDate() === today.getDate() ){
            let time = new Date(inf.dt_txt).getHours()
            let options = { weekday: 'long'}
            let day = new Intl.DateTimeFormat('ru-RU', options).format(new Date(inf.dt_txt))
            let dayN = new Date(inf.dt_txt).getDate()
            let namemonth = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря",]
            let mnth = new Date(inf.dt_txt).getMonth()
            let temp = Number(inf.main.temp)
            let feels = Number(inf.main.feels_like)
            let des = inf.weather[0].description
            if(time === 6 || time === 12 || time === 18 ||time === 21){
              bot.sendMessage(chatId,`${day}, ${dayN}-e ${namemonth[mnth]} ${time}.00: \n+${temp.toFixed(0)}°C, ощущается как +${feels.toFixed(0)} °C, ${des}`)
            }
          }
        }
        })
        .catch(function (error) {
          console.log(error);
        })
    }else if(msg.text === 'USD') {
      setInterval(getUsd, 43200000)
        fs.readFile('usd.txt', 'utf8', function(err, content) { 
          if (err) throw err;
          let usd = content.split(",")
          bot.sendMessage(chatId,`Валюта: USD\nПокупка: ${usd[0]} \nПродажа: ${usd[1]}`)
        })
    }else if(msg.text === 'EUR') {
      setInterval(getEurPB, 43200000)
        fs.readFile('eur.txt', 'utf8', function(err, content) { 
          if (err) throw err;
          let eur = content.split(",")
          bot.sendMessage(chatId,`Валюта: EUR\nПокупка: ${Number(eur[0]).toFixed(2)} \nПродажа: ${Number(eur[1]).toFixed(2)}`)
        })
    }else{
      bot.sendMessage(chatId,'Нужно выбрать временной интервал...\n Ну либо валюту!')
     }
});
  