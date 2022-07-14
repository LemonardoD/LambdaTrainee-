#! /usr/bin/env node

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routers');
const app = express();

const PORT = process.env.PORT || 3000


app.use(bodyParser.json());

app.use('/', router);

app.listen(PORT, function () {  
  console.log(`Server start at:${PORT}`);
})