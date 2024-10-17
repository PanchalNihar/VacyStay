import Image from "next/image";
import ContactButton from "@/app/components/ContactButton";
import Propertylist from "@/app/components/properties/Propertylist";
import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";
const LandlordPage = async({params}:{params:{id:string}}) => {
  const landlord=await apiService.get(`/api/auth/${params.id}`)
  const userId=await getUserId()
  const defaultAvatar = "/1.jpg";
    return (
      <div className="max-w-[1500px] mx-auto px-6 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 mb-4">
          <div className="flex flex-col items-center p-6 rounded-xl border border-gray-300 shadow-xl">
            <Image
              src={landlord.avatar_url || defaultAvatar}
              alt="pic"
              width={200}
              height={200}
              className="rounded-full"
            />
            <h1 className="mt-6 text-2xl">{landlord.name}</h1>
            {userId !=params.id && (
              <ContactButton />
            )}
            
          </div>
        </div>
        <div className=" col-span-1 md:col-span-3 pl-0 md:pl-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            <Propertylist 
            landlord_id={params.id}/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandlordPage;
