import React,{useContext,useState,useEffect} from 'react';
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    const tareasContext=useContext(tareaContext);
    const {tareaseleccionada,errortarea, agregarTarea, validarTarea,obtenerTareas,actualizarTarea,limpiarTarea}=tareasContext;


    useEffect(()=>{
        if(tareaseleccionada!==null){
            guardarTarea(tareaseleccionada);
        }else{
            guardarTarea({
                nombre:''
            })
        }

    },[tareaseleccionada]);

    const [tarea, guardarTarea]=useState({
        nombre:''
    });



    const {nombre}=tarea;

    if(!proyecto) return null;

    const [proyectoActual]=proyecto;

    const handleChange=e=>{
        guardarTarea({
            ...tarea,
            [e.target.name]:e.target.value
        })

    }
    const onSubmit=e=>{
        e.preventDefault();
        //validar
        if(nombre.trim()===''){
            validarTarea();
            return;
        }

        if(tareaseleccionada===null){
            //agregar nueva tarea al state de tareas
            tarea.proyecto=proyectoActual._id;
            agregarTarea(tarea);
        }else{
            actualizarTarea(tarea);
            limpiarTarea();
        }

        //pasar la validacion

        obtenerTareas(proyectoActual._id);
        //reinciar form
        guardarTarea({
            nombre:''
        })
    }


    return (  
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre tarea"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={
                            tareaseleccionada!==null?"Editar tarea":"Agregar tarea"
                        }
                    />
                </div>
            </form>
            {errortarea ?  <p className="mensaje error"> El nombre no puede ser vacío  </p>
            :null
            }
        </div>
    );
}
 
export default FormTarea;