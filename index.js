const express = require('express');
const connection = require('./config');
const voteRouter = require('./Routes/vote.route');
const app = express();
const cors = require('cors');

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
res.send("hello")
})
app.use("/",voteRouter)


app.listen(8080,async (req,res)=>{
    try {
        
        await connection
        console.log('mongo is connected')
        console.log('app is running')
    } catch (error) {
        console.log(error.message)
    }

})

