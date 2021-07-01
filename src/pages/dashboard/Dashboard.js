import React, { Fragment,useState } from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import AuthService from "../../auth/auth.service";
import {useHistory} from 'react-router-dom';
import Comision from './comision/Comision';
import '../../styles/comision.css';

const Dashboard = () => {
  const history = useHistory();
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
        
        <span className="block text-lg">"Usted esta registrado con el rol de Comision"</span>

        <span className="block text-xl">Nomina de docentes Actual</span>
        <Comision/>
        </div>

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
