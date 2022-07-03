import Countdown from "react-countdown";

const renderer = ({ days, hours, minutes, seconds }) => (
  <div className="flex  justify-center  mb-2  border-b  pb-4">
    {days > 1 && (
      <div className="flex  flex-col  items-center  px-4  border-r  font-medium">
        <span className="font-black">{days < 10 ? "0" + days : days}</span> Days
      </div>
    )}

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

const RaceCountdown = ({ date }) => (
  <Countdown date={date} renderer={renderer} />
);

export { RaceCountdown };
