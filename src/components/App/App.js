import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import ShowList from "../ShowList/ShowList";

function App() {
  return (
    <div className="App">
      <h1>Track your tv shows here:</h1>
      <Router>
        <Route path="/" exact>
          <ShowList />
        </Route>
      </Router>
    </div>
  );
}

export default App;