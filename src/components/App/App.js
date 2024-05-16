import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import ShowList from "../ShowList/ShowList";

function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
      <Router>
        <Route path="/" exact>
          <ShowList />
        </Route>
      </Router>
    </div>
  );
}

export default App;