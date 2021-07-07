import React, { Fragment,useState } from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import AuthService from "../../auth/auth.service";
import {useHistory} from 'react-router-dom';
import Comision from './comision/Comision';
import '../../styles/comision.css';
import {Route,Switch ,useRouteMatch} from 'react-router-dom'
import ListaConcursos from './comision/ListaConcursos'

const Dashboard = () => {
  const history = useHistory();
  const {path,url} = useRouteMatch();
  const [user,setUser] = useState(AuthService.getCurrentUser().user[0]);
  const onClick = (e) =>{
    e.preventDefault();
    AuthService.logout();
    history.push('/login');
  }



  if (AuthService.getCurrentUser().user[0].rol === "Comision") {
    return (
      <Fragment>
        <Navbar user={user} onClick={onClick}></Navbar>
        <div className="w-9/12 mx-auto my-7">

          
        </div>

        <Switch>
          <Route exact path={path}>
              <span>Bienvenido</span>
          </Route>

          <Route path={`${path}/concurso`}>
            <Comision user={user}/>

          </Route>

        </Switch>


      </Fragment>
    );
  } else if (AuthService.getCurrentUser().user[0].rol === "Docente") {
    return (
      <>
        <Navbar user={user} onClick={onClick}></Navbar>
        "Usted esta registrado con el rol Docente"
      </>
    );
  }
};

export default Dashboard;
