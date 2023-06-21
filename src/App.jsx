import { useState } from "react";
import "./App.css";
import useSWR from "swr";

function App() {
  const url = "https://httpstat.us/200?sleep=2000";
  const headers = { Accept: "application/json" };

  const [status, setStatus] = useState("");

  const fetcher = (url, { headers }) =>
    fetch(url, { headers })
      .then((res) => res.json())
      .then((json) => setStatus(json.description));

  const { error, isLoading } = useSWR(url, () => fetcher(url, { headers }));

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return <>{status && <p>Status : {status}</p>}</>;
}

export default App;
