module.exports = (req,res,next)=>{
    console.log(req.headers['content-type']);
    if(req.headers['content-type']==='application/x-www-form-urlencoded')
    {
        //自行解析消息题
    }
    else{
        next()
    }
}