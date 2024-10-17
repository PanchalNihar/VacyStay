import Image from "next/image";
import Link from "next/link";
import ReservationSidebar from "@/app/components/properties/ReservationSidebar";

import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";

const PropertyDetailPage = async ({ params }: { params: { id: string } }) => {
  try {
    const property = await apiService.get(`/api/properties/${params.id}`);
    const userId = await getUserId();

    if (!property || !property.title) {
      return (
        <p>Property details could not be loaded. Please try again later.</p>
      );
    }
    console.log("Property fetched: ", property);
    const landlordName = property.landlord?.name || "Host unavailable";
    const landlordAvatar = property.landlord?.avatar_url || "/1.jpg";
    return (
      <main className="max-w-[1500px] mx-auto px-6 pb-6">
        <div className="relative w-full h-[64vh] mb-4 overflow-hidden rounded-xl">
          <Image
            src={property.image_url}
            layout="fill" // Or use `fill` directly as you were before
            objectFit="cover" // Ensures the image covers the entire div without distortion
            alt="Property Image"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="py-6 pr-6 col-span-3">
            <h1 className="mb-4 text-4xl">{property.title}</h1>

            <span className="mb-6 block text-lg text-gray-600">
              {property.guests} guests - {property.bedrooms} bedrooms -{" "}
              {property.bathrooms} bathrooms
            </span>

            <hr />

            <Link
              href={`/landlords/${property.landlord?.id}`}
              className="py-6 flex items-center space-x-4"
            >
              {landlordAvatar && (
                <Image
                  src={landlordAvatar}
                  width={50}
                  height={50}
                  className="rounded-full"
                  alt="The user name"
                />
              )}

              <p>
                <strong>{landlordName}</strong> your host
              </p>
            </Link>

            <hr />

            <p className="mt-6 text-lg">{property.description}</p>
          </div>

          <ReservationSidebar property={property} userId={userId} />
        </div>
      </main>
    );
  } catch (error) {
    console.error("Failed to fetch property details:", error);
    return <p>Error loading property details.</p>;
  }
};

export default PropertyDetailPage;
