let a =[{"dad":21, "sdas":"dsadas"}, 2312,{"213":232, "papa": "daddy"}]
let count =0 
if(Array.isArray(a)){ // Так же проверяем возможный получаемый список. Все ли елементы Джсон
    for (el of a){
        if (typeof el != 'object')count ++
    
        
    }
}
console.log(count)
if (count > 0){
    
    console.log('Это не совсем похоже на JSON.')              
    
}