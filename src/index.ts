import { ApolloServer } from "apollo-server-express"
import express from "express"
import { listings } from "./listings"
const app = express()

app.use(express.json())

app.get("/",(_req,res)=>res.send("Hi from Listings"))

const port = process.env.PORT || 5000

// // Get all Listings 
// app.get("/listings",(req,res)=>{
//     return res.send(listings)
// })

// // Delete listing
// app.post("/delete-listing",(req,res)=>{
//     const id:string = req.body.id
//     const deleteListingIndex = listings.findIndex(listing=>listing.id===id)
//     if (deleteListingIndex!==-1) {
//         return res.send( listings.splice(deleteListingIndex,1))
//     }
//     return res.send("[404]: Listing Not Found")
// })


//Create apollo server instance
const server = new ApolloServer({
    typeDefs:``,resolvers:{}
})

//add  express to apollo
server.applyMiddleware({
    app,path:"/api"
})

app.listen(port,()=>{
    console.log("[app]: Listings Server running on port "+port)
})