import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { RaceDataContext } from "../../providers/race-data.context";
import { RaceCountdown } from "../countdown/countdown.component";
import { Sessions } from "../race-sessions/race-sessions.component";
import { Spinner } from "../spinner/spinner.component";

const Session = () => {
  const { nextRace } = useContext(RaceDataContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [nextRace]);

  return (
    <div className="relative  inline-flex  flex-col  p-4  rounded-lg  shadow-md  bg-gray-800  text-white  font-bold  tracking-wider  w-full  md:w-auto">
      {loading && <Spinner />}

      <div
        className={clsx({
          "opacity-0": loading,
        })}
      >
        <RaceCountdown date={new Date(`${nextRace.date} ${nextRace.time}`)} />

        <Sessions />
      </div>
    </div>
  );
};

export { Session };
