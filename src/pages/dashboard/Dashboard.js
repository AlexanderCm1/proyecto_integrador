import React, { Fragment, useState } from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import AuthService from "../../auth/auth.service";
import { useHistory } from "react-router-dom";
import Comision from "./comision/Comision";
import "../../styles/comision.css";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ListaConcursos from "./comision/ListaConcursos";
import Home from "../../components/Home";
import Docente from "./docente/Docente";
import { ListaSede, ListaLegajos } from "./comision/RevisionLegajo";

const Dashboard = () => {
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const [user, setUser] = useState(AuthService.getCurrentUser().user[0]);

  const onClick = (e) => {
    e.preventDefault();
    AuthService.logout();
    history.push("/login");
  };

  if (AuthService.getCurrentUser().user[0].rol === "Comision") {
    return (
      <Fragment>
        <div className="w-9/12 mx-auto my-7"></div>

        <Switch>
          <Route exact path={path}>
            <Home />
          </Route>

          <Route path={`${path}/concurso`}>
            <Comision user={user} />
          </Route>
          <Route path={`${path}/listado`}>
            <ListaSede />
          </Route>
          <Route path={`${path}/legajos`}>
            <ListaLegajos />
          </Route>
        </Switch>
      </Fragment>
    );
  } else if (AuthService.getCurrentUser().user[0].rol === "Docente") {
    return (
      <>
        <Route exact path={`${path}`}>
          <Home />
        </Route>
        <Route exact path={`${path}/participar`}>
          <Docente docente={user.docente} />
        </Route>
      </>
    );
  }
};

export default Dashboard;
