import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import ShowList from "../ShowList/ShowList";
import ChatWidget from "../ChatWidget/ChatWidget";

function App() {
  return (
    <div className="App">
      <img src="TV_Tracker.png" alt="TV Tracker" width="230" height="200" />
      <Router>
        <Route path="/" exact>
          <ShowList />
          <ChatWidget />
        </Route>
      </Router>
    </div>
  );
}

export default App;
