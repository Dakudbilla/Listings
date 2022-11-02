import {} from "apollo-server-express"
import { listings } from "../listings";

export const resolvers={
    Query:{
        listings:()=>{
            return listings
        }
    },
    Mutation:{
        deleteListing:(_root:undefined,{id}:{id:string})=>{
            const deleteListingIndex = listings.findIndex(listing=>listing.id===id)
            if (deleteListingIndex!==-1) {
                return  listings.splice(deleteListingIndex,1)[0]
            }
            throw new Error( "[404]: Listing Not Found")
        }
    }
}