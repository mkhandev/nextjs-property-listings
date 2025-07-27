import Link from "next/link";
import { ReactNode } from "react";

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
      <h2 className="text-2xl font-bold">{heading}</h2>
      <p className="mt-2 mb-4">{children}</p>
      <Link
        href={buttonInfo.link}
        className={`${buttonInfo.backgroundColor} inline-block px-4 py-2 text-white rounded-lg hover:bg-gray-70`}
      >
        {buttonInfo.text}
      </Link>
    </div>
  );
};

export default InfoBox;
