import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

const SavedPropertiesPage = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  // NOTE: here we can make one database query by using Model.populate
  const user = await User.findById(userId)
    .populate("bookmarks")
    .lean<{ bookmarks: any[] } | null>();

  const bookmarks = user?.bookmarks ?? [];

  return (
    <section className="px-4 py-6">
      <div className="px-4 py-6 m-auto container-xl lg:container">
        <h1 className="mb-4 text-2xl">Saved Properties</h1>
        {bookmarks.length === 0 ? (
          <p>No saved properties</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {bookmarks.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default SavedPropertiesPage;
