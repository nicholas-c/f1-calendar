import Image from "next/image";
import clsx from "clsx";
import { intervalToDuration } from "date-fns";

export default function Home({ races }) {
  const nextRace = races.find(
    (race) => new Date(`${race.date} ${race.time}`) > new Date()
  );

  let duration = intervalToDuration({
    start: new Date(`${nextRace.date} ${nextRace.time}`),
    end: new Date(),
  });

  console.log(duration);

  console.log(nextRace);

  return (
    <div>
      <div>
        <div className="container  mx-auto  flex  flex-col  md:flex-row  items-center">
          <div className="w-full  p-5  md:p-10  pt-0  md:pt-10  order-2  md:order-1">
            <span className="inline-block  py-2  px-4  bg-orange-400  rounded-md  text-sm  text-white  uppercase  font-bold">
              Next Race
            </span>

            <div className="flex  mt-4  mb-2  font-bold">
              <div className="mr-3  rounded-md  overflow-hidden">
                <Image
                  src="https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/gb.svg"
                  className="block"
                  width="40"
                  height="20"
                  alt={nextRace.Circuit.Location.country}
                  priority
                />
              </div>

              {nextRace.Circuit.Location.country}
            </div>

            <h2 className="text-3xl  font-bold  uppercase  tracking-wider  mb-6">
              {nextRace.raceName}
            </h2>

            <div className="inline-flex  flex-col  p-4  rounded-lg  shadow-md  bg-gray-800  text-white  font-bold  tracking-wider  w-full  md:w-auto">
              <div className="flex  justify-center  mb-2  border-b  pb-4">
                <div className="flex  flex-col  items-center  px-4  border-r  font-medium">
                  <span className="font-black">
                    {duration.days < 10 ? "0" + duration.days : duration.days}
                  </span>{" "}
                  Days
                </div>

                <div className="flex  flex-col  items-center  px-4  border-r  font-medium">
                  <span className="font-black">
                    {duration.hours < 10
                      ? "0" + duration.hours
                      : duration.hours}
                  </span>{" "}
                  Hours
                </div>

                <div className="flex  flex-col  items-center  px-4  font-medium">
                  <span className="font-black">
                    {duration.minutes < 10
                      ? "0" + duration.minutes
                      : duration.minutes}
                  </span>{" "}
                  Mins
                </div>
              </div>

              <div
                className={clsx(
                  "flex  justify-between  mt-1  font-light  text-white",
                  {
                    "opacity-25": !(
                      new Date(
                        `${nextRace.FirstPractice.date} ${nextRace.FirstPractice.time}`
                      ) > new Date()
                    ),
                  }
                )}
              >
                <span>Practice 1</span>

                <span className="text-gray-400">
                  {new Date(
                    `${nextRace.FirstPractice.date} ${nextRace.FirstPractice.time}`
                  ).toLocaleString("en-GB", {
                    weekday: "short",
                  })}
                </span>

                <span className="inline-block  ml-2  bg-gray-500  rounded  px-2">
                  {new Date(
                    `${nextRace.FirstPractice.date} ${nextRace.FirstPractice.time}`
                  ).toLocaleString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <div
                className={clsx(
                  "flex  justify-between  mt-1  font-light  text-white",
                  {
                    "opacity-25": !(
                      new Date(
                        `${nextRace.SecondPractice.date} ${nextRace.SecondPractice.time}`
                      ) > new Date()
                    ),
                  }
                )}
              >
                <span>Practice 2</span>

                <span className="text-gray-400">
                  {new Date(
                    `${nextRace.SecondPractice.date} ${nextRace.SecondPractice.time}`
                  ).toLocaleString("en-GB", {
                    weekday: "short",
                  })}
                </span>

                <span className="inline-block  ml-2  bg-gray-500  rounded  px-2">
                  {new Date(
                    `${nextRace.SecondPractice.date} ${nextRace.SecondPractice.time}`
                  ).toLocaleString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <div
                className={clsx(
                  "flex  justify-between  mt-1  font-light  text-white",
                  {
                    "opacity-25": !(
                      new Date(
                        `${nextRace.ThirdPractice.date} ${nextRace.ThirdPractice.time}`
                      ) > new Date()
                    ),
                  }
                )}
              >
                <span>Practice 3</span>

                <span className="text-gray-400">
                  {new Date(
                    `${nextRace.ThirdPractice.date} ${nextRace.ThirdPractice.time}`
                  ).toLocaleString("en-GB", {
                    weekday: "short",
                  })}
                </span>

                <span className="inline-block  ml-2  bg-gray-500  rounded  px-2">
                  {new Date(
                    `${nextRace.ThirdPractice.date} ${nextRace.ThirdPractice.time}`
                  ).toLocaleString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <div
                className={clsx(
                  "flex  justify-between  mt-1  font-light  text-white",
                  {
                    "opacity-25": !(
                      new Date(
                        `${nextRace.Qualifying.date} ${nextRace.Qualifying.time}`
                      ) > new Date()
                    ),
                  }
                )}
              >
                <span>Qualifying</span>

                <span className="text-gray-400">
                  {new Date(
                    `${nextRace.Qualifying.date} ${nextRace.Qualifying.time}`
                  ).toLocaleString("en-GB", {
                    weekday: "short",
                  })}
                </span>

                <span className="inline-block  ml-2  bg-gray-500  rounded  px-2">
                  {new Date(
                    `${nextRace.Qualifying.date} ${nextRace.Qualifying.time}`
                  ).toLocaleString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <div
                className={clsx(
                  "flex  justify-between  mt-1  font-light  text-white",
                  {
                    "opacity-25": !(
                      new Date(`${nextRace.date} ${nextRace.time}`) > new Date()
                    ),
                  }
                )}
              >
                <span>
                  Race&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>

                <span className="text-gray-400">
                  {new Date(`${nextRace.date} ${nextRace.time}`).toLocaleString(
                    "en-GB",
                    {
                      weekday: "short",
                    }
                  )}
                </span>

                <span className="inline-block  ml-2  bg-gray-500  rounded  px-2">
                  {new Date(`${nextRace.date} ${nextRace.time}`).toLocaleString(
                    "en-GB",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full  p-5  md:p-10  pb-0  md:pb-10  order-1  md:order-2">
            <div className="w-3/4  mx-auto">
              <img src="https://b.kisscc0.com/20180815/vwe/kisscc0-silverstone-circuit-2018-fia-formula-one-world-cha-f1-circuits-2014-2018-silverstone-5b74ebd21307c1.736966211534389202078.png" />
            </div>
          </div>
        </div>
      </div>

      <div>
        Next Race:{" "}
        {new Date(`${nextRace.date} ${nextRace.time}`).toLocaleString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        {nextRace.raceName}
      </div>

      {races.map((race) => {
        return (
          <div key={race.date + race.time}>
            {race.raceName}
            {race.date}
            {race.time}
          </div>
        );
      })}
    </div>
  );
}

export const getStaticProps = async (ctx) => {
  const data = await fetch("https://ergast.com/api/f1/2022.json");

  return {
    revalidate: 300,
    props: {
      races: (await data.json()).MRData.RaceTable.Races,
    },
  };
};
