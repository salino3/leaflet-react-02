import { HomePage } from "./components";
import "./App.scss";

function App() {
  return (
    <div className="rootApp">
      <h1>React Leaflet Map</h1>
      <details>
        <summary>Map</summary>
        <HomePage />
      </details>
    </div>
  );
}

export default App;
