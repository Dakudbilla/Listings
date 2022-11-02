import mongoose, { Collection, ObjectId } from "mongoose";

export interface Listing{
    _id: mongoose.Types.ObjectId;
    title:string;
    image: string;
    address: string;
    price: number;
    numOfGuests:number;
    numOfBeds: number;
    numOfBaths: number;
    rating: number;
}


export interface Database{
    listings:Collection<Listing>
}
