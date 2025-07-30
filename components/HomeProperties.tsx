import Link from "next/link";
import PropertyCard from "./PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { Property as TProperty } from "@/types";

const HomeProperties = async () => {
  await connectDB();
  const rawRecentProperties = await Property.find()
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  const recentProperties: TProperty[] = rawRecentProperties.map(
    (property: any) => ({
      ...property,
      _id: property._id.toString(),
    })
  );

  return (
    <>
      <section className="px-4 py-6">
        <div className="m-auto container-xl lg:container">
          <h2 className="mb-6 text-3xl font-bold text-center text-blue-500">
            Recent Properties
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {recentProperties.length === 0 ? (
              <p>No Properties Found</p>
            ) : (
              recentProperties.map((property, index) => (
                <PropertyCard key={index} property={property} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className="max-w-lg px-6 m-auto my-10">
        <Link
          href="/properties"
          className="block px-6 py-4 text-center text-white bg-black rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
