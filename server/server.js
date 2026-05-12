// setServers() is part of the standard DNS module behavior
// dns/promises is primarily for async DNS queries, not configuration in some Node versions

const dns = require("node:dns/promises");
dns.setServers(["8.8.8.8","1.1.1.1"])
const express = require("express")
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require("mongoose")
const cors = require("cors")
// const Router = require('./routes/postRoutes')
const postRoutes = require("./routes/postRoutes")

const app = express()
app.use(cors())
app.use(express.json())
const port = 5000

app.use("/post",postRoutes)

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("mongoose connected"))
.catch((err)=> console.log(err))


app.get('/',(req,res)=>{
    res.send("server is running")
})
app.listen(port,()=>{
    console.log("server running at port 5000");
})