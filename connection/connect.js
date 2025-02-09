const mongoose = require("mongoose")
const username = "manavop"
const dbname = "test123"
const password = process.env.MONGODB_USER_PASSWORD
const mongourl = `mongodb+srv://${username}:${password}@cluster0.ulk7x.mongodb.net/${dbname}`

const connectToDatabase = async ()=> {
  try {
    await mongoose.connect(mongourl);
    console.log("Mongo Connected Sucessfully"); 
  } catch (e) {
    console.error(e);
  }
}

connectToDatabase();
