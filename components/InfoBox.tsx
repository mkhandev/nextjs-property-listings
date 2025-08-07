import Link from "next/link";
import { ReactNode } from "react";
import { AiOutlinePropertySafety } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";

type InfoBoxProps = {
  heading: string;
  children: ReactNode; // Accepts string, JSX elements, or both
  backgroundColor?: string;
  buttonInfo: {
    text: string;
    link: string;
    backgroundColor: string;
  };
};

const InfoBox = ({
  heading,
  children,
  backgroundColor = "bg-gray-100",
  buttonInfo,
}: InfoBoxProps) => {
  return (
    <div className={`p-6 ${backgroundColor} rounded-lg shadow-md`}>
      <h2 className="flex items-center gap-2 text-2xl font-bold">
        {heading == "For Rentals" ? (
          <FaRegUser style={{ color: "orangered" }} size={27} />
        ) : (
          <AiOutlinePropertySafety style={{ color: "orangered" }} size={27} />
        )}

        {heading}
      </h2>
      <p className="mt-2 mb-4">{children}</p>
      <Link
        href={buttonInfo.link}
        className={`${buttonInfo.backgroundColor} inline-block px-4 py-2 text-white rounded-lg hover:bg-orange-500`}
      >
        {buttonInfo.text}
      </Link>
    </div>
  );
};

export default InfoBox;
