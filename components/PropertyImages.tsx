import Image from "next/image";

const PropertyImages = ({ images }: { images?: string[] }) => {
  if (!images || images.length === 0) return null;
  return (
    <section className="p-4 bg-blue-50">
      <div className="container mx-auto">
        {images.length === 1 ? (
          <Image
            src={images[0]}
            alt=""
            className="object-cover h-[400px] mx-auto rounded-xl"
            width={1800}
            height={400}
            priority={true}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`${
                  images.length === 3 && index === 2
                    ? "col-span-2"
                    : "col-span-1"
                }`}
              >
                <Image
                  src={image}
                  alt=""
                  className="object-cover h-[400px] w-full"
                  width={1800}
                  height={400}
                  priority={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;
