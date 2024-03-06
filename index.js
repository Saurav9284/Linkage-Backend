const express = require('express')
const cors = require('cors')
const {connection,PORT} = require('./Config/db')

const app = express();

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=> {
    res.send({msg:'API is live'})
})

app.listen(PORT, async ()=>{
    try {
        await connection
        console.log('Connected to mongoDB')
    } catch (error) {
        console.log(error)
    }
    console.log(`listening on PORT: ${PORT}`)
})