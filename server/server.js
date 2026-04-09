const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const postRoutes = require("./routes/postRoutes")

const app = express()
app.use(cors())
app.use(express.json())
const port = 5000

app.use("/post",postRoutes)

mongoose.connect("mongodb://127.0.0.1:27017/miniInsta")
.then(()=> console.log("mongoose connected"))
.catch((err)=> console.log(err))


app.get('/',(req,res)=>{
    res.send("server is running")
})
app.listen(port,()=>{
    console.log("server running at port 5000");
})