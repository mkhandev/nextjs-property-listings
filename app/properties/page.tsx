import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";
//import properties from "@/properties.json";

const PropertiesPage = async () => {
  await connectDB();
  const properties = await Property.find().lean();

  return (
    <div className="px-4 py-6">
      <div className="py-8 m-auto container-xl lg:container">
        {properties.length === 0 ? (
          <p>No Properties Found</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;
