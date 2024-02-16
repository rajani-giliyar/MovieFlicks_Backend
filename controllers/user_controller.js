const express = require("express")
const mongoose = require("mongoose")
const User = require("../models/user_model")
const userHelper = require("../helpers/user_helper")
const dotenv = require("dotenv")
dotenv.config();



//  register endpoints

exports.register = async(req,res) => {
    try {
        const {name, email, password} = req.body;
        // check if name was enterd
        if(!name){
            return res.json({error : "name is required"})
        }
        // check is password is good
        if(!password || password.length < 6){
            return res.json({error : "password is required and should be atleast 6 char long"})
        }
        // check email
        const exist = await User.findOne({email})
        if(exist){
             return res.json({error : "Email is taken already"})
        }

        // Hash the password before saving it to the database
        const hashedPassword = await userHelper.hashPassword(password);

        const user = await User.create({
            name,
            email,
            password: hashedPassword // Save the hashed password
        })

        return res.json(user)
       
    } catch (error) {
        console.error(error);
    }
}

// login endpoints(use jwt in login if password match)

exports.login = async(req,res) => {
    try {
        const {email, password} = req.body;

        // check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.json({error : "No user found"})
        }

        // check if password match
        const match = await userHelper.comparePassword(password,user.password)
        if(match)
        {
            res.json("password match")
        }
      
        if(!match)
        {
            res.json({error : "password do not match"})
        }

    } catch (error) {
        console.error(error);
    }
}