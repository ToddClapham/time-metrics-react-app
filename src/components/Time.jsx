import { useState, useEffect } from "react";
import { getTime } from "../http";
import { formatTimeStopwatch } from "../util/timeFormat";

export default function Time() {
  const [fetching, setIsFetching] = useState(false); // loading state
  const [timeInSeconds, setTimeInSeconds] = useState(0); // data state
  const [error, setError] = useState(null); // error state

  const [differenceTime, setDifferenceTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDifferenceTime(() => (Date.now() / 1000).toFixed(0) - timeInSeconds);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeInSeconds]);

  useEffect(() => {
    async function fetchTime() {
      setIsFetching(true);

      try {
        const time = await getTime();
        setTimeInSeconds(time);
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch time, please try again later.",
        });
      }
      setIsFetching(false);
    }

    fetchTime(); // Initial fetch

    const intervalId = setInterval(fetchTime, 30000); // Fetch every 30 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  return (
    <>
      <div className="p-8 max-w-96 rounded-lg bg-stone-600 text-neutral-100 text-center">
        <p className="text-5xl font-semibold mb-6">Time</p>
        {error && !fetching && (
          <p className="text-red-500">
            Error: {error.message}
            <br />
            Displayed time may be incorrect.
          </p>
        )}
        {fetching && <p className="text-lg font-normal">Loading time...</p>}
        {!fetching && (
          <>
            <p className="text-lg font-normal">
              Latest server time: {timeInSeconds.toLocaleString()}s
            </p>
            <p className="text-lg font-normal">
              Difference to current time: {formatTimeStopwatch(differenceTime)}
            </p>
          </>
        )}
      </div>
    </>
  );
}
