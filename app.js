const cors = require("cors")
const express = require("express")

const app = express()
const PORT = process.env.PORT || 3001

let users = {}

app.use('/healthcheck', require('./routes/healthcheck.routes'));
app.use(express.urlencoded({ extended: true}));
app.use(cors())

app.get("/",(req ,res)=>{
    headers ={"http_status":200, "cache-control": "no-cache"}
    body={"status": "available"}
    res.status(200).send(body)
})

app.get("/register", (req, res) => {
    let user = req.query.user
    let time = req.query.time.number()
    console.log(user)
    console.log(time)
    let oldtime = users[user].number()
    if(oldtime == null || time > oldtime){
        users[user] = time
        
        
    }
    

    res.status(200).send({"status":"success"})
})

app.get("/highscores", (req, res) => {
    res.status(200).send(users)
})



app.listen(PORT , ()=>{
    console.log(`STARTED LISTENING ON PORT ${PORT}`)
});