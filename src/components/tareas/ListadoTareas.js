import React, { Fragment, useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from '../../context/tareas/tareaContext';
import Tarea from "./Tarea";
import {CSSTransition,TransitionGroup} from 'react-transition-group';

const ListadoTareas = () => {
  const proyectosContext = useContext(proyectoContext);

  const { proyecto,eliminarProyecto } = proyectosContext;

  const tareasContext=useContext(tareaContext);
  const {tareasproyecto}=tareasContext;

  if(!proyecto) return <h2>Selecciona proyecto</h2>;

  const [proyectoActual]=proyecto;

  

  const onClickEliminar=()=>{
    eliminarProyecto(proyectoActual._id);
  }

  return (
    <Fragment>
      <h2>Proyecto: {proyectoActual.nombre}</h2>
      <ul className="listado-tareas">
        {tareasproyecto.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : (
          <TransitionGroup>
            {tareasproyecto.map((tarea) => 
            <CSSTransition
              key={tarea._id}
              timeout={200}
              classNames="tarea"
            >
                    <Tarea 
                  
                  tarea={tarea} 
                />
            </CSSTransition>
            )}
          </TransitionGroup>
        )}
        
      </ul>

      <button type="button" className="btn btn-eliminar"
        onClick={onClickEliminar}
      >
          Eliminar proyecto &times;
        </button>
        
    </Fragment>
  );
};

export default ListadoTareas;
