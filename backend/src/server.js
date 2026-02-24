import express from 'express';
import dotenv from "dotenv";
import path from 'path';
import cors from 'cors';
import notesRoute from './routes/notesRoute.js';
import { connect } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';


dotenv.config();

const app = express();

const __dirname = path.resolve();



//middleware
if (process.env.NODE_ENV !== "production") {
    app.use (cors(
    {
        origin: "http://localhost:5173",
    }
    ));
}

app.use(express.json());

app.use(rateLimiter)




app.use("/api/notes",notesRoute);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
});
}

connect().then(()=>{
    app.listen(5001,()=>{
    console.log("Server is running on port 5001");
});
}).catch((error)=>{
    console.error("Failed to connect to the database",error);
});


//QyQLsm6t9R1jUwWt
//mongodb+srv://abhinavlal0280_db_user:QyQLsm6t9R1jUwWt@cluster0.3du7rgv.mongodb.net/?appName=Cluster0