import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import ShowList from "../ShowList/ShowList";

function App() {
  return (
    <div className="App">
      <img src="TV_Tracker.png"  alt="TV Tracker" width="230" height="200" />
      <Router>
        <Route path="/" exact>
          <ShowList />
          {/* TODO: Make this a modal so it does not take up as much screen space */}
          <iframe src="https://tvtrackerbot-6854.chipp.ai" height="550px" width="80%" frameborder="0" title="Tv Tracker bot"/>
        </Route>
      </Router>
    </div>
  );
}

export default App;

