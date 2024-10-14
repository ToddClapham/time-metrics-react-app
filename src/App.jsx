import "./App.css";
import Metrics from "./components/Metrics";
import Time from "./components/Time";

function App() {
  return (
    <>
      <div className="h-screen grid grid-cols-2">
        <div className="bg-gradient-to-b from-blue-700 to-blue-300 h-full flex flex-col justify-center items-center">
          <Time />
        </div>
        <div className="bg-gradient-to-t from-green-700 to-green-300 h-full flex flex-col justify-center items-center overflow-auto">
          <Metrics />
        </div>
      </div>
    </>
  );
}

export default App;
