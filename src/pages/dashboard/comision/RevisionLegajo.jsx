import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import UserService from "../../../auth/comision/user.service";

const ListaSede = () => {
  const { path, url } = useRouteMatch();

  return (
    <>
      <div className="mx-auto w-9/12 flex flex-wrap my-5">
        <section className="bg-amber-500 w-2/5 h-60 border border-blue-1 rounded-3xl flex flex-col">
          <h1 className="font-medium text-3xl text-center text-gray-800">
            Tarapoto
          </h1>
          <div className="w-11/12 bg-white flex flex-wrap rounded-3xl p-2 my-5 mx-auto">
            <span className="self-start ">Legajos Totales </span>
            <span className="ml-auto">1</span>
          </div>
          <div className="w-11/12 bg-white flex flex-wrap rounded-3xl p-2 my-5 mx-auto">
            <span className="self-start ">legajos por revisar</span>
            <span className="ml-auto">1</span>
          </div>
          <Link
            className="bg-red-500 ml-auto p-2 text-indigo-50 rounded-xl mx-6 w-24 text-center"
            to="/dashboard/legajos"
          >
            Revisar
          </Link>
        </section>
      </div>
    </>
  );
};
const ListaLegajos = () => {
  const { path, url } = useRouteMatch();
  const [legajos, setLegajos] = useState([]);

  useEffect(() => {
    UserService.getLegajos()
      .then((response) => {
        console.log(response);
        const { legajos } = response;
        setLegajos(legajos);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <section className="w-3/4 mx-auto border shadow-xl p-10 my-5">
      <h1 className="text-3xl ">Legajos</h1>
      <div className="my-10 ">
        {legajos.map((val, key) => (
          <div className="w-max h-72 border bg-gray-400 rounded-xl shadow-lg p-5 flex flex-col" key={key}>
            <span className="border bg-gray-200 rounded-lg p-1 my-3">Nombre:  <span className="font-bold">{val.nombre}</span>  </span>
            <span className="border bg-gray-200 rounded-lg p-1 my-3">Apellido: <span className="font-bold">{val.apellido}</span></span>
            
            <span className="border bg-gray-200 rounded-lg p-1 my-3">Categoria: <span className="font-bold">{val.categoria}</span></span>
           
            <span className="text-center">Puntaje Estimado  </span>
            <span className="text-center font-bold text-xl">{val.puntaje_total}</span>
          </div>
        ))}
      </div>
      <div></div>
    </section>
  );
};

export { ListaSede, ListaLegajos };