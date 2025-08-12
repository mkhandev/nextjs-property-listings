import connectDB from "@/config/database";
import PropertyEditForm from "@/components/PropertyEditForm";
import Property from "@/models/Property";
import { convertToSerializeAbleObject } from "@/utils/convertToObject";
import { Property as TProperty } from "@/types";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  await connectDB();

  const { id } = await params;

  const propertyDoc = (await Property.findById(id).lean()) as TProperty | null;
  const property = convertToSerializeAbleObject(propertyDoc);

  return (
    <section className="bg-blue-50">
      <div className="container max-w-2xl py-24 m-auto">
        <div className="px-6 py-8 m-4 mb-4 bg-white border rounded-md shadow-md md:m-0">
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
};

export default page;
