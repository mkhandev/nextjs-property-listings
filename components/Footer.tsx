import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { IoHomeOutline } from "react-icons/io5";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-4 mt-24 bg-[#faf3e6]">
      <div className="container flex flex-col items-center justify-between px-4 mx-auto md:flex-row">
        <div className="mb-4 md:mb-0">
          {/* <Image src={logo} alt="Logo" className="w-auto h-8" /> */}
          <IoHomeOutline size={45} style={{ color: "orange" }} />
        </div>
        <div className="flex flex-wrap justify-center mb-4 md:justify-start md:mb-0">
          <ul className="flex space-x-4">
            <li>
              <Link href="/properties" className="hover:text-orange-400">
                Properties
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-orange-400">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mt-2 text-sm md:mt-0">
            &copy; {currentYear} PropertyListings. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
