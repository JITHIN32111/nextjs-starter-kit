import mongoose from "mongoose";
import { log } from "node:console";

export async function connect (){

    try{

mongoose.connect(process.env.MONGO_URI!);
const connection =mongoose.connection;
connection.on('connected',()=>{
 console.log('mongo connected');
 
})
connection.on('error',(err)=>{
 console.log('mongo erroe',err);
 process.exit()
 
})

    }catch(error){
        console.log(error);
        
    }

}