const shortID = require("shortid") 
const URL = require("../models/user");
const signup = require("../models/signup");
const { Error } = require("mongoose");
const {v4: uuidv4} = require('uuid')
const {setUser, getUser} = require('../service/auth')

async function handleGetShortURL(req, res) {  
  const {url} = req.body
  if(!url) {
    return res.status(400).json({error:'Please provide a valid URL'})
  }
  const shorturl = shortID();
  // creating url object to be stored in DB
  const data = {
    shortID: shorturl,
    redirectURL: url
  }

  const response = await URL.create(data) 
  return res.status(200).json({id: response.shortID})
}

async function handleRedirectURL(req, res) {
  const shortID = req.params.shortID;
  const response = await URL.findOneAndUpdate({shortID},
  {
    $push: {
      visithistory:{
        Timestamp: Date.now(),
      }
  }})
  res.redirect(response.redirectURL)
}

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

async function handleusersignup(req, res) {
  try {
    const {fullname,email,password} = req.body
    if(!fullname || !validateEmail(email) || !password){
      return res.status(400).json({msg:'please fill the signup page properly'})
    }
    const userExist = await signup.findOne({email:email})
    if(userExist){
      return res.status(400).json({msg:'User already exists'})
    }
    const signupdata ={
      fullname,
      email,
      password
    }
    const response =await signup.create(signupdata)
    res.status(201).json({data:response,msg:'Sucessfully SignUp'})
  }
   catch (error) {
    return res.status(500).json({msg:'Server Error'})
  }
}

async function handleLoginUser(req, res) {
  try {
    const {email,password} = req.body
    if(!email || !password){
      return res.status(400).json({msg:"Plese provide email and password"})
    }
    const responsefinal = await signup.findOne({email:email}) 
    if(responsefinal===null){ 
      res.status(404).json({msg:`User with email ${email} not Found`})   
    }else if(responsefinal.password !== password){
      res.status(400).json({msg:`Incorrect password`})
    }
    else if(responsefinal._id){
      const token = setUser(responsefinal)
      console.log(token);
      // console.log("Cookie",sessionId);
      return res.status(200).cookie('uid',token).json({data:responsefinal,msg:"Success"})
    }else{
      res.status(500).json({msg:"something went wrong"})
    }
  } catch (error) {
    return res.status(500).json({msg:error})
  }
}

module.exports = {
  handleGetShortURL,
  handleRedirectURL,
  handleusersignup,
  handleLoginUser
}