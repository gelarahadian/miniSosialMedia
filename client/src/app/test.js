const num = 9

for(let i = 0; i < num; i++) {
    let symbol = [];
    if(num % 3 === 0){
        symbol.push("%")
    }else if(num % 2 === 0){
        symbol.push('#')
    }else{
        symbol.push('*')
    }
    console.log(symbol)
}