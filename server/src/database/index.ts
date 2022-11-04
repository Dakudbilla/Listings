import mongoose, { Collection } from "mongoose";
import "dotenv/config"
import { Database, Listing } from "../lib/types";
export const connectDatabase = async ():Promise<Database> => {
   try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}`,{dbName:"main"});
    console.log(`MongoDB connected: ${conn.connection.host}`);
    const db = conn.connection.db
    return {
        listings:db.collection("listings") as Collection<Listing>
    }

} catch (err:any) {
    console.error(`Error: ${err?.message}`);

    process.exit(1);
  }

};



