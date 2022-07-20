#! /usr/bin/env node
const db = require('../model/dataBase');

exports.createRouter = function(req, res){
    if(JSON.stringify(req.body).length <=2){ // Проверяем не пустое ли тело запроса.
        res.json({
            message: 'Вы прописали роут, но не тело...'              
        })
    }else{
        let data = {
            route: req.url.split('/')[1],
            info:req.body
        }
        let count =0 
        if(Array.isArray(data.info)){ // Так же проверяем возможный получаемый список. Все ли елементы Джсон
            for (el of data.info){
                if (typeof el != 'object') count ++
            }
        }
        if (count > 0){
            res.json({
                message: 'Это не совсем похоже на JSON.'              
            })
        }else{
            db.getUserRoute(data.route) // используем функцию поиска роута, если пустой добавляем данные
        .then((results)=>{
            if(results[0] === undefined){
                db.addUserInfo('usersjson',data) 
                .then(()=>{
                    res.json({
                        message: 'Данные добавлены по вашему роуту.'              
                    })
                    return data
                })
                .catch((err)=>{
                return err;
                })
            }else {
                if(JSON.stringify(data.info)==JSON.stringify(results[0].info)){ //Если не пустой, проверяем совпадают ли данные этйо передачи с теми что уже есть.
                    res.json({
                        message: 'Такие данные уже были добавлены используя этот роут.'              
                    })
                }else{
                    db.addUserInfo('usersjson',data)
                    .then(()=>{
                        res.json({
                            message: 'Новые данные, добавлены к старому роуту!'              
                        })
                    })
                    .catch((err)=>{
                        return err;
                    }) 
                }
            }
        })
        }
    }
}

exports.getInfo = function(req, res){
    let route = req.url.split('/')[1]
    console.log(route)
    db.getUserRoute(route) 
    .then((results)=>{
        if(results != 0){
            res.json({
                results              
            })
            return true
        }else{
            res.json({
                message: 'Нет данных, по запрошенному роуту!(Присмотритесь может вы ошиблись? Если нет, обратитесь в тех.поддержку.)'             
            })
            return false
        }
    })
    .catch((err)=>{
        return err;
    })
}

