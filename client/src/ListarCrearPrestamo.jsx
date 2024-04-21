import React, { useState } from 'react';
import CrearPrestamoForm from './components/CrearPrestamo';
import ListarCuotas from './components/ListarCuotas';

function ListarCrearPrestamo() {

    const [cuotas, setCuotas] = useState(null);

    const updateCuotas = (cuota) => {
        setCuotas([...cuotas, cuota]);
    };

    return (
        <div className="row">
            <div className="col-6">
                <h3 className='mt-5'>Listado de cuotas</h3>
                <hr />
                <ListarCuotas cuotas={cuotas} setCuotas={setCuotas} />
            </div>
            <div className="col-6">
                <h3 className='mt-3'>Crear préstamo</h3>
                <hr />
                <CrearPrestamoForm updateCuotas={updateCuotas} />
            </div>
        </div>
    );
}

export default ListarCrearPrestamo;
