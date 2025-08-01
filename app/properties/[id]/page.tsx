import PropertyDetails from "@/components/PropertyDetails";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import connectDB from "@/config/database";
import Property, { IProperty } from "@/models/Property";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

import { Property as TProperty } from "@/types";
import PropertyImages from "@/components/PropertyImages";
import { convertToSerializeAbleObject } from "@/utils/convertToObject";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";

const PropertyPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  await connectDB();
  const propertyDoc = (await Property.findById(id).lean()) as TProperty | null;
  const property = convertToSerializeAbleObject(propertyDoc);

  if (!property) {
    return (
      <div className="container p-6 mx-auto">
        <p className="text-xl text-red-600">Property not found.</p>
        <Link href="/properties" className="text-blue-500 underline">
          Go back to properties
        </Link>
      </div>
    );
  }

  return (
    <>
      <PropertyHeaderImage image={property.images?.[0]} />

      <section>
        <div className="container px-6 py-6 m-auto">
          <Link
            href="/properties"
            className="flex items-center text-blue-500 hover:text-blue-600"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>

      <section className="bg-blue-50">
        <div className="container px-6 py-10 m-auto">
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-[70%_30%]">
            <PropertyDetails property={property} />

            <aside className="space-y-4">
              <BookmarkButton property={property} />
              <ShareButtons property={property} />
              <PropertyContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>

      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyPage;
