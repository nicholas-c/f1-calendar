import clsx from "clsx";
import Head from "next/head";
import { NextRace } from "../components/next-race/next-race.component";
import { RaceDataContext } from "../providers/race-data.context";

const Home = ({ races, nextRace, lastRace }) => (
  <RaceDataContext.Provider
    value={{
      nextRace,
      lastRace,
    }}
  >
    <Head>
      <title>Formula One 2022 race calendar</title>
    </Head>

    <NextRace />

    <div className="bg-gray-800">
      <div className="container  mx-auto  text-white  p-10">
        <h2 className="text-3xl  font-black  uppercase  tracking-wider  mb-6">
          Previous race
        </h2>

        <div>{lastRace.raceName}</div>

        {lastRace.Results.map((result) => (
          <div
            key={`previous-race-position-${result.position}`}
            className={clsx("flex", {
              "text-fuchsia-400": result?.FastestLap?.rank === "1",
            })}
          >
            {result.position}
            <span
              className={clsx("pl-4", {
                "font-bold": result?.FastestLap?.rank === "1",
              })}
            >
              {result.Driver.givenName} {result.Driver.familyName}
            </span>
            {result?.FastestLap?.rank === "1" && (
              <span className="material-symbols-outlined  text-fuchsia-400  pl-2">
                timer
              </span>
            )}
          </div>
        ))}
      </div>
    </div>

    {/* {races.map((race) => {
      return (
        <div key={race.date + race.time}>
          {race.raceName}
          {race.date}
          {race.time}
        </div>
      );
    })} */}
  </RaceDataContext.Provider>
);

export default Home;

export const getStaticProps = async () => {
  var [races, lastRace] = await Promise.all([
    (
      await (await fetch("https://ergast.com/api/f1/2023.json")).json()
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
