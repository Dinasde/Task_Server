const mongoose = require('mongoose')
require('dotenv').config()

const connection = async()=>{


    try{
       const connection = await mongoose.connect(process.env.DB_URL)

       console.log(process.env.DB_URL)

       if(connection){
        console.log('Database connection was Established Successfully')
       }else{
        console.log('Database connection was not Established Successfully')
       }

    }catch(err){
        console.log(err.message)
    }
}

connection()