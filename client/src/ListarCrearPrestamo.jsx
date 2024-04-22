import React, { useState } from 'react';
import CrearPrestamo from './components/CrearPrestamo';
import ListarCuotas from './components/ListarCuotas';
import { Link } from 'react-router-dom';

function ListarCrearPrestamo() {
    const [prestamos, setPrestamos] = useState([]);
    const [idPrestamoEnCreacion, setIdPrestamoEnCreacion] = useState(null);

    const updateCuotas = (nuevoPrestamo) => {
        setPrestamos(prevPrestamos => [...prevPrestamos, nuevoPrestamo]);
        setIdPrestamoEnCreacion(nuevoPrestamo._id); // Guarda el ID del nuevo préstamo en creación
    };
    
    return (
        <div className="row">
            <CrearPrestamo updateCuotas={updateCuotas} />
            <ListarCuotas prestamos={prestamos} setPrestamos={setPrestamos} idPrestamoEnCreacion={idPrestamoEnCreacion} />
           <div className='row-12'>
           <Link to="/prestamos" className="btn btn-primary m-3 px-5">Guardar</Link>
            
            <button className="btn btn-danger px-5">cancelar</button>
           </div>
        </div>
    );
}

export default ListarCrearPrestamo;
