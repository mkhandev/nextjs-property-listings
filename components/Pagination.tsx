import Link from "next/link";
import React from "react";
import clsx from "clsx";

type PaginationProps = {
  page: number;
  pageSize: number;
  totalItems: number;
};

const Pagination = ({ page, pageSize, totalItems }: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const getPageNumbers = () => {
    const pageLink = [];

    for (let i = 1; i <= totalPages; i++) {
      pageLink.push(i);
    }

    return pageLink;
  };

  const isPrevDisabled = page <= 1;
  const isNextDisabled = page >= totalPages;

  console.log(page, totalPages);

  return (
    <section className="container flex items-center justify-center gap-2 mx-auto my-8">
      <Link
        className={clsx(
          "px-2 py-1 ml-2 border border-gray-300 rounded",
          isPrevDisabled && "pointer-events-none text-gray-400 border-gray-200"
        )}
        href={isPrevDisabled ? "#" : `/properties?page=${page - 1}`}
        aria-disabled={isPrevDisabled}
      >
        Next
      </Link>

      {getPageNumbers().map((link) => (
        <Link
          key={link}
          href={`?page=${link}`}
          className={`px-3 py-1 rounded ${
            page === link
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {link}
        </Link>
      ))}

      <Link
        className={clsx(
          "px-2 py-1 ml-2 border border-gray-300 rounded",
          isNextDisabled && "pointer-events-none text-gray-400 border-gray-200"
        )}
        href={isNextDisabled ? "#" : `/properties?page=${page + 1}`}
        aria-disabled={true}
      >
        Next
      </Link>
    </section>
  );
};

export default Pagination;
