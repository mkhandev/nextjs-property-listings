"use client";

import deleteProperty from "@/lib/actions/deleteProperty";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const ProfileProperties = ({ properties }: { properties: any }) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDeleteProperty = async (propertyId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) return;

    setDeletingId(propertyId);

    try {
      await deleteProperty(propertyId);
      toast.success("Property successfully deleted.");
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeletingId(null);
    }
  };
  return (
    <>
      {properties.map((property: any) => (
        <div key={property._id} className="mb-10">
          <Link href={`/properties/${property._id}`}>
            <Image
              className="object-cover w-full h-32 rounded-md"
              src={property.images[0]}
              alt=""
              width={500}
              height={100}
              priority={true}
            />
          </Link>
          <div className="mt-2">
            <p className="text-lg font-semibold">{property.name}</p>
            <p className="text-gray-600">
              Address: {property.location.street} {property.location.city}{" "}
              {property.location.state}
            </p>
          </div>
          <div className="mt-2">
            <Link
              href={`/properties/${property._id}/edit`}
              className="px-3 py-3 mr-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Edit
            </Link>
            <button
              disabled={deletingId === property._id}
              onClick={() => handleDeleteProperty(property._id)}
              className="px-3 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
              type="button"
            >
              {deletingId === property._id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProfileProperties;
