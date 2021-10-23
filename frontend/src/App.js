import "./app.css";
import { useContext } from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";

function App() {

  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route path="/" exact>{user ? <Home/> : <Register/>}</Route>
        <Route path="/login" > {user ? <Redirect to="/"/> : <Login/> }</Route>
        <Route path="/register">{user ? <Redirect to="/"/> : <Register/>}</Route>
        <Route path="/profile/:username">{user ? <Profile/> : <Redirect to="/login"/>}</Route>
      </Switch>
      </div>
    </BrowserRouter>
  )
   
}

export default App;
