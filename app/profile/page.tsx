import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";
import profileDefault from "@/assets/images/profile.png";
import Image from "next/image";
import PropertyModel from "@/models/Property";
import { Property as PropertyType } from "@/types";
import ProfileProperties from "@/components/ProfileProperties";
import { convertToSerializeAbleObject } from "@/utils/convertToObject";

const page = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser) {
    throw new Error("User need authenticate");
  }

  const { userId } = sessionUser;

  const propertiesDocs = await PropertyModel.find({ owner: userId }).lean();
  const properties = propertiesDocs.map(convertToSerializeAbleObject);

  return (
    <section className="bg-blue-50">
      <div className="container py-24 m-auto">
        <div className="px-6 py-8 m-4 mb-4 bg-white border rounded-md shadow-md md:m-0">
          <h1 className="mb-4 text-3xl font-bold">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="mx-20 mt-10 md:w-1/4">
              <div className="mb-4">
                <Image
                  className="w-32 h-32 mx-auto rounded-full md:h-48 md:w-48 md:mx-0"
                  src={sessionUser?.user?.image || profileDefault}
                  width={200}
                  height={200}
                  alt="User"
                />
              </div>

              <h2 className="mb-4 text-2xl">
                <span className="block font-bold">Name: </span>{" "}
                {sessionUser?.user?.name}
              </h2>
              <h2 className="text-2xl">
                <span className="block font-bold">Email: </span>{" "}
                {sessionUser?.user?.email}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="mb-4 text-xl font-semibold">Your Listings</h2>
              {properties.length === 0 ? (
                <p>You have no property listings</p>
              ) : (
                <ProfileProperties properties={properties} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
