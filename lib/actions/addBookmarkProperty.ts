"use server";

import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

const addBookmarkProperty = async (propertyId: string) => {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const user = await User.findById(userId);

  // Check if property is bookmarked
  let isBookmarked = user.bookmarks.includes(propertyId);

  let message;

  if (isBookmarked) {
    user.bookmarks.pull(propertyId);
    message = "Bookmark removed successfully";
    isBookmarked = false;
  } else {
    user.bookmarks.push(propertyId);
    message = "Bookmark added successfully";
    isBookmarked = true;
  }

  await user.save();
  revalidatePath("/properties/saved", "page");

  return { message, isBookmarked };
};

export default addBookmarkProperty;
