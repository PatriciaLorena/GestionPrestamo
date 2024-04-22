import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const VerPrestamos = () => {
    const [prestamos, setPrestamos] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:80/api/prestamo')
            .then(res => {
                setPrestamos(res.data.prestamos);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <div className="row align-items-center">
                <div className="col-auto">
                    <h1>Listado de prestamos</h1>
                </div>
                <div className="col-auto ms-auto">
                    <Link to={`/prestamo/create`} className="btn btn-primary btn-sm me-1 botonAdd estBtn">Agregar nuevo prestamo</Link>
                </div>
            </div>
            <table className="table table-Light table-striped miborde">
                <thead className="table-secondary">
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Monto</th>
                        <th>Cuotas</th>
                        <th>Fecha de vencimiento</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {prestamos.map((prestamo, index) => (
                        <tr key={index}>
                            <td>{prestamo.cliente ? prestamo.cliente.name : 'Sin nombre'}</td>
                            <td>{prestamo.cliente ? prestamo.cliente.lastName : 'Sin apellido'}</td>
                            <td>{prestamo.monto}</td>
                            <td>{prestamo.numCuotas}</td>
                            <td>{prestamo.cuotas.length > 0 ? prestamo.cuotas[prestamo.cuotas.length - 1].fechaVencimiento : 'Sin fecha'}</td>
                            <td>{prestamo.cuotas.length > 0 ? prestamo.cuotas[prestamo.cuotas.length - 1].estado : 'Sin estado'}</td>
                            <td>
                                <button className="btn btn-success btn-sm me-1">Detalle</button>
                                <button className="btn btn-danger btn-sm">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

VerPrestamos.propTypes = {}

export default VerPrestamos;

