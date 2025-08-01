import { Property } from "@/types";
import { FaShare } from "react-icons/fa";

const ShareButtons = ({ property }: { property: Property }) => {
  return (
    <button className="flex items-center justify-center w-full px-4 py-2 font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600">
      <FaShare className="mr-2" /> Share Property
    </button>
  );
};

export default ShareButtons;
