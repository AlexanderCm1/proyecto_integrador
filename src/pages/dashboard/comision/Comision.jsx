import React, { useState,useEffect } from "react";
import UserService from "../../../auth/comision/user.service";


import CreateConcurso from './CreateConcurso';



const Comision = ( {user} ) => {
  const [comision, setComision] = useState({
    concursos: [],
  })
  useEffect(() => {
    // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    // setLoadingC(true);
    getAllConcursos();
  }, []);

    const getAllConcursos = () => {
      UserService.getConcursos().then(
        (response) => {
          console.log(response);
          const { concurso } = response;
          // setConcursos(concurso);
          setComision((prevState) => ({
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
    <CreateConcurso user={user}/>
 
    </>
  );
};
export default Comision;
