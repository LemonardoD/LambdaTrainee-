#! /usr/bin/env node

const totalReturn = require('./total')
const timeCheck = require('./time')
const priceCheck = require('./price')

const express = require('express');
app = express();
 

const port = 3000;

app.use(express.json());


app.post('/',(req, res) => {
  totalReturn(req.body.count,req.body.language, req.body.mimetype)
  let answ = {
      "price": 0,
      "time": 0, 
      "deadline": 0 ,
      "deadline_date": "0",
    }
  answ.price = priceCheck(req.body.count,req.body.language, req.body.mimetype)
  answ.time = Number((totalReturn(req.body.count,req.body.language, req.body.mimetype) / 60).toFixed(2))
  answ.deadline = Math.floor(+timeCheck(totalReturn(req.body.count,req.body.language, req.body.mimetype))[1] / 1000)
  answ.deadline_date = timeCheck(totalReturn(req.body.count,req.body.language, req.body.mimetype))[1]
  res.status(200).json(answ)
});
app.listen(port, () =>
  console.log(`Server listens at : ${port}`)
);
