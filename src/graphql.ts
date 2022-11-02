import {GraphQLObjectType,GraphQLSchema,GraphQLString,GraphQLID,GraphQLInt,GraphQLNonNull,GraphQLList} from 'graphql'
import { listings } from './listings'

const Listing = new GraphQLObjectType({
    name:"Listing",
    fields:{
    id: {type: new GraphQLNonNull(GraphQLID)},
    title:{type: new GraphQLNonNull(GraphQLString)},
    image: {type:new GraphQLNonNull(GraphQLString)},
    address: {type:new GraphQLNonNull(GraphQLString)},
    price: {type:new GraphQLNonNull(GraphQLInt)},
    numOfGuests:{type:new GraphQLNonNull(GraphQLInt)},
    numOfBeds: {type:new GraphQLNonNull(GraphQLInt)},
    numOfBaths: {type:new GraphQLNonNull(GraphQLInt)},
    rating: {type:new GraphQLNonNull(GraphQLInt)}
    }
})
const query= new GraphQLObjectType({
    name:'Query',
    fields:{
        listings:{
            type: new GraphQLNonNull( new GraphQLList(new GraphQLNonNull(Listing))),
            resolve:()=>listings
        }
    }
})


const mutation= new GraphQLObjectType({
    name:'Mutation',
    fields:{
        deleteListings:{
            type: new GraphQLNonNull(Listing),
            args:{id:{type:new GraphQLNonNull(GraphQLID)}},
            resolve:(_parent,{id})=>{
                const deleteListingIndex = listings.findIndex(listing=>listing.id===id)
                if (deleteListingIndex!==-1) {
                    return  listings.splice(deleteListingIndex,1)[0]
                }
                return "[404]: Listing Not Found"
            }
        }
    }
})


export const schema = new GraphQLSchema({
    query,mutation
})