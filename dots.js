#! /usr/bin/env node

function dots(data) {
  let finArr = []
  for (let i = 0; i < 2 ** (data.length - 1); i++) {
    let option = data[0];
    [...i.toString(2).padStart(data.length - 1, '0')]
    .forEach((pt, i) => {
        option += ((pt == 0) ? '' : '.') + data[i + 1]
        })
    finArr.push(option)
    }
    console.log(finArr)
}

dots('asd')
