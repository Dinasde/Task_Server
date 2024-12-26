const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const userRoutes = require('./routes/userRoutes')
const scheduleRoutes = require('./routes/scheduleRoutes')

require('./config/db')
const port = process.env.PORT || 3002;
app.use(express.json())

const corsOptions = {
    origin:'*',
    method:['POST','GET','PUT','DELETE']
}

const limiter = rateLimit({
    windowMs:5*60*1000,
    max:150,
    message:'You had exceeded the limit'
})

app.use(limiter)


app.use(cors(corsOptions))


app.use('/api/user',userRoutes)

app.use('/api/schedule',scheduleRoutes)





app.listen(port,()=>{
    console.log(`Listening on the port ${port}`)
})