"use client";
import Modal from "./Modals";
import useSearchModal, { SearchQuery } from "@/app/hooks/useSearchModal";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry";
import { useState } from "react";
import CustomButtons from "../forms/CustomButtons";
import { Range } from "react-date-range";
import DatePicker from "../forms/Calendar";
const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};
const SearchModal = () => {
  let content = <></>;
  const searchModal = useSearchModal();
  const [country, setCountry] = useState<SelectCountryValue>();
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [numGuests, setNumGuests] = useState<string>("1");
  const [numBedrooms, setNumBedrooms] = useState<string>("0");
  const [numBathrooms, setNumBathrooms] = useState<string>("0");

  //closing modal
  const closeAndSearch = () => {
    const newSearchQuery:SearchQuery={
        country:country?.label,
        checkIn:dateRange.startDate,
        checkOut:dateRange.endDate,
        guests:parseInt(numGuests),
        bedrooms:parseInt(numBedrooms),
        bathrooms:parseInt(numBathrooms),
        category:''
    }
    searchModal.setQuery(newSearchQuery)
    searchModal.close();
  };

  //set Darte range
  const _setDateRange = (selection: Range) => {
    if (searchModal.step == "checkin") {
      searchModal.open("checkout");
    } else if (searchModal.step == "chechout") {
      searchModal.open("details");
    }
    setDateRange(selection);
  };

  //content
  const contentLocation = (
    <>
      <h2 className="mb-6 text-2xl">where do you want to go?</h2>
      <SelectCountry
        value={country}
        onChange={(value) => setCountry(value as SelectCountryValue)}
      />
      <div className="mt-6 flex flex-row gap-4">
        <CustomButtons
          label="Check in date"
          onClick={() => searchModal.open("checkin")}
        />
      </div>
    </>
  );
  const contentCheckIn = (
    <>
      <h2 className="mb-6 text-2xl">check in date</h2>
      <DatePicker
        value={dateRange}
        onChange={(value) => _setDateRange(value.selection)}
      />
      <div className="mt-6 flex flex-row gap-4">
        <CustomButtons
          label="Location"
          onClick={() => searchModal.open("location")}
        />
        <CustomButtons
          label="Check out date"
          onClick={() => searchModal.open("checkout")}
        />
      </div>
    </>
  );

  const contentCheckOut = (
    <>
      <h2 className="mb-6 text-2xl">check out date</h2>
      <DatePicker
        value={dateRange}
        onChange={(value) => _setDateRange(value.selection)}
      />
      <div className="mt-6 flex flex-row gap-4">
        <CustomButtons
          label="Check in Dates"
          onClick={() => searchModal.open("checkin")}
        />
        <CustomButtons
          label="Details"
          onClick={() => searchModal.open("details")}
        />
      </div>
    </>
  );
  const contentDetails = (
    <>
      <h2 className="mb-6 text-2xl">Details</h2>
      <div className="space-y-4">
        <div className="space-y-4">
          <label>Number of guests:</label>
          <input
            type="number"
            min="1"
            placeholder="number of guests"
            value={numGuests}
            onChange={(e) => setNumGuests(e.target.value)}
            className="w-full h-14 px-4 border-gray-300 rounded-xl"
          />
        </div>
        <div className="space-y-4">
          <label>Number of bedrooms:</label>
          <input
            type="number"
            min="0"
            placeholder="number of bedrooms"
            value={numBedrooms}
            onChange={(e) => setNumBedrooms(e.target.value)}
            className="w-full h-14 px-4 border-gray-300 rounded-xl"
          />
        </div>
        <div className="space-y-4">
          <label>Number of bathrooms:</label>
          <input
            type="number"
            min="0"
            placeholder="number of bathrooms"
            value={numBathrooms}
            onChange={(e) => setNumBathrooms(e.target.value)}
            className="w-full h-14 px-4 border-gray-300 rounded-xl"
          />
        </div>
      </div>
      <div className="mt-6 flex flex-row gap-4">
        <CustomButtons
          label="Check out Dates"
          onClick={() => searchModal.open("checkout")}
        />
        <CustomButtons label="Search" onClick={closeAndSearch} />
      </div>
    </>
  );
  if (searchModal.step == "location") {
    content = contentLocation;
  } else if (searchModal.step == "checkin") {
    content = contentCheckIn;
  } else if (searchModal.step == "checkout") {
    content = contentCheckOut;
  } else if (searchModal.step == "details") {
    content = contentDetails;
  }
  return (
    <>
      <Modal
        label="search"
        isOpen={searchModal.isOpen}
        close={searchModal.close}
        content={content}
      />
    </>
  );
};
export default SearchModal;
