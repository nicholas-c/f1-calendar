import { useContext } from "react";
import clsx from "clsx";
import { add } from "date-fns";
import { RaceDataContext } from "../../providers/race-data.context";

const Sessions = () => {
  const { nextRace } = useContext(RaceDataContext);

  return (
    <>
      {nextRace.events.map((event) => {
        const hasFinished =
          new Date() >
          add(new Date(`${event.date} ${event.time}`), { hours: 3 });

        const inProgress =
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
                "opacity-25": hasFinished,
              }
            )}
          >
            <span
              className={clsx("w-full  md:pr-32", {
                "text-green-600  font-bold": inProgress,
              })}
            >
              {event.name}
            </span>

            <time
              dateTime={`${event.date}T${event.time}`}
              className="flex  justify-between"
            >
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
            </time>
          </div>
        );
      })}
    </>
  );
};

export { Sessions };
