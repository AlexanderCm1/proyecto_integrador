import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/Dashboard";
import "./styles/login.css";

import PrivateRoute from "./routes/PrivateRoute";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Layout from "./components/Layout";
import Legajos from "./pages/dashboard/docente/Legajos";

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setisAuthenticated(boolean);
  };
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>

        <Route path="/login">
          <Login setAuth={setAuth} />
        </Route>

        <PrivateRoute path="/dashboard" isAuth={isAuthenticated}>
          <Layout>
            <Dashboard />
          </Layout>
        </PrivateRoute>

        <PrivateRoute path="/legajos/:id" isAuth={isAuthenticated}>
          <Layout>
            <Legajos />
          </Layout>
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
