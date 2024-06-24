import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import ShowList from "../ShowList/ShowList";
import ChatWidget from "../ChatWidget/ChatWidget";
import Header from "../Header/Header";
import { useAuth, AuthProvider } from "../../contexts/authContext";

function AppContent() {
  const { currentUser, userLoggedIn } = useAuth();

  console.log("Current User: ", currentUser);
  // console.log("currentUser email", currentUser.email); // gives correct email
  console.log("User Logged In: ", userLoggedIn);

  return (
    <div className="App">
      {userLoggedIn ? (
        <>
          <Header />
          <p>Hello {currentUser.email}</p>
          <img src="TV_Tracker.png" alt="TV Tracker" width="230" height="200" />
          <Router>
            <Switch>
              <Route path="/" exact component={ShowList} />
              <Route path="/chat" component={ChatWidget} />
              <Redirect to="/" />
            </Switch>
          </Router>
        </>
      ) : (
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Redirect to="/login" />
          </Switch>
        </Router>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
