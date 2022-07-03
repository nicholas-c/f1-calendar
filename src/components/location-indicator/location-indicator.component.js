import Image from "next/future/image";

const LocationIndicator = ({ countryName, flagUrl }) => (
  <div className="flex  gap-3  mt-4  mb-2  font-bold">
    {flagUrl && (
      <Image
        src={flagUrl}
        className="block  mr-3  rounded-md  overflow-hidden"
        width="40"
        height="24"
        alt={countryName}
        priority
      />
    )}

    {countryName}
  </div>
);

export { LocationIndicator };
