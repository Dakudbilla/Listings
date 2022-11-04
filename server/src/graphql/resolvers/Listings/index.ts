import {} from "apollo-server-express"
import mongoose from "mongoose";
import { Database, Listing } from "../../../lib/types";

export const listingResolver={
    Query:{
        // eslint-disable-next-line @typescript-eslint/ban-types
        listings: async(_root:undefined, _args : {}, {db}:{db:Database}):Promise<Listing[]> =>{
            return await db.listings.find({}).toArray()
        }
    },
    Mutation:{
        deleteListing: async(_root:undefined,{id}:{id:string},{db}:{db:Database}):Promise<Listing> =>{
        const deleteRes =   await db.listings.findOneAndDelete({
                _id: new mongoose.Types.ObjectId(id)
            })
            if (!deleteRes.value) {
                throw new Error( "[404]: Failed to delete Listing")
            }
            return deleteRes.value
        }
    },

    Listing:{
        id:(listing:Listing):string =>listing._id.toString()
    }
}