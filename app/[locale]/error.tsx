"use client";
import { FaExclamationCircle } from "react-icons/fa";
import Link from "next/link";

const ErrorPage = ({ error }: { error: any }) => {
  return (
    <section className="flex-grow min-h-screen bg-blue-50">
      <div className="container max-w-2xl py-24 m-auto">
        <div className="px-6 py-24 m-4 mb-4 bg-white border rounded-md shadow-md md:m-0">
          <div className="flex justify-center">
            <FaExclamationCircle className="text-yellow-400 text-8xl fa-5x" />
          </div>
          <div className="text-center">
            <h1 className="mt-4 mb-2 text-3xl font-bold">
              Something Went Wrong
            </h1>
            <p className="mb-10 text-xl text-gray-500">{error.toString()}</p>
            <Link
              href="/"
              className="px-6 py-4 font-bold text-white bg-blue-700 rounded hover:bg-blue-800"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-grow"></div>
    </section>
  );
};

export default ErrorPage;
