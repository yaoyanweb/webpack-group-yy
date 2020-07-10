const apiObj = {
    'api_url':'//prod.xxx.com'
}
//这里必须要解析成字符串进行判断，不然将会被识别为一个变量
for(let x in apiObj){
    apiObj[x] = JSON.stringify(apiObj[x]);
}

module.exports = apiObj;