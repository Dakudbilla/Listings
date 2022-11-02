import "dotenv/config"
import { connectDatabase } from "../src/database"
import { listings } from "./seedData"

const seed = async ()=>{
    try {
       const db= connectDatabase()
       console.log("[seed] : running....")
       for (const listing of listings){
        await (await db).listings.insertOne(listing)
       }
       console.log("[seed] : success....")
    } catch(err:any){
        throw new Error("failed to seed database")
    }
}

seed();