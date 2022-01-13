import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormModal";
// import { Provider } from "react-redux";
// import LoginFormPage from "./components/LoginFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SpotsPage from "./components/SpotsPage";
import SpotPage from "./components/SpotPage";
import AddPage from "./components/AddPage";
import EditPage from "./components/EditPage";
import UserProfile from "./components/UserProfilePage";



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    <Navigation isLoaded={isLoaded} />
    {isLoaded && (
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route exact path='/spots/add'>
          <AddPage />
        </Route>
        <Route exact path='/spots'>
          <SpotsPage />
        </Route>
        <Route exact path='/spots/:id'>
          <SpotPage />
        </Route >
        <Route exact path='/users/:id/spots'>
          <UserProfile />
        </Route >
        <Route exact path='/spots/:id/edit'>
          <EditPage/>
        </Route>
        <Route>
            <h1> Page Not Found</h1>
        </Route>
      </Switch>
    )}
    </>
  )}



export default App;
