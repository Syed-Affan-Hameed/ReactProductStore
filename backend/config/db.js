import mongoose from "mongoose";

export const connectDb = async ()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB database connected ${conn.connection.host}`);
    }
    catch(e){
        console.log("Connection was not made "+e);
        process.exit(1);
    }
  

}