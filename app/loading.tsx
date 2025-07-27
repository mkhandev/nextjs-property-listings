"use client";
import { PuffLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "100px auto",
};

const LoadingPage = () => {
  return (
    <PuffLoader
      color="#3b82f6"
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
};
export default LoadingPage;
