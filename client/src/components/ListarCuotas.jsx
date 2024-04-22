import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const ListarCuotas = ({ prestamos, setPrestamos, idPrestamoEnCreacion }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://127.0.0.1:80/api/prestamo')
            .then(res => {
                setPrestamos(res.data.prestamos);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, [setPrestamos]);

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    // Filtrar las cuotas del préstamo en creación
    const prestamoEnCreacion = prestamos.find(prestamo => prestamo._id === idPrestamoEnCreacion);
    const cuotasEnCreacion = prestamoEnCreacion ? prestamoEnCreacion.cuotas : [];

    return (
        <div className="mt-4">
            <h2>Lista de cuotas:</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Número de Cuota</th>
                        <th>Fecha de Vencimiento</th>
                        <th>Monto de Cuota</th>
                        <th>Mora</th>
                        <th>Días de Mora</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {cuotasEnCreacion.map((cuota, index) => (
                        <tr key={index}>
                            <td>{cuota.numCuotas}</td>
                            <td>{cuota.fechaVencimiento}</td>
                            <td>{cuota.montoCuota}</td>
                            <td>{cuota.mora}</td>
                            <td>{cuota.diasMora}</td>
                            <td>{cuota.estado}</td>
                        </tr>
                    ))}
                </tbody>
                <footer>
                    <tr>
                        <td>    
                            Total a pagar: ${prestamoEnCreacion ? prestamoEnCreacion.cuotas.reduce((acc, cuota) => acc + cuota.montoCuota, 0) : 0} 
                        </td>
                    </tr>
                </footer>
            </table>
        </div>
    );
};

ListarCuotas.propTypes = {
    prestamos: PropTypes.array.isRequired,
    setPrestamos: PropTypes.func.isRequired,
    idPrestamoEnCreacion: PropTypes.string.isRequired
};

export default ListarCuotas;
