#! /usr/bin/env node

const { time } = require("console");

function timeCheck(time){
    if (time !=0 ){
    let month31 =[0,2,4,6,7,9,11]
    let now = new Date();
    let hour = now.getHours();
    let minutes= now.getMinutes();
    let finDay = Math.floor((time/60) /9);
    let finHour = Math.floor((time%540) /60);
    let finMin = time%60;
    
    if (finDay === 0 && finHour + hour < 19 && minutes > 0){
        console.log(`Дата выполнение вашего заказа: ${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()}, примерное время: ${finHour + hour}:${minutes}`);
        let tetsAnsw = now.getDay() != 6 && now.getDay() != 0;
        return [tetsAnsw, now]
    }else if(finDay === 1 && finHour + hour < 19  ){
        console.log(`Дата выполнение вашего заказа: ${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()+finDay}, примерное время: ${finHour + hour}:${minutes}`);
        let tetsAnsw = now.getDay() != 6 && now.getDay() != 0;
        return [tetsAnsw, now]
    }else{
        if (minutes > 15 ){
        hour++
        };
        if (hour >=19){
            finDay++
            
        }else if (hour >= 10 && (hour+finHour) >= 19 ){
            finDay++
            finHour = finHour - (19 -hour)   
        };

        let num = 1
        while (finDay != 0 ){
            let controlDate = new Date();
            now.setDate(controlDate.getDate()+num)
            
            if(now.getDay()=== 0 || now.getDay()=== 6){
                finDay++ 
            }
            
            finDay--
            num ++
        };
        num --;

        now = new Date();
        let yearNum = 0;
        let monthNum = 0;
        let dateNum = 0;

        while (num > 30){
            if(month31.includes(now.getMonth()+monthNum)){
                num -= 31
                monthNum ++
            }else{
                num -= 30
                monthNum ++
            }
        };
        monthNum = now.getMonth()+monthNum+1
        while ( monthNum > 12){
            monthNum -=12
            yearNum ++

        };
        
        now.setFullYear(now.getFullYear()+yearNum,monthNum -1 , now.getDate() + dateNum);
        
        console.log(`Дата выполнение вашего заказа: ${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()}, примерное время: ${10+finHour}:${finMin}`);  
        let tetsAnsw = now.getDay() != 6 && now.getDay() != 0;
        return [tetsAnsw, now]
    }
    
   
}}
console.log(timeCheck(1000))
module.exports = timeCheck;
