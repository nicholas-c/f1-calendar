import { NextRace } from "../components/next-race/next-race.component";
import { RaceDataContext } from "../providers/race-data.context";

const Home = ({ nextRace, lastRace }) => (
  <RaceDataContext.Provider
    value={{
      nextRace,
      lastRace,
    }}
  >
    <NextRace />

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
  </RaceDataContext.Provider>
);

export default Home;

export const getStaticProps = async () => {
  var [races, lastRace] = await Promise.all([
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
