const express=require('express')
const app=express()
const cors=require('cors')
const bodyParser=require('body-parser')
require('dotenv').config()
const router = require('./router/router')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',router)

app.listen(9090,()=>{
    console.log("listen on port 9090")
})