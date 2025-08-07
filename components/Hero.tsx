import React from "react";
import PropertySearchForm from "./PropertySearchForm";

const Hero = () => {
  return (
    <section className="py-20 mb-4 bg-orange-400">
      <div className="flex flex-col items-center px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            Find The Perfect Rental
          </h1>
          <p className="my-4 text-xl text-white">
            Discover the perfect property that suits your needs.
          </p>
        </div>
        {/* <!-- Form Component --> */}
        <PropertySearchForm />
      </div>
    </section>
  );
};

export default Hero;
