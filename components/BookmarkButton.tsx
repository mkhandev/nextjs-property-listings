"use client";

import addBookmarkProperty from "@/lib/actions/addBookmarkProperty";
import checkBookmarkStatus from "@/lib/actions/checkBookmarkStatus";
import { Property } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

const BookmarkButton = ({ property }: { property: Property }) => {
  const { data: session } = useSession();
  const userId = (session?.user as any)?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    checkBookmarkStatus(property._id).then((res: any) => {
      if (res.error) toast.error(res.error);
      if (res.isBookmarked) setIsBookmarked(res.isBookmarked);
      setLoading(false);
    });
  }, [property._id, userId, checkBookmarkStatus]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to signin to bookmark a property");
      setLoading(false);
      return;
    }

    try {
      const res = await addBookmarkProperty(property._id);

      setIsBookmarked(res.isBookmarked);
      setLoading(false);
      toast.success(res.message);
    } catch (error: any) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="flex items-center justify-center w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-600"
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="flex items-center justify-center w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-600"
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
