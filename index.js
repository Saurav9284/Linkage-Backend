const express = require('express')
const cors = require('cors')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=> {
    res.send({msg:'API is live'})
})

app.listen(PORT,()=>{
    console.log(`listening on PORT: ${PORT}`)
})