import React, { useEffect, useState } from "react";
import { Factores } from "../../../components/legajos/Legajos";
import Modal from "../../../components/modal/Modal";

import {
  Switch,
  Route,
  useParams,
  withRouter,
  useRouteMatch,
  Link,
} from "react-router-dom";
import UserService from "../../../auth/docente/user.service";
import {LoadingCapitulos} from '../../../components/loaders/Loader'

var normalize = (function () {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
      to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};
  
    for (var i = 0, j = from.length; i < j; i++)
      mapping[from.charAt(i)] = to.charAt(i);
  
    return function (str) {
      var ret = [];
      for (var i = 0, j = str.length; i < j; i++) {
        var c = str.charAt(i);
        if (mapping.hasOwnProperty(str.charAt(i))) ret.push(mapping[c]);
        else ret.push(c);
      }
      return ret.join("");
    };
  })();




const FormularioLegajo = () => {
  let { path, url } = useRouteMatch();
  const { id, idcapitulo } = useParams();
  const [factores, setFactores] = useState([]);
  const [factor, setfactor] = useState({
    nombre: undefined,
    id: undefined,
  });
  const [capitulo,setCapitulo] = useState()

  const [isOpen, setIsOpen] = useState(false);
  const [loader,setLoader] = useState(true);
  const [puntajeTotal, setPuntajeTotal] = useState(0);


  useEffect(() => {
    UserService.getSubmodulos(idcapitulo)
      .then((response) => {
        console.log(response);
        const { subModulos } = response;
        if (subModulos) setFactores(subModulos);
        setLoader(false);
      })
      .catch((e) => console.log(e));


      UserService.getByIdModulos(idcapitulo)
      .then(response => {
        const { nombre } = response;
        console.log(nombre[0].nombre);
        if (nombre) setCapitulo(nombre[0].nombre);
        
      }).catch(e => console.log(e));
  }, []);

  useEffect(() => {
    const data = {
      idlegajos : id
    }
    UserService.getPuntajesSubmodulo(JSON.stringify(data),idcapitulo)
      .then((response) => {
        console.log(response);
        const { vista } = response;
        console.log(response);
        if (vista.length === 0) {
          setPuntajeTotal(0);
          return;
        }

        const sumaModulo = vista.reduce(
          (total, vis) => total + parseInt(vis.puntaje),
          0
        );
        setPuntajeTotal(sumaModulo);

        const data = {
          puntaje: sumaModulo,
        };
        UserService.updatePuntajeModulos(JSON.stringify(data), idcapitulo)
          .then((response) => {
            console.log(response);
            const { puntaje } = response;
            setPuntajeTotal(puntaje);
          })
          .catch((e) => setPuntajeTotal(0));
      })
      .catch((e) => console.log(e));
  },[factor]);

  const handleFindModal = (nombre, id) => {
    setIsOpen(!isOpen);

    setfactor({ nombre: normalize(nombre), id });
  };

  if(loader === true){
    return (
      <section className="flex flex-wrap w-9/12 mx-auto my-7 2xl:my-7">
        <LoadingCapitulos />
        <LoadingCapitulos />
        <LoadingCapitulos />
        <LoadingCapitulos />

     
    </section>
    )
  }

  return (
    <>
      <Link to={`/legajos/${id}`} className="p-2 flex bg-yellow-500 text-white w-40 mx-auto justify-center">Volver</Link>
      <h1 className="flex mx-auto w-9/12 m-0 p-0">Te encuentras en  &nbsp;<span className="font-semibold"> {capitulo}</span></h1>
      <h1 className="flex mx-auto w-9/12 m-0 p-0">Puntaje total  &nbsp;<span className="font-semibold"> {puntajeTotal}</span></h1>

      <section className="flex flex-wrap w-9/12 mx-auto my-7 2xl:my-7">
        {factores.map((val, key) => (
          <Factores
            key={key}
            nombre={val.nombre}
            image={val.image}
            onClick={() => handleFindModal(val.nombre, val.idsubmodulos)}
          />
        ))}
      </section>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} id={factor.id} nombre = {factor.nombre}/>
    </>
  );
};

export default FormularioLegajo;