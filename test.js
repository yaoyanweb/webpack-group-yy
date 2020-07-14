function aa(x){
    return new Promise((r,j)=>{
       (x?r:j)(x)
    })
}
aa(true).then((data)=>{
    return aa(false);
}).then(data=>{
    console.log(data,1)
}).then(data=>{
    console.log(data,2)
}).then(data=>{
    console.log(data,3)
}).catch(err=>{
    console.log(err,4)
})