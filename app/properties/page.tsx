import connectDB from "@/config/database";
import PropertyCard from "@/components/PropertyCard";
import Property from "@/models/Property";
import { Property as TProperty } from "@/types";

const PropertiesPage = async () => {
  await connectDB();

  const rawProperties = await Property.find().lean();
  const properties: TProperty[] = rawProperties.map((property: any) => ({
    ...property,
    _id: property._id.toString(),
  }));

  return (
    <div className="px-4 py-6">
      <div className="py-8 m-auto container-xl lg:container">
        {properties.length === 0 ? (
          <p>No Properties Found</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {properties.map((property, index) => (
              <PropertyCard key={index} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;
