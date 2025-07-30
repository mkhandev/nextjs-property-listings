import Image from "next/image";

const PropertyHeaderImage = ({ image }: { image?: string }) => {
  if (!image) return null;
  return (
    <section>
      <div className="m-auto container-xl">
        <div className="grid grid-cols-1">
          <Image
            src={`${image}`}
            alt="Property Image"
            width={0}
            height={0}
            className="object-cover h-[400px] w-full"
            sizes="100vw"
            priority={true}
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
