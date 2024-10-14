import { useEffect, useState } from "react";
import { getMetrics } from "../http";

export default function Metrics() {
  const [fetching, setIsFetching] = useState(false); // loading state
  const [metrics, setMetrics] = useState(0); // data state
  const [error, setError] = useState(null); // error state

  useEffect(() => {
    async function fetchMetrics() {
      setIsFetching(true);

      try {
        const metrics = await getMetrics();
        setMetrics(metrics);
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch metrics, please try again later.",
        });
      }
      setIsFetching(false);
    }

    fetchMetrics(); // Initial fetch

    const intervalId = setInterval(fetchMetrics, 30000); // Fetch every 30 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  return (
    <>
      <p className="text-5xl text-center font-semibold mb-6">Metrics</p>
      {error && !fetching && (
        <p className="text-red-500">
          Error: {error.message}
          <br />
          Displayed metrics may be incorrect.
        </p>
      )}
      {fetching && <p className="text-lg font-normal">Loading metrics...</p>}
      {!fetching && !error && (
        <>
          <pre className="w-full overflow-auto p-4 rounded text-wrap">
            {metrics}
          </pre>
        </>
      )}
    </>
  );
}
