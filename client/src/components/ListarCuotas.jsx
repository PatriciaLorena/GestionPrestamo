import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const ListarCuotas = ({ prestamos, setPrestamos }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://127.0.0.1:80/api/prestamo')
            .then(res => {
                console.log(res.data.prestamos);
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
                    {prestamos.map((prestamo, index) => (
                        <React.Fragment key={index}>
                            {Array.isArray(prestamo.cuotas) && prestamo.cuotas.map((cuota, subIndex) => (
                                <tr key={`${index}-${subIndex}`}>
                                    <td>{cuota.numCuotas}</td>
                                    <td>{cuota.fechaVencimiento}</td>
                                    <td>{cuota.montoCuota}</td>
                                    <td>{cuota.mora}</td>
                                    <td>{cuota.diasMora}</td>
                                    <td>{cuota.estado}</td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}


                </tbody>
            </table>
        </div>
    );
};

ListarCuotas.propTypes = {
    prestamos: PropTypes.array.isRequired,
    setPrestamos: PropTypes.func.isRequired
};

export default ListarCuotas;
