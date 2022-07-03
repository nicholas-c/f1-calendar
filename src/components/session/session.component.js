import { useContext } from "react";
import { RaceDataContext } from "../../providers/race-data.context";
import { RaceCountdown } from "../countdown/countdown.component";
import { Sessions } from "../race-sessions/race-sessions.component";

const Session = () => {
  const { nextRace } = useContext(RaceDataContext);

  return (
    <div className="relative  inline-flex  flex-col  p-4  rounded-lg  shadow-md  bg-gray-800  text-white  font-bold  tracking-wider  w-full  md:w-auto">
      <RaceCountdown date={new Date(`${nextRace.date} ${nextRace.time}`)} />

      <Sessions />
    </div>
  );
};

export { Session };
