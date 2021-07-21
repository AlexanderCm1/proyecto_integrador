import React, { useEffect, useState } from "react";
import { DocenteConcurso } from "../../../components/concurso/Concurso";
import userService from "../../../auth/docente/user.service";
import { LoadingConcurso } from "../../../components/loaders/Loader";
import { Link } from "react-router-dom";
import AuthService from "../../../auth/auth.service";

const Docente = ({ docente }) => {
  const [concursos, setConcursos] = useState([]);
  const [Loader, setLoader] = useState(true);

  useEffect(() => {
    
      userService
        .getConcurso(AuthService.getCurrentUser().user[0].id)
        .then((response) => {
            console.log(response);
            const { concursos } = response;
            console.log(concursos);
            if (concursos) {
              setLoader(false)
              setConcursos(concursos);
            }
        })
        .catch((e) => console.log(e));
  }, []);

  if (Loader === true) {
    return (
      <section className="my-16 flex flex-wrap">
        <LoadingConcurso />
        <LoadingConcurso />
        <LoadingConcurso />
      </section>
    );
  }

  return (
    <>

      <section className="my-16 flex flex-wrap">
        {concursos.map((value, key) => (
          <DocenteConcurso
          key={key}
          modalidad={value.modalidad}
          participacion={value.participacion}
          fecha_ini={value.fecha_ini}
          fecha_fin={value.fecha_fin}
          doc_bases={value.doc_bases}
          doc_guia={value.doc_guia}
          doc_req={value.doc_req}
          id={value.id}
          />
        ))}
      </section>
    </>
  );
};

export default Docente;