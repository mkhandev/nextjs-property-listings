"use server";

import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

const deleteProperty = async (propertyId: string) => {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const property = await Property.findById(propertyId);

  if (!property) throw new Error("Property Not Found");

  // Verify ownership
  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  const publicIds = property.images
    .map((imageUrl: string) => {
      const parts = imageUrl.split("/");
      const lastPart = parts.at(-1);
      return lastPart?.split(".")[0] ?? "";
    })
    .filter(Boolean); // Removes undefined or empty strings

  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy("propertylistings/" + publicId);
    }
  }

  await property.deleteOne();

  revalidatePath("/", "layout");
};

export default deleteProperty;
