"use client";

import updateProperty from "@/lib/actions/updateProperty";
import { Property } from "@/types";
import React from "react";
import SubmitButton from "./SubmitButton";

const PropertyEditForm = ({ property }: { property: Property }) => {
  const updatePropertyById = updateProperty.bind(null, property._id);

  return (
    <form action={updatePropertyById}>
      <h2 className="mb-6 text-3xl font-semibold text-center">Edit Property</h2>

      <div className="mb-4">
        <label htmlFor="type" className="block mb-2 font-bold text-gray-700">
          Property Type
        </label>
        <select
          id="type"
          name="type"
          className="w-full px-3 py-2 border rounded"
          required
          defaultValue={property.type}
        >
          <option value="Apartment">Apartment</option>
          <option value="Condo">Condo</option>
          <option value="House">House</option>
          <option value="CabinOrCottage">Cabin or Cottage</option>
          <option value="Room">Room</option>
          <option value="Studio">Studio</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold text-gray-700">
          Listing Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full px-3 py-2 mb-2 border rounded"
          placeholder="eg. Beautiful Apartment In Miami"
          required
          defaultValue={property.name}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block mb-2 font-bold text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="w-full px-3 py-2 border rounded"
          rows={4}
          placeholder="Add an optional description of your property"
          defaultValue={property.description}
        ></textarea>
      </div>

      <div className="p-4 mb-4 bg-blue-50">
        <label className="block mb-2 font-bold text-gray-700">Location</label>
        <input
          type="text"
          id="street"
          name="location.street"
          className="w-full px-3 py-2 mb-2 border rounded"
          placeholder="Street"
          defaultValue={property.location.street}
        />
        <input
          type="text"
          id="city"
          name="location.city"
          className="w-full px-3 py-2 mb-2 border rounded"
          placeholder="City"
          required
          defaultValue={property.location.city}
        />
        <input
          type="text"
          id="state"
          name="location.state"
          className="w-full px-3 py-2 mb-2 border rounded"
          placeholder="State"
          required
          defaultValue={property.location.state}
        />
        <input
          type="text"
          id="zipcode"
          name="location.zipcode"
          className="w-full px-3 py-2 mb-2 border rounded"
          placeholder="Zipcode"
          defaultValue={property.location.zipcode}
        />
        <input
          type="text"
          id="country"
          name="location.country"
          className="w-full px-3 py-2 mb-2 border rounded"
          placeholder="Country"
          required
          defaultValue={property.location.country}
        />
      </div>

      <div className="pb-4 pl-4 pr-4 mb-4 bg-blue-50">
        <div className="pt-4 pb-4">
          Add latitude and longitude for better google map
        </div>
        <input
          type="text"
          id="latitude"
          name="location.latitude"
          className="w-full px-3 py-2 mb-2 border rounded"
          placeholder="Latitude"
          defaultValue={property.location.latitude}
        />
        <input
          type="text"
          id="longitude"
          name="location.longitude"
          className="w-full px-3 py-2 mb-2 border rounded"
          placeholder="Longitude"
          defaultValue={property.location.longitude}
        />
      </div>

      <div className="flex flex-wrap mb-4">
        <div className="w-full pr-2 sm:w-1/3">
          <label htmlFor="beds" className="block mb-2 font-bold text-gray-700">
            Beds
          </label>
          <input
            type="number"
            id="beds"
            name="beds"
            className="w-full px-3 py-2 border rounded"
            required
            defaultValue={property.beds}
          />
        </div>
        <div className="w-full px-2 sm:w-1/3">
          <label htmlFor="baths" className="block mb-2 font-bold text-gray-700">
            Baths
          </label>
          <input
            type="number"
            id="baths"
            name="baths"
            className="w-full px-3 py-2 border rounded"
            required
            defaultValue={property.baths}
          />
        </div>
        <div className="w-full pl-2 sm:w-1/3">
          <label
            htmlFor="square_feet"
            className="block mb-2 font-bold text-gray-700"
          >
            Square Feet
          </label>
          <input
            type="number"
            id="square_feet"
            name="square_feet"
            className="w-full px-3 py-2 border rounded"
            required
            defaultValue={property.square_feet}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-bold text-gray-700">Amenities</label>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          <div>
            <input
              type="checkbox"
              id="amenity_wifi"
              name="amenities"
              value="Wifi"
              className="mr-2"
              defaultChecked={property.amenities.includes("Wifi")}
            />
            <label htmlFor="amenity_wifi">Wifi</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_kitchen"
              name="amenities"
              value="Full kitchen"
              className="mr-2"
              defaultChecked={property.amenities.includes("Full kitchen")}
            />
            <label htmlFor="amenity_kitchen">Full kitchen</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_washer_dryer"
              name="amenities"
              value="Washer & Dryer"
              className="mr-2"
              defaultChecked={property.amenities.includes("Washer & Dryer")}
            />
            <label htmlFor="amenity_washer_dryer">Washer & Dryer</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_free_parking"
              name="amenities"
              value="Free Parking"
              className="mr-2"
              defaultChecked={property.amenities.includes("Free Parking")}
            />
            <label htmlFor="amenity_free_parking">Free Parking</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_pool"
              name="amenities"
              value="Swimming Pool"
              className="mr-2"
              defaultChecked={property.amenities.includes("Swimming Pool")}
            />
            <label htmlFor="amenity_pool">Swimming Pool</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_hot_tub"
              name="amenities"
              value="Hot Tub"
              className="mr-2"
              defaultChecked={property.amenities.includes("Hot Tub")}
            />
            <label htmlFor="amenity_hot_tub">Hot Tub</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_24_7_security"
              name="amenities"
              value="24/7 Security"
              className="mr-2"
              defaultChecked={property.amenities.includes("24/7 Security")}
            />
            <label htmlFor="amenity_24_7_security">24/7 Security</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_wheelchair_accessible"
              name="amenities"
              value="Wheelchair Accessible"
              className="mr-2"
              defaultChecked={property.amenities.includes(
                "Wheelchair Accessible"
              )}
            />
            <label htmlFor="amenity_wheelchair_accessible">
              Wheelchair Accessible
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_elevator_access"
              name="amenities"
              value="Elevator Access"
              className="mr-2"
              defaultChecked={property.amenities.includes("Elevator Access")}
            />
            <label htmlFor="amenity_elevator_access">Elevator Access</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_dishwasher"
              name="amenities"
              value="Dishwasher"
              className="mr-2"
              defaultChecked={property.amenities.includes("Dishwasher")}
            />
            <label htmlFor="amenity_dishwasher">Dishwasher</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_gym_fitness_center"
              name="amenities"
              value="Gym/Fitness Center"
              className="mr-2"
              defaultChecked={property.amenities.includes("Gym/Fitness Center")}
            />
            <label htmlFor="amenity_gym_fitness_center">
              Gym/Fitness Center
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_air_conditioning"
              name="amenities"
              value="Air Conditioning"
              className="mr-2"
              defaultChecked={property.amenities.includes("Air Conditioning")}
            />
            <label htmlFor="amenity_air_conditioning">Air Conditioning</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_balcony_patio"
              name="amenities"
              value="Balcony/Patio"
              className="mr-2"
              defaultChecked={property.amenities.includes("Balcony/Patio")}
            />
            <label htmlFor="amenity_balcony_patio">Balcony/Patio</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_smart_tv"
              name="amenities"
              value="Smart TV"
              className="mr-2"
              defaultChecked={property.amenities.includes("Smart TV")}
            />
            <label htmlFor="amenity_smart_tv">Smart TV</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_coffee_maker"
              name="amenities"
              value="Coffee Maker"
              className="mr-2"
              defaultChecked={property.amenities.includes("Coffee Maker")}
            />
            <label htmlFor="amenity_coffee_maker">Coffee Maker</label>
          </div>
        </div>
      </div>

      <div className="p-4 mb-4 bg-blue-50">
        <label className="block mb-2 font-bold text-gray-700">
          Rates (Leave blank if not applicable)
        </label>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="flex items-center">
            <label htmlFor="weekly_rate" className="mr-2">
              Weekly
            </label>
            <input
              type="number"
              id="weekly_rate"
              name="rates.weekly"
              className="w-full px-3 py-2 border rounded"
              defaultValue={property.rates.weekly}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="monthly_rate" className="mr-2">
              Monthly
            </label>
            <input
              type="number"
              id="monthly_rate"
              name="rates.monthly"
              className="w-full px-3 py-2 border rounded"
              defaultValue={property.rates.monthly}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="nightly_rate" className="mr-2">
              Nightly
            </label>
            <input
              type="number"
              id="nightly_rate"
              name="rates.nightly"
              className="w-full px-3 py-2 border rounded"
              defaultValue={property.rates.nightly}
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="seller_name"
          className="block mb-2 font-bold text-gray-700"
        >
          Seller Name
        </label>
        <input
          type="text"
          id="seller_name"
          name="seller_info.name"
          className="w-full px-3 py-2 border rounded"
          placeholder="Name"
          defaultValue={property.seller_info.name}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="seller_email"
          className="block mb-2 font-bold text-gray-700"
        >
          Seller Email
        </label>
        <input
          type="email"
          id="seller_email"
          name="seller_info.email"
          className="w-full px-3 py-2 border rounded"
          placeholder="Email address"
          required
          defaultValue={property.seller_info.email}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="seller_phone"
          className="block mb-2 font-bold text-gray-700"
        >
          Seller Phone
        </label>
        <input
          type="tel"
          id="seller_phone"
          name="seller_info.phone"
          className="w-full px-3 py-2 border rounded"
          placeholder="Phone"
          defaultValue={property.seller_info.phone}
        />
      </div>
      <div>
        <SubmitButton defaultText="Update Property" pendingText="Updating..." />
      </div>
    </form>
  );
};

export default PropertyEditForm;
