import mongoose from "mongoose";
import dotenv from "dotenv";

export const connect= async() =>{
    try{
        await mongoose.connect(process.env.MONGOURL);
        console.log("succesfully connected to the database");
    
    }catch(error){
        console.error("Error connecting to the database",error);
        process.exit(1);//exit with failure
    }

}