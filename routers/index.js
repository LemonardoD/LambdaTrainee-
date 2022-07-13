#! /usr/bin/env node
const express = require('express');
const router = express.Router();
const db = require('../model/dataBase');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
JWT_SECRET_ACCES = 'fair-weather-wishy-washy'
JWT_SECRET_REFRESH = 'keep-those-monsters-in-the-closet'


function verifyToken(req, res, next) {
  db.getToken(req.headers.authorization.split(' ')[1])
    .then((results)=>{
      const token = results[0].token;
      if (token == null) {
        return res.sendStatus(401)
      };
      jwt.verify(token, JWT_SECRET_ACCES, (err, user) => {
        if (err) {
          return res.sendStatus(401)
        };
        req.user = user;
        next();
        return res.json({
          request_num: req.url.split('/me')[1],
          login: results[0].login,
        })  
      });
      
})
}




router.get('/me[0-9]',verifyToken, (req, res)=>{
});

router.post('/sign_up', (req, res)=>{
  if(req.body.password === req.body.repeatPassword){
    db.getUser(req.body.email)
    .then((results)=>{
        if (results.length == 0){
          data = {
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
          };
          db.add('users', data)
          .then(()=>{
              res.json({
                message: 'Пользователь зарегистрирован.'              
            })
            })
            .catch((err)=>{
              return err;
            })
        } else {
            res.json({
                message: ('Такой пользователь уже зарегистрирован!')              
            })
        }
      })
      .catch((err)=>{
        return err;
      })
  } else {
    res.json({
        message: ('Не совпадаеют пароли.')              
    })
  }
})

router.post('/login', (req, res)=>{
  db.getUser(req.query.email)
  .then((results)=>{
    if(bcrypt.compareSync(req.query.password, results[0].password)) {
      let seconds = Math.floor(Math.random() * (60 - 30) + 30)
      info = {
        login: req.query.email,
        token: jwt.sign({
          data: req.query.email
        }, JWT_SECRET_ACCES, { expiresIn: seconds  }),
        refreshToken: jwt.sign({
          data: req.query.email
        }, JWT_SECRET_REFRESH, { expiresIn: '120m'   })
      };
    db.getUserToken(info.login)
    .then((results)=>{
        if (results.length === 0){
          db.addToken('token', info)
          .then((results)=>{             
            res.json({
              message: ['Пароль валиден, вы авторизованны!', info.token, info.refreshToken ] 
            });             
          })
          .catch((err)=>{
            return err
          })
        }else{
          seconds = Math.floor(Math.random() * (60 - 30) + 30)
          info.token =  jwt.sign({
              data: req.query.email
            }, JWT_SECRET_ACCES, { expiresIn: seconds  })
          info.refreshToken = jwt.sign({
            data: req.query.email
          }, JWT_SECRET_REFRESH, { expiresIn: '120m'  })
          db.updateToken('token', info)
          .then((results)=>{             
            res.json({
              message: ['Пароль валиден, вы авторизованны!', info.token ]
            });             
          })
          .catch((err)=>{
            return err
          })
          
        }
      })
    }else{
        res.json({
          message: ('Не совпадают пароли.')  
        });
    }
  })
  .catch((err)=>{
  console.log(err)
  })
})

router.post('/refresh', (req, res)=>{
  seconds = Math.floor(Math.random() * (60 - 30) + 30)
  db.getRefreshToken(req.headers.authorization.split(' ')[1])
  .then((result)=>{
    seconds = Math.floor(Math.random() * (60 - 30) + 30)
    info={
      token :jwt.sign({
        data: result[0].email
        }, JWT_SECRET_ACCES, { expiresIn: seconds  }),
      refreshToken : jwt.sign({
        data: result[0].email
          }, JWT_SECRET_REFRESH, { expiresIn: '120m'  })
        }
      })
      db.updateToken('token', info)
        .then((results)=>{             
          res.json({
            message: ['Пароль валиден, вы авторизованны!', info.token ]
          });             
          })
        .catch((err)=>{
          return err
        })
  
  // let refrToken =  jwt.sign({
  //     data: 
  //   }, JWT_SECRET_REFRESH, { expiresIn: seconds  })
  //   console.log(refrToken)
  // db.updateToken('token', info)
  // .then((results)=>{             
  //   res.json({
  //     message: ['Пароль валиден, вы авторизованны!', info.token ]
  //   });             
  // })
  .catch((err)=>{
    return err
  })
})
module.exports = router;