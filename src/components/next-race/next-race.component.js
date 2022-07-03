import Image from "next/image";
import clsx from "clsx";
import { useContext } from "react";
import { add } from "date-fns";
import { RaceDataContext } from "../../providers/race-data.context";
import { RaceCountdown } from "../countdown/countdown.component";
import { Session } from "../session/session.component";
import { LocationIndicator } from "../location-indicator/location-indicator.component";

const NextRace = () => {
  const { nextRace } = useContext(RaceDataContext);

  const hasFinished =
    new Date() >
    add(new Date(`${nextRace.date} ${nextRace.time}`), { hours: 3 });

  const inProgress =
    new Date() > new Date(`${nextRace.date} ${nextRace.time}`) &&
    new Date() <
      add(new Date(`${nextRace.date} ${nextRace.time}`), { hours: 3 });

  return (
    <div className="container  mx-auto  flex  flex-col  md:flex-row  items-center">
      <div className="w-full  p-5  md:p-10  pt-0  md:pt-10  order-2  md:order-1">
        <span
          className={clsx(
            "inline-block  py-2  px-4  rounded-md  text-sm  text-white  uppercase  font-bold",
            {
              "bg-orange-400": !inProgress && !hasFinished,
              "bg-blue-500": inProgress,
              "bg-green-600": hasFinished,
            }
          )}
        >
          {inProgress ? "In progress" : hasFinished ? "Finished" : "Next Race"}
        </span>

        <LocationIndicator
          countryName={nextRace.Circuit.Location.country}
          flagUrl={nextRace.Circuit.flag}
        />

        <h2 className="text-4xl  font-lato  font-black  uppercase  tracking-wider  mb-6">
          {nextRace.raceName}
        </h2>

        <Session />
      </div>

      <div className="w-full  p-5  md:p-10  pb-0  md:pb-10  order-1  md:order-2">
        <div className="w-3/4  md:w-auto  mx-auto">
          <Image
            src={`/circuits/${nextRace.Circuit.Location.country.toLowerCase()}.svg`}
            alt={nextRace.raceName}
            width="1000"
            height="1000"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export { NextRace };
