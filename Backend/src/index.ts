import express from "express";
import { userRouter } from "./routes/userRoute";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

// Connecting to the Database

async function ConnectDB()
{
    console.log("Connecting to the DataBase");
    try{
        await mongoose.connect(process.env.DataBase_Url);
        console.log("Conneted to the DataBase");
    }
    catch(error)
    {
        console.log("Unable to Connect to the DataBase");
    }
    
}
ConnectDB();

const app=express();
const portNo=3000;
app.use(express.json());
app.use(cors());

app.use("/api/v1/todoApp",userRouter);

console.log("Listening on Port "+portNo)
app.listen(portNo);


