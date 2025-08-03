import connectDB from "@/config/database";
import PropertyCard from "@/components/PropertyCard";
import Property from "@/models/Property";
import { Property as TProperty } from "@/types";
import Pagination from "@/components/Pagination";

const PAGE_SIZE = 10;

const PropertiesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  await connectDB();

  const { page } = await searchParams;

  const currentPage = Math.max(1, parseInt(page || "1"));
  const skip = (currentPage - 1) * PAGE_SIZE;

  const total = await Property.countDocuments();
  const showPagination = total > PAGE_SIZE;

  const rawProperties = await Property.find()
    .skip(skip)
    .limit(PAGE_SIZE)
    .lean();
  [];
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

        {showPagination && (
          <Pagination
            page={currentPage}
            pageSize={Number(PAGE_SIZE)}
            totalItems={total}
          />
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;
