import React, { useState, useEffect } from "react";
import { Concurso } from "../../../components/utils/Comision";
import UserService from "../../../auth/comision/user.service";

export const ListaConcursos = () => {
  const [lista, setlista] = useState({
    concursos: [],
  });
  useEffect(() => {
    getAllConcursos();
  }, []);

  const getAllConcursos = () => {
    UserService.getConcursos().then(
      (response) => {
        console.log(response);
        const { concurso } = response;
        // setConcursos(concurso);
        setlista((prevState) => ({
          ...prevState,
          concursos: concurso,
        }));
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <>
      <h1 className="w-6/12 mx-auto text-center text-2xl">Concursos Creados</h1>

      <div className="m-2 p-4 flex flex-wrap">
        {lista.concursos.map((val, key) => (
          <Concurso
            modalidad={val.modalidad}
            participacion={val.participacion}
            tipo_concurso={val.tipo_concurso}
            doc_bases={val.doc_bases}
            doc_guia={val.doc_guia}
            doc_req={val.doc_req}
            fecha_ini={val.fecha_ini}
            fecha_fin={val.fecha_fin}
          />
        ))}
      </div>
    </>
  );
};

export default ListaConcursos;
