import React, { useEffect, useState } from "react";
import { DocenteFormulario } from "../../../components/formulario/Formulario";
import {
  Switch,
  Route,
  useParams,
  withRouter,
  useRouteMatch,
  Link,
} from "react-router-dom";
import UserService from "../../../auth/docente/user.service";

import { Capitulos } from "../../../components/legajos/Legajos";
import FormularioLegajo from "./FormularioLegajo";
import { LoadingCapitulos } from "../../../components/loaders/Loader";

const Legajos = () => {
  let { path, url } = useRouteMatch();
  const { id } = useParams();

  const [capitulos, setcapitulos] = useState([]);
  const [loader, setLoader] = useState(true);
  const [legajoPuntaje, setlegajoPuntaje] = useState(0);
  const [open,setopen] = useState(false)


  useEffect(() => {
    UserService.getModulos()
      .then((response) => {
        const { modulos } = response;
        console.log(response);
        if (modulos) setcapitulos(modulos);
        setLoader(false);
      })
      .catch((e) => console.log(e));
  }, []);

  if (loader === true) {
    return (
      <section className="flex flex-wrap w-9/12 mx-auto my-7 2xl:my-20">
        <LoadingCapitulos />
        <LoadingCapitulos />
        <LoadingCapitulos />
        <LoadingCapitulos />
        <LoadingCapitulos />
        <LoadingCapitulos />
      </section>
    );
  }
  const onClick = () => {
    setopen(!open);
    UserService.getModulosPuntaje(id)
    .then((response) => {
      const { puntajemodulo } = response;
      console.log(puntajemodulo);
      // if (puntajemodulo.length === 0) {
      //   setlegajoPuntaje(0);
      //   return;
      // }
      const puntajeGeneral = puntajemodulo.reduce(
        (general, modulo) => general + parseInt(modulo.puntaje),
        0
      );
      setlegajoPuntaje(puntajeGeneral);
      const data = {
        puntaje: puntajeGeneral,
      };
      UserService.updateLegajoPuntaje(id, JSON.stringify(data)).then(
        (response) => console.log(response)
      ).catch(e => console.log(e));
    })
    .catch((e) => console.log(e));
    console.log(id);

  }
  
  return (
    <>
      <Switch>
        <Route exact path={`${path}`}>
          <Link
            to={`/dashboard/participar`}
            className="p-2 flex bg-yellow-500 text-white w-40 mx-auto justify-center"
          >
            Regresar
          </Link>
          <div className="flex mx-auto w-9/12 m-0 p-0">
          <button onClick={onClick} className="w-max bg-red-500 p-2 text-white" >
              Obtener puntaje General
        </button>
        <span className={`ml-9 ${open === true ? 'block': 'hidden'}`}>Puntaje general Estimado : {legajoPuntaje}</span>
          </div>

          <section className="flex flex-wrap w-9/12 mx-auto my-7 2xl:my-8">
            {capitulos.map((val, key) => (
              <Capitulos
                key={key}
                nombre={val.nombre}
                image={val.image}
                id={val.idmodulos}
              />
            ))}
          </section>
        </Route>

        <Route path={`${path}/:idcapitulo`}>
          <FormularioLegajo />
        </Route>
      </Switch>
    </>
  );
};

export default Legajos;