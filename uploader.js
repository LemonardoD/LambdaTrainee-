#! /usr/bin/env node

const shorter = require('api')('@rebrandly/v1#1vnxn1nokworcvdu');
var inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const {GoogleAuth} = require('google-auth-library');

const KEYFILEPATH = path.join(__dirname, 'lmbduploader.json');

const SCOPES  = 'https://www.googleapis.com/auth/drive';

const auth = new GoogleAuth({
  keyFile : KEYFILEPATH,
  scopes : SCOPES 
})


async function creatUpload(auth, name, filePath){
  const driveService = google.drive({version: 'v3', auth});

  const fileMetadata = {
    'name': name,
    'parents': ['18YNGhh6URtwUIV2gSBM6tJoOfQFW1xcC']
  };
  const media = { 
    mimeType: 'image/jpeg',
    body: fs.createReadStream(filePath),
  }; 
  let response = await driveService.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id'
    })
  switch(response.status){
    case 200:
      let id = response.data.id
      return id
  }
}

inquirer
  .prompt({
    type:'input',
    name:'image',
    message:'Drag&drop ur image, press "ENTER" to upload: '
  })
  .then((answer) => {
    const data = fs.statSync(answer.image)
    if(data.isFile() === true){
      let imgPath = answer.image
      let name = path.basename(answer.image)
      let type = path.extname(answer.image)
      console.log(`File path: ${imgPath}\nFile name: ${name}\nFile Type: ${type.replace('.','')}`)
      inquirer.prompt({
        type:'list',
        name:'choise',
        message:`You uploading file with name ${name}. Do you want to change it?`,
        choices:['Yes','No']
      })
      .then((rename) => {
        if(rename.choise === 'Yes'){
          console.log(name)
          inquirer.prompt({
            type:'input',
            name:'newName',
            message:'Write down new name with out extention (.jpg): ',
            })
          .then((newn) => {
            name = newn.newName + type
            console.log(`New name: ${name}`)
            let promise1 = creatUpload(auth, name, imgPath)
            inquirer
            .prompt({
              type:'list',
              name:'shrtchose',
              message:'Do you want to get shorter variation of ur link?',
              choices:['Yes','No']
            })
            
            .then((resp) => {
              if(resp.shrtchose === "Yes"){
                promise1.then((returnid1)=>{
                  shorter.auth('11df656bf4cf4eaca4d3f0e935391f6f');
                  shorter.createLink({destination: `https://drive.google.com/file/d/${returnid1}/view`})
                    .then(res => console.log(res.shortUrl))
                    .catch(err => console.error(err));
                })
              }else{
                promise1.then((returnid1)=>{
                  console.log(`https://drive.google.com/file/d/${returnid1}/view`)
                })
              }
            })
          })
        }else{
          let promise2 = creatUpload(auth, name, imgPath)
          inquirer
            .prompt({
              type:'list',
              name:'shrtchose2',
              message:'Do you want to get shorter variation of ur link?',
              choices:['Yes','No']
            })
            .then(async(resp) => {
              if(resp.shrtchose2 === "Yes"){
                promise2.then((returnid2)=>{
                  shorter.auth('11df656bf4cf4eaca4d3f0e935391f6f');
                  shorter.createLink({destination: `https://drive.google.com/file/d/${returnid2}/view`})
                    .then(res => console.log(res.shortUrl))
                    .catch(err => console.error(err));
                })
              }else{
                promise2.then((returnid2)=>{
                  console.log(`https://drive.google.com/file/d/${returnid2}/view`)
                })
              }
            })
          }
      })
    }
})
  .catch((err) => {
    if(err){
      console.err;
      return;
    }
  })




  