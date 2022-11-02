import { ApolloServer  } from "apollo-server-express"
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core'
import express from "express"
import {typeDefs,resolvers} from './graphql'

const app = express()

app.use(express.json())

app.get("/",(_req,res)=>res.send("Hi from Listings"))

const port = process.env.PORT || 5000;

//Create apollo server instance
(async function() {
    const server = new ApolloServer({
        plugins:[ApolloServerPluginLandingPageGraphQLPlayground({})],
        typeDefs,resolvers
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