import React, { useState } from "react";
import UserService from "../../../auth/comision/user.service";
import swal from "sweetalert";

import Faq from "../../../components/dropdown/Dropdown";
import TableTemplate from "../../../components/table/TableTemplate";

import flechabajo from "../../../assets/icons/flecha-abajo.svg";
import flecharriba from "../../../assets/icons/flecha-arriba.svg";

const Comision = () => {
  const [comision, setComision] = useState({
    auxiliares: [],
    asociados: [],
    principales: [],
  });
  const getAuxiliares = () => {
    UserService.getDocentesAuxiliares().then(
      (response) => {
        const { docentes } = response;
        if (docentes)
          setComision((prevState) => ({ ...prevState, auxiliares: docentes }));
      },
      (error) => {
        console.error(error);
      }
    );
  };
  const getAsociados = () => {
    UserService.getDocentesAsociados().then(
      (response) => {
        const { docentes } = response;
        if (docentes)
          setComision((prevState) => ({ ...prevState, asociados: docentes }));
      },
      (error) => {
        console.error(error);
      }
    );
  };
  const getPrincipales = () => {
    UserService.getDocentesPrincipales().then(
      (response) => {
        const { docentes } = response;
        if (docentes)
          setComision((prevState) => ({ ...prevState, principales: docentes }));
      },
      (error) => {
        console.error(error);
      }
    );
  };
  const onSendEmail = (e) => {
    e.preventDefault();
    const data = {
      idconcurso: comision.idconcurso,
      iddocentes: comision.auxiliares.map((docente) => docente.iddocente),
    };
    console.log(data);
    swal({
      title: "¿Estas seguro?",
      text: "Se enviara una notificación a los correos de la lista actual!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        UserService.sendEmail(JSON.stringify(data)).then(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.error(error);
          }
        );
        swal("Exitoso! Se ha enviado una notificación de participación a los correos!", {
          icon: "success",
        });
      } else {
        swal("No se ha envio nada!");
      }
    });
  };
  const { auxiliares, asociados, principales } = comision;

  return (
    <Faq>
      <Faq.QAItem>
        <Faq.Question answerId="q1" getDocentes={getAuxiliares}>
          {(isOpen) => {
            return (
              <>
                <span>Docentes Auxiliares</span>
                {isOpen ? (
                  <img
                    src={flecharriba}
                    className="inline-block h-3 m-4 ml-auto"
                    alt="flechariba"
                  />
                ) : (
                  <img
                    src={flechabajo}
                    className="inline-block h-3 m-4 ml-auto"
                    alt="flechabajo"
                  />
                )}
              </>
            );
          }}
        </Faq.Question>
        <Faq.Answer id="q1">
          {auxiliares.length === 0 || auxiliares === null ? (
            <div> No hay datos </div>
          ) : (
            <TableTemplate
              label1="DNI"
              label2="NOMBRE"
              label3="EMAIL"
              onSubmit={onSendEmail}
              docentes={auxiliares}
            />
          )}
        </Faq.Answer>
      </Faq.QAItem>

      <Faq.QAItem>
        <Faq.Question answerId="q2" getDocentes={getAsociados}>
          {(isOpen) => {
            return (
              <>
                <span>Docentes Asociados</span>
                {isOpen ? (
                  <img
                    src={flecharriba}
                    className="inline-block h-3 m-4 ml-auto"
                    alt="flechariba"
                  />
                ) : (
                  <img
                    src={flechabajo}
                    className="inline-block h-3 m-4 ml-auto"
                    alt="flechabajo"
                  />
                )}
              </>
            );
          }}
        </Faq.Question>
        <Faq.Answer id="q2">
          {asociados.length === 0 || asociados === null ? (
            <div> No hay datos </div>
          ) : (
            <TableTemplate
              label1="DNI"
              label2="NOMBRE"
              label3="EMAIL"
              onSubmit={onSendEmail}
              docentes={asociados}
            />
          )}
        </Faq.Answer>
      </Faq.QAItem>

      <Faq.QAItem>
        <Faq.Question answerId="q3" getDocentes={getPrincipales}>
          {(isOpen) => {
            return (
              <>
                <span>Docentes Principal</span>
                {isOpen ? (
                  <img
                    src={flecharriba}
                    className="inline-block h-3 m-4 ml-auto"
                    alt="flechariba"
                  />
                ) : (
                  <img
                    src={flechabajo}
                    className="inline-block h-3 m-4 ml-auto"
                    alt="flechabajo"
                  />
                )}
              </>
            );
          }}
        </Faq.Question>
        <Faq.Answer id="q3">
          {principales.length === 0 || principales === null ? (
            <div> No hay datos </div>
          ) : (
            <TableTemplate
              label1="DNI"
              label2="NOMBRE"
              label3="LOCO"
              onSubmit={onSendEmail}
              docentes={principales}
            />
          )}
        </Faq.Answer>
      </Faq.QAItem>
    </Faq>
  );
};
export default Comision;
