import PropertyDetails from "@/components/PropertyDetails";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import connectDB from "@/config/database";
import Property, { IProperty } from "@/models/Property";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const PropertyPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  await connectDB();
  const property = await Property.findById(id).lean<IProperty | null>();

  return (
    <>
      <PropertyHeaderImage image={property?.images?.[0] ?? ""} />

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
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyPage;
