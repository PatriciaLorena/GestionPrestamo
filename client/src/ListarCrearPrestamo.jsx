import { useState } from 'react';
import CrearPrestamo from './components/CrearPrestamo';
import ListarCuotas from './components/ListarCuotas';

function ListarCrearPrestamo() {
    const [prestamos, setPrestamos] = useState([]);

    const updateCuotas = (nuevoPrestamo) => {
        setPrestamos(prevPrestamos => [...prevPrestamos, nuevoPrestamo]);
        console.log(nuevoPrestamo)
    };
    
    return (
        <div className="row">
            <CrearPrestamo updateCuotas={updateCuotas} />
            <ListarCuotas prestamos={prestamos} setPrestamos={setPrestamos} />
        </div>
    );
}


export default ListarCrearPrestamo;
