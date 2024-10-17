"use client";
import { useEffect, useState } from "react";
import Propertylistitems from "./Propertylistitems";
import apiService from "@/app/services/apiService";
import useSearchModal from "@/app/hooks/useSearchModal";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
export type PropertyType = {
  id: string;
  title: string;
  image_url: string;
  price_per_night: number;
  is_favourite: boolean;
};
interface PropertyListProps {
  landlord_id?: string | null;
  favourites?: boolean | null;
}
const Propertylist: React.FC<PropertyListProps> = ({
  landlord_id,
  favourites,
}) => {
  const params=useSearchParams()
  const searchModal=useSearchModal()
  const country=searchModal.query.country
  const numGuests=searchModal.query.guests
  const numBathrooms=searchModal.query.bathrooms
  const numBedrooms=searchModal.query.bedrooms
  const checkinDate=searchModal.query.checkIn
  const checkoutDate=searchModal.query.checkOut
  const category=searchModal.query.category
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const markFavourite = (id: string, is_favorite: boolean) => {
    const tmpProperties = properties.map((property: PropertyType) => {
      if (property.id === id) {
        property.is_favourite = is_favorite;
        if (is_favorite) {
          console.log("Added to Favourites");
        } else {
          console.log("Removed from Favourites");
        }
      }
      return property;
    });
    setProperties(tmpProperties);
  };
  const getProperties = async () => {
    let url = "/api/properties/";
    if (landlord_id) {
      url += `?landlord_id=${landlord_id}`;
    } else if (favourites) {
      url += `?is_favourites=true`;
      console.log("fav: ",url)
    }else{
      let urlQuery=''
      if(country){
        urlQuery+=`&country=${country}`
      }
      if(numGuests){
        urlQuery+=`&numGuests=${numGuests}`
      }
      if(numBathrooms){
        urlQuery+=`&numBathrooms=${numBathrooms}`
      }
      if(category){
        urlQuery+=`&category=${category}`
      }
      if(numBedrooms){
        urlQuery+=`&numBedrooms=${numBedrooms}`
      }
      if(checkinDate){
        urlQuery+=`&checkin=${format(checkinDate,'yyyy-MM-dd')}`
      }
      if(checkoutDate){
        urlQuery+=`&checkout=${format(checkoutDate,'yyyy-MM-dd')}`
      }
      if(urlQuery.length){
        // console.log('Query Url:',urlQuery)
        urlQuery='?'+urlQuery.substring(1)
        url+=urlQuery
      }
    }

    try {
      const tmpProperties = await apiService.get(url);

      // Check if the response is valid
      if (tmpProperties && tmpProperties.data) {
        setProperties(
          tmpProperties.data.map((property: PropertyType) => {
            property.is_favourite = tmpProperties.favourites.includes(
              property.id
            );
            return property;
          })
        );
      } else {
        console.error("Unexpected API response structure:", tmpProperties);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    getProperties();
  }, [category,searchModal.query,params]);
  return (
    <>
      {properties.map((property) => {
        return (
          <Propertylistitems
            key={property.id}
            property={property}
            markFavourite={(is_favourite: any) =>
              markFavourite(property.id, is_favourite)
            }
          />
        );
      })}
    </>
  );
};
export default Propertylist;
