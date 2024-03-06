const express = require('express')
const UserModel = require('../Models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const upload = require('../Utils/multer')
const cloudinary = require('../Utils/cloudinary')


const UserController = express.Router()

// Register/Signup

UserController.post('/signup', upload.single('avatar'), async (req,res) => {

    const { name , phone, email , password } = req.body

    if(!name || !phone || !email || !password) {
        return res.send({msg:'Fill all the details!'})
    }
    try {
        const exist = await UserModel.findOne({ email })
        if(exist){
            return res.send({msg:'User already exist wih this email, try another!'})
        }
        cloudinary.uploader.upload(req.file.path, function(error, result) {
            
            if(error){
                return res.send({msg:'Internal server error'})
            }
             const avatar = result.secure_url;

             bcrypt.hash(password,5, async function(err,hash) {

                if(err) {
                    return res.send({msg:``})
                }
                try {
                    const user = await UserModel.create({
                        name:name,
                        avatar:avatar,
                        phone:phone,
                        email:email,
                        password:hash
                    })
                    console.log(user)
                    res.send({msg:'Signup successfull'})
    
                } catch (error) {
                    console.log(error)
                    res.send({msg:'Internal servser error'})
                }
            })
        });
        
        
    } catch (error) {
        console.log(error)
        res.send({msg:'Internal servser error'})
    }
});

module.exports = UserController