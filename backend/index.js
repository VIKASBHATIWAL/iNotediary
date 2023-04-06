const express = require("express")
const connectDB = require("./db.js")
var cors = require('cors')


const app = express()
connectDB();
app.use(cors())

app.use(express.json())
app.get("/", (req, res)=>{
    res.send("hello world")
})

app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))


app.listen(5000, ()=>{
    console.log("Server connected on port 5000");
})