import Image from "next/image";
import { PropertyType } from "./Propertylist";
import { useRouter } from "next/navigation";
import FavoriteButton from "../FavouriteButton";
interface PropertyProps {
  property: PropertyType;
  markFavourite?:(is_favourite:boolean)=>void
}
const Propertylistitems: React.FC<PropertyProps> = ({ property,markFavourite }) => {
  const router=useRouter()
  return (
    <div className="cursor-pointer"
    onClick={()=>router.push(`/properties/${property.id}`)}
    >
      <div className="relative overflow-hidden aspect-square rounded-xl">
        <Image
          fill
          src={property.image_url}
          sizes="(max-width:768px) 768px,(max-width:1200):768px,768px"
          alt="property image"
          className="hover:scale-110 object-cover transition h-full w-full"
        />
        {markFavourite && (
          <FavoriteButton
          id={property.id}
          is_favorite={property.is_favourite}
          markFavorite={(is_favourite)=>markFavourite(is_favourite)}
          />
        )}
      </div>
      <div className="mt-2">
        <p className="text-lg font-bold">{property.title}</p>
      </div>
      <div className="mt-2">
        <p className="text-sm text-gray-500 ">$ {property.price_per_night}</p>
      </div>
    </div>
  );
};
export default Propertylistitems;
