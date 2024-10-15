export async function getTime() {
  const response = await fetch("http://localhost:3000/time", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer mysecrettoken",
    },
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch time.");
  }

  return resData.timeInSeconds;
}

export async function getMetrics() {
  const response = await fetch("http://localhost:3000/metrics", {
    method: "GET",
    headers: {
      "Content-Type": "text/plain",
      Authorization: "Bearer mysecrettoken",
    },
  });
  const text = await response.text();
  console.log(text);

  if (!response.ok) {
    throw new Error("Failed to fetch metrics.");
  }

  return text;
}
