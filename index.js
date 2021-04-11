const exppress=require("express");
const bodyParser =require("body-parser");
const https= require("https")

const app = exppress();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req, res){
    const cname=req.body.cname
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cname+"&units=metric&appid=0e4887755af88488c124870c846a72f0"
    https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
        const wd=JSON.parse(data)
        const tem=wd.main.temp
        const descp=wd.weather[0].description
        const icon=wd.weather[0].icon
         const imgurl="https://openweathermap.org/img/wn/"+icon+"@2x.png"

        res.write("<h1>the current temperature in "+cname+" is "+tem+" degree celcius.</h1>")
        res.write("<h2>description of weather:"+descp+"</h2>")
        res.write("<img src="+imgurl+"></img>")
    })
    })
})

app.listen(5000, function(){
    console.log("server is running at 5000");
})