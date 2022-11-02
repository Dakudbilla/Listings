import { ApolloServer  } from "apollo-server-express"
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core'
import express, { Application } from "express"
import {typeDefs,resolvers} from './graphql'
import { connectDatabase } from "./database"

const app = express()

app.use(express.json())

app.get("/",(_req,res)=>res.send("Hi from Listings"))

const port = process.env.PORT || 5000;



const mount =async(app:Application)=>{
   const db=await connectDatabase();

    //Create apollo server instance
(async function() {
    const server = new ApolloServer({
        plugins:[ApolloServerPluginLandingPageGraphQLPlayground({})],
        typeDefs,resolvers,context:()=>({db})
    })
    await server.start();
    //add  express to apollo
server.applyMiddleware({
    app,path:"/api"
})
})()

    app.listen(port,()=>{
        console.log("[app]: Listings Server running on port "+port)
    })

}

mount(express())



