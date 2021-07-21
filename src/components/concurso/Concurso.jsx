import React, { useState } from "react";
import imagenConcurso from "../../assets/img/convocatoria.jpg";
import UserService from "../../auth/docente/user.service";
import { Link, useParams, useRouteMatch, useHistory } from "react-router-dom";

const DocenteConcurso = ({
  doc_guia,
  doc_bases,
  doc_req,
  fecha_ini,
  fecha_fin,
  modalidad,
  participacion,
  id,
}) => {
  const history = useHistory();
  const [idlegajo, setIdlegajo] = useState(0);

  const onClick = () => {
    console.log(id);
    const data = {
      idnomina: id,
    };

    UserService.createLegajo(JSON.stringify(data))
      .then((response) => {
        if (response.idlegajos) {
            setIdlegajo(response.idlegajos);
            history.push(`/legajos/${response.idlegajos}`);
          }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="w-96 m-auto ">
      <div className=" grid grid-cols-3 grid-rows-7 grid-flow-row overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <div className="col-span-3 row-span-4 p-1 m-1">
          <img
            src={imagenConcurso}
            alt="Placeholder"
            className="rounded-t-xl object-cover h-48 w-full"
          />
        </div>

        <div className="col-span-3 row-span-1">
          <div className="flex align-bottom flex-col leading-none p-2 md:p-4">
            <div className="flex flex-row justify-between items-center">
              <div className="flex items-center no-underline   text-black">
                <span className="ml-2 text-xl font-bold">
                  {" "}
                  Categorización Docente 2021-I{" "}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-3 row-span-1">
          <header className="flex items-center justify-between leading-tight p-2 md:p-4">
            <h1 className="text-lg">
              Modalidad: {modalidad}
              <br />
              Participación: {participacion}
            </h1>
            <p className="text-grey-darker text-sm">
              {fecha_ini} -- {fecha_fin}
            </p>
          </header>
        </div>

        <div className="col-span-3 row-span-1">
          <ul className="flex flex-row pl-2 text-gray-600 overflow-x-scroll hide-scroll-bar">
            <li className="py-1">
              <div className="transition duration-300 ease-in-out rounded-2xl mr-1 px-2 py-1 hover:bg-blue-200 text-gray-500 hover:text-gray-800">
                <a className="" href={doc_guia} target="_blank" rel="noreferrer">
                  Documento de guia
                </a>
              </div>
              <div className="transition duration-300 ease-in-out rounded-2xl mr-1 px-2 py-1 hover:bg-blue-200 text-gray-500 hover:text-gray-800">
                <a
                  className=""
                  href={doc_bases}
                  target="_blank"
                  rel="noreferrer"
                >
                  Documento de bases
                </a>
              </div>
              <div className="transition duration-300 ease-in-out rounded-2xl mr-1 px-2 py-1 hover:bg-blue-200 text-gray-500 hover:text-gray-800">
                <a className="" href={doc_req} target="_blank" rel="noreferrer">
                  Documento de evaluación
                </a>
              </div>
            </li>
          </ul>
        </div>
        <button onClick={onClick} className="bg-yellow-500 text-white p-2">
          Participar
        </button>
      </div>
    </div>
  );
};

export { DocenteConcurso };