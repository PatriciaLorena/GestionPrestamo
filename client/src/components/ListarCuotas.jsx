import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListarCuotas = () => {
    const [prestamos, setPrestamos] = useState([]);
    const [isLoading, setIsloaging] = useState(true);
    useEffect(() => {
        axios.get('http://127.0.0.1:80/api/prestamo')
            .then(res => {
                setPrestamos(res.data.prestamos);
                setIsloaging(false);
            })
            .catch(err => console.log(err));
            setIsloaging(false);
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
                            {prestamo.cuotas.map((cuota, subIndex) => (
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

export default ListarCuotas;

