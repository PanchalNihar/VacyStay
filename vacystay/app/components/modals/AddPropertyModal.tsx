"use client";
import Image from "next/image";
import Modal from "./Modals";
import Categories from "../addProperty/Categories";
import usePropertyModal from "@/app/hooks/usePropertyModal";
import CustomButtons from "../forms/CustomButtons";
import { ChangeEvent, useState } from "react";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";

const AddPropertModal = () => {
  const addPropertymodal = usePropertyModal();
  const router = useRouter();
  const [errors, setErrors] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dataTitle, setDataTitle] = useState("");
  const [dataDescription, setDataDescription] = useState("");
  const [dataPrice, setDataPrice] = useState("");
  const [dataBedrooms, setDataBedrooms] = useState("");
  const [dataBathrooms, setDataBathrooms] = useState("");
  const [dataGuests, setDataGuests] = useState("");
  const [dataCountry, setDataCountry] = useState<SelectCountryValue>();
  const [dataImage, setDataImage] = useState<File | null>(null);

  const setCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const setImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const tmpImage = event.target.files[0];
      setDataImage(tmpImage);
    } else {
      console.log("error");
    }
  };

  const submitForm = async () => {
    console.log("Submit form");
    if (
      dataTitle &&
      dataDescription &&
      dataPrice &&
      dataCountry &&
      dataImage &&
      selectedCategory
    ) {
      const formData = new FormData();
      formData.append("title", dataTitle);
      formData.append("description", dataDescription);
      formData.append("price_per_night", dataPrice);
      formData.append("bedrooms", dataBedrooms);
      formData.append("bathrooms", dataBathrooms);
      formData.append("guests", dataGuests);
      formData.append("country", dataCountry.label);
      formData.append("country_code", dataCountry.value);
      formData.append("image", dataImage);
      formData.append("category", selectedCategory);

      const response = await apiService.post("/api/properties/create/", formData);
      if (response.success) {
        console.log("Success");
        router.push('/?added=true');
        addPropertymodal.close();
      } else {
        const tmperror: string[] = Object.values(response).map((error: any) => {
          return error;
        });
        setErrors(tmperror);
      }
    }
  };

  const content = (
    <>
      {currentStep === 1 ? (
        <>
          <h2 className="mb-4 text-2xl font-semibold text-center">Choose Category</h2>
          <Categories
            selectedCategory={selectedCategory}
            setCategory={setCategory}
          />
          <CustomButtons label="Next" onClick={() => setCurrentStep(2)} />
        </>
      ) : currentStep === 2 ? (
        <>
          <h2 className="mb-4 text-2xl font-semibold text-center">Describe Your Place</h2>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="font-medium">Title</label>
              <input
                type="text"
                value={dataTitle}
                onChange={(e) => setDataTitle(e.target.value)}
                className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-medium">Description</label>
              <textarea
                value={dataDescription}
                onChange={(e) => setDataDescription(e.target.value)}
                className="w-full h-32 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <CustomButtons label="Previous" onClick={() => setCurrentStep(1)} className="bg-gray-200" />
            <CustomButtons label="Next" onClick={() => setCurrentStep(3)} />
          </div>
        </>
      ) : currentStep === 3 ? (
        <>
          <h2 className="mb-4 text-2xl font-semibold text-center">Details</h2>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="font-medium">Price per Night</label>
              <input
                type="text"
                value={dataPrice}
                onChange={(e) => setDataPrice(e.target.value)}
                className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-medium">Bedrooms</label>
              <input
                type="text"
                value={dataBedrooms}
                onChange={(e) => setDataBedrooms(e.target.value)}
                className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-medium">Bathrooms</label>
              <input
                type="text"
                value={dataBathrooms}
                onChange={(e) => setDataBathrooms(e.target.value)}
                className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-medium">Maximum Guests</label>
              <input
                type="text"
                value={dataGuests}
                onChange={(e) => setDataGuests(e.target.value)}
                className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <CustomButtons label="Previous" onClick={() => setCurrentStep(2)} className="bg-gray-200" />
            <CustomButtons label="Next" onClick={() => setCurrentStep(4)} />
          </div>
        </>
      ) : currentStep === 4 ? (
        <>
          <h2 className="mb-4 text-2xl font-semibold text-center">Location</h2>
          <div className="space-y-4">
            <SelectCountry
              value={dataCountry}
              onChange={(value) => setDataCountry(value as SelectCountryValue)}
            />
          </div>
          <div className="flex justify-between mt-4">
            <CustomButtons label="Previous" onClick={() => setCurrentStep(3)} className="bg-gray-200" />
            <CustomButtons label="Next" onClick={() => setCurrentStep(5)} />
          </div>
        </>
      ) : (
        <>
          <h2 className="mb-4 text-2xl font-semibold text-center">Image</h2>
          <div className="space-y-4">
            <div className="py-4 px-6 bg-gray-600 text-white rounded-lg">
              <input type="file" accept="image/*" onChange={setImage} />
            </div>
            {dataImage && (
              <div className="w-full h-48 relative">
                <Image
                  fill
                  alt="Uploaded Image"
                  src={URL.createObjectURL(dataImage)}
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
            )}
          </div>
          {errors.map((error, index) => (
            <div key={index} className="p-5 mb-4 bg-red-600 text-white rounded-lg">
              {error}
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <CustomButtons label="Previous" onClick={() => setCurrentStep(4)} className="bg-gray-200" />
            <CustomButtons label="Submit" onClick={submitForm} />
          </div>
        </>
      )}
    </>
  );

  return (
    <Modal
      isOpen={addPropertymodal.isOpen}
      close={addPropertymodal.close}
      label="Add Property"
      content={content}
    />
  );
};

export default AddPropertModal;
