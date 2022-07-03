import Image from "next/image";
import clsx from "clsx";
import Countdown from "react-countdown";
import { add } from "date-fns";

const renderer = ({ days, hours, minutes, seconds }) => (
  <div className="flex  justify-center  mb-2  border-b  pb-4">
    <div className="flex  flex-col  items-center  px-4  border-r  font-medium">
      <span className="font-black">{days < 10 ? "0" + days : days}</span> Days
    </div>

    <div className="flex  flex-col  items-center  px-4  border-r  font-medium">
      <span className="font-black">{hours < 10 ? "0" + hours : hours}</span>{" "}
      Hours
    </div>

    <div className="flex  flex-col  items-center  px-4  border-r  last:border-0  font-medium">
      <span className="font-black">
        {minutes < 10 ? "0" + minutes : minutes}
      </span>{" "}
      Mins
    </div>

    {days < 1 && (
      <div className="flex  flex-col  items-center  px-4  font-medium">
        <span className="font-black">
          {seconds < 10 ? "0" + seconds : seconds}
        </span>{" "}
        Secs
      </div>
    )}
  </div>
);

export default function Home({ nextRace, lastRace }) {
  console.log(lastRace.Results[0]);
  const hasFinished =
    new Date() >
    add(new Date(`${nextRace.date} ${nextRace.time}`), { hours: 3 });

  const inProgress =
    new Date() > new Date(`${nextRace.date} ${nextRace.time}`) &&
    new Date() <
      add(new Date(`${nextRace.date} ${nextRace.time}`), { hours: 3 });

  return (
    <>
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
            {inProgress
              ? "In progress"
              : hasFinished
              ? "Finished"
              : "Next Race"}
          </span>

          <div className="flex  mt-4  mb-2  font-bold">
            {nextRace.Circuit.flag && (
              <div className="mr-3  rounded-md  overflow-hidden">
                <Image
                  src={nextRace.Circuit.flag}
                  className="block"
                  width="40"
                  height="20"
                  alt={nextRace.Circuit.Location.country}
                  priority
                />
              </div>
            )}

            {nextRace.Circuit.Location.country}
          </div>

          <h2 className="text-4xl  font-lato  font-black  uppercase  tracking-wider  mb-6">
            {nextRace.raceName}
          </h2>

          <div className="inline-flex  flex-col  p-4  rounded-lg  shadow-md  bg-gray-800  text-white  font-bold  tracking-wider  w-full  md:w-auto">
            <Countdown
              date={new Date(`${nextRace.date} ${nextRace.time}`)}
              renderer={renderer}
            />

            {nextRace.events.map((event) => {
              const sessionInProgress =
                new Date() > new Date(`${event.date} ${event.time}`) &&
                new Date() <
                  add(new Date(`${event.date} ${event.time}`), {
                    hours: 3,
                  });

              return (
                <div
                  key={`current-event-card-` + event.date + event.time}
                  className={clsx(
                    "flex  justify-between  mt-1  font-light  text-white",
                    {
                      "opacity-25": !(
                        add(new Date(`${event.date} ${event.time}`), {
                          hours: 3,
                        }) > new Date()
                      ),
                    }
                  )}
                >
                  <span
                    className={clsx("w-full  md:pr-32", {
                      "text-green-600  font-bold": sessionInProgress,
                    })}
                  >
                    {event.name}
                  </span>

                  <span className="text-gray-400">
                    {new Date(`${event.date} ${event.time}`).toLocaleString(
                      "en-GB",
                      {
                        weekday: "short",
                      }
                    )}
                  </span>

                  <span className="shrink-0  inline-block  ml-2  bg-gray-500  rounded  w-16  text-center">
                    {new Date(`${event.date} ${event.time}`).toLocaleString(
                      "en-GB",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full  p-5  md:p-10  pb-0  md:pb-10  order-1  md:order-2">
          <div className="w-3/4  mx-auto">
            <img src="https://b.kisscc0.com/20180815/vwe/kisscc0-silverstone-circuit-2018-fia-formula-one-world-cha-f1-circuits-2014-2018-silverstone-5b74ebd21307c1.736966211534389202078.png" />
          </div>
        </div>
      </div>

      <div className="bg-gray-800">
        <div className="container  mx-auto  text-white  p-10">
          <h2 className="text-3xl  font-lato  font-black  uppercase  tracking-wider  mb-6">
            Previous race
          </h2>

          <div>{lastRace.raceName}</div>

          {lastRace.Results.slice(0, 3).map((result) => {
            return (
              <div key={`previous-race-position-${result.position}`}>
                {result.position} {result.Driver.givenName}{" "}
                {result.Driver.familyName}
                {result.FastestLap.rank === "1" ? "*" : ""}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const [races, lastRace] = await Promise.all([
    (
      await (await fetch("https://ergast.com/api/f1/2022.json")).json()
    ).MRData.RaceTable.Races,
    (
      await (
        await fetch("http://ergast.com/api/f1/current/last/results.json")
      ).json()
    ).MRData.RaceTable.Races[0],
  ]);

  const nextRace = races[Number(lastRace.round)];

  try {
    nextRace.Circuit.flag = (
      await (
        await fetch(
          `https://restcountries.com/v3.1/name/${nextRace.Circuit.Location.country.toLowerCase()}`
        )
      ).json()
    ).find(
      (country) =>
        country.name.common === nextRace.Circuit.Location.country ||
        country.altSpellings.includes(nextRace.Circuit.Location.country)
    ).flags.svg;
  } catch (e) {
    console.error(e);
  }

  nextRace.events = [
    {
      name: "Practice 1",
      ...nextRace.FirstPractice,
    },
    {
      name: "Practice 2",
      ...nextRace.SecondPractice,
    },
    {
      name: "Practice 3",
      ...nextRace.ThirdPractice,
    },
    {
      name: "Qualifying",
      ...nextRace.Qualifying,
    },
    {
      name: "Sprint",
      ...nextRace.Sprint,
    },
    { name: "Race", date: nextRace.date, time: nextRace.time },
  ]
    .filter((event) => event.date)
    .sort(
      (a, b) =>
        new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`)
    );

  return {
    revalidate: 60 * 60, // 1 hour
    props: {
      races,
      nextRace,
      lastRace,
    },
  };
};
