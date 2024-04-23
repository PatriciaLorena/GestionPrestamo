import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import ListarCuotas from './ListarCuotas';

const ModificarPrestamo = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [prestamo, setPrestamo] = useState(null);
    const [cliente, setCliente] = useState(null);
    const [error, setError] = useState(null);
    const [fechaPrestamo, setFechaPrestamo] = useState(new Date());

    useEffect(() => {
        axios.get(`http://127.0.0.1:80/api/prestamo/${id}`)
            .then(response => {
                setPrestamo(response.data.prestamo);
                setFechaPrestamo(new Date(response.data.prestamo.fechaPrestamo));
                setLoading(false);
                // Cargar información del cliente
                axios.get(`http://127.0.0.1:80/api/cliente/${response.data.prestamo.cliente}`)
                    .then(clienteResponse => {
                        setCliente(clienteResponse.data.cliente);
                    })
                    .catch(err => {
                        console.error(err);
                        setError('Error al cargar la información del cliente');
                    });
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPrestamo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedPrestamo = { ...prestamo, fechaPrestamo };
            const response = await axios.put(`http://127.0.0.1:80/api/prestamo/${id}`, updatedPrestamo);
            console.log(response.data);
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'El préstamo ha sido actualizado exitosamente.'
            });
        } catch (error) {
            console.error(error);
            setError(error.message);
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Ha ocurrido un error al intentar actualizar el préstamo.'
            });
        }
    };

    if (loading) {
        return <h1>Cargando...</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="text-danger">{error}</div>
                <div className="row align-items-center">
                    <div className="col-auto">
                        <h1>Cobrar Préstamo</h1>
                    </div>
                    <div className="col-auto ms-auto">
                        <Link to="/" className="btn btn-primary btn-sm me-1 botonAdd estBtn">Volver al inicio</Link>
                    </div>
                </div>
                <div className="row align-items-center mt-3">
                    <div className="col-auto">
                        <label htmlFor="cliente">Cliente: </label>
                        <input type="text" id="cliente" name="cliente" value={cliente ? cliente.name : 'Cargando...'} disabled />
                    </div>
                    <div className="col-auto">
                        <label htmlFor="monto">Monto: </label>
                        <input type="text" id="monto" name="monto" value={prestamo.monto} onChange={handleChange} />
                    </div>
                    <div className="col-auto">
                        <label htmlFor="numCuotas">Número de Cuotas: </label>
                        <input type="text" id="numCuotas" name="numCuotas" value={prestamo.numCuotas} onChange={handleChange} />
                    </div>
                </div>
                <div className="row align-items-center mt-3">
                    <div className="col-auto">
                        <label htmlFor="fechaPrestamo">Fecha de Préstamo: </label>
                        <DatePicker 
                            selected={fechaPrestamo} 
                            onChange={date => setFechaPrestamo(date)} 
                            dateFormat="dd/MM/yyyy" 
                            id="fechaPrestamo" 
                        />
                    </div>
                </div>
            </form>
            <ListarCuotas prestamos={prestamo} setPrestamos={setPrestamo} idPrestamoEnCreacion={id} componenteLlamador='cobrarPrestamo'/>
        </div>
    );
};

ModificarPrestamo.propTypes = {
    updatePrestamo: PropTypes.func
};

export default ModificarPrestamo;
