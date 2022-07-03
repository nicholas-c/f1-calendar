import Image from "next/future/image";
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
              "bg-green-600": hasFinished,
              "bg-blue-500": inProgress,
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

      <div className="w-full  p-4  md:p-10  md:pb-10  order-1  md:order-2">
        <div className="w-3/4  md:w-auto  mx-auto">
          <Image
            src={`/tracks/${Number(nextRace.round) - 1}.svg`}
            alt={nextRace.raceName}
            className="max-h-80"
            height="500"
            width="500"
            priority
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
};

export { NextRace };
