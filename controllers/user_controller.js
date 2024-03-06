const express = require("express")
const mongoose = require("mongoose")
const User = require("../models/user_model")
const userHelper = require("../helpers/user_helper")
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv")
dotenv.config();





exports.register = async(req,res) => {
    try {
        const {name, email, password} = req.body;
        
        if(!name){
            return res.json({error : "name is required"})
        }
        
        if(!password || password.length < 6){
            return res.json({error : "password is required and should be atleast 6 char long"})
        }
        
        const exist = await User.findOne({email})
        if(exist){
             return res.json({error : "Email is taken already"})
        }

        
        const hashedPassword = await userHelper.hashPassword(password);

        const user = await User.create({
            name,
            email,
            password: hashedPassword 
        })

        return res.json(user)
       
    } catch (error) {
        console.error(error);
    }
}





exports.login = async(req,res) => {
    try {
        const {email, password} = req.body;

        
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({error : "No user found"});
        }

        
        const match = await userHelper.comparePassword(password, user.password);
        if (match) {
            
            const token = jwt.sign({ userId: user._id }, 'asdfghjklqwertyuio', { expiresIn: '1h' }); 
            res.json({ token });
        } else {
            res.status(401).json({ error : "Password do not match" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};