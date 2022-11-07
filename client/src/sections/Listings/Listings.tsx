import React from "react";
import { useMutation, useQuery } from "../../lib/api";
import {
  DeleteListingData,
  DeleteListingVariables,
  ListingsData,
} from "./types";

const LISTINGS = `
  query Listings {
    listings {
      
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}
/**
 * Displays Listings fetched from server
 *  @props title
 */
export const Listings = ({ title }: Props) => {
  const { data, refetch, loading, error } = useQuery<ListingsData>(LISTINGS);
  const [
    deleteListing,
    { loading: deletelistingloading, error: deletelistingerror },
  ] = useMutation<DeleteListingData, DeleteListingVariables>({
    query: DELETE_LISTING,
  });
  const handledeleteListing = async (id: string) => {
    await deleteListing({ id });
    refetch();
  };

  const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <ul>
      {listings.map((listing) => {
        return (
          <li key={listing.id}>
            {listing.title}
            <button onClick={() => handledeleteListing(listing.id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  ) : null;

  if (error) {
    return <h2>Oops, An error Occured</h2>;
  }
  if (loading) {
    return <div>Loading.....</div>;
  }

  const deleteListingLoadingMessage = deletelistingloading ? (
    <h4>Deletion in progress....</h4>
  ) : null;

  const deleteListingErrorMessage = deletelistingerror ? (
    <h4>Ooops deletion failed ):, - Try again</h4>
  ) : null;
  return (
    <div>
      <h2>{title}</h2>

      {listingsList}
      {deleteListingLoadingMessage}
      {deleteListingErrorMessage}
    </div>
  );
};
