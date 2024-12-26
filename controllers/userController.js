const User = require('../models/userModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const createUser = async(req,res)=>{

    const{username,email,password,role} = req.body;

let hashPassword = await bcrypt.hash(password,12)

    if(!username ||!email || !password || !role){
         return res.json({message:'Please Provide the required field'})
    }
try{

const newUser = new User({username,email,password:hashPassword,role})

const result = await newUser.save()

if(result){
    return res.status(200).json({message:'Admin Created Successfully',result})
}else{
    return res.status(404).json({message:'Internal Server Error'})
}

}catch(err){
    return res.json({message:err.message})
}
}

const loginAdmin = async(req,res)=>{

    const {email,password} = req.body;
    try{
const admin = await User.findOne({email:email})

if(admin.role === 'Admin'){

    const isMatchPassword = await bcrypt.compare(password,admin.password)

    if(isMatchPassword){

        const token = jwt.sign({id:admin._id},process.env.JWT_SECRET,{expiresIn:'1day'})

        return res.json({message:'Token Generated Successfully',token,admin})

    }else{
        return res.json({message:'Invalid Password'})
    }

}else{
    return res.json({message:'Invalid User'})
}


    }catch(err){
        return res.json({message:err.message})
    }
}


const getUsers = async(req,res)=>{
    try{

        const allUsers = await User.find({role:'User'})

        if(allUsers){
            return res.status(200).json({message:'All users Found Successfully',allUsers})
        }else{
            return res.status(400).json({message:'Internal Server Error'})
        }

    }catch(err){
        return res.json({message:err.message})
    }
}


const getAdmin = async(req,res)=>{
    try{

        const result = await User.find({role:'Admin'})

        if(result){
            return res.status(200).json({message:'Admin Details Got Successfully',result})
        }else{
            return res.status(400).json({message:'Internal server Error'})
        }

    }catch(err){
        return res.json({message:err.message})
    }
}


module.exports ={createUser,loginAdmin,getUsers,getAdmin}