import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ListarCuotas from './ListarCuotas';

const CrearPrestamo = () => {
    const [clientes, setClientes] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState('');
    const [loading, setLoading] = useState(true);
    const [monto, setMonto] = useState('');
    const [plazo, setPlazo] = useState('6');
    const [interes, setInteres] = useState('10');
    const [startDate, setStartDate] = useState(new Date());
    const [prestamoId, setPrestamoId] = useState(null); // Para almacenar el ID del préstamo recién creado
    const [cuotas, setCuotas] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:80/api/cliente')
            .then(res => {
                setClientes(res.data.clientes);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if (prestamoId) {
            // Realizar una solicitud al servidor para obtener las cuotas asociadas al préstamo
            axios.get(`http://127.0.0.1:80/api/prestamo/${prestamoId}/cuotas`)
                .then(res => {
                    setCuotas(res.data.cuotas);
                })
                .catch(err => console.log(err));
        }
    }, [prestamoId]);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedCliente || !monto) {
            alert('Por favor completa todos los campos.');
            return;
        }

        const prestamoData = {
            cliente: selectedCliente,
            monto: monto,
            numCuotas: plazo,
            fechaPrestamo: startDate,
            interes: interes
        };

        axios.post('http://127.0.0.1:80/api/prestamo', prestamoData)
            .then(res => {
                if (res.data.prestamo && res.data.prestamo._id) {
                    setPrestamoId(res.data.prestamo._id); // Guardar el ID del préstamo recién creado
                }
                if (res.data.prestamo && res.data.prestamo.cuotas) {
                    setCuotas(res.data.prestamo.cuotas);
                }
                clearForm();
            })
            .catch(err => {
                alert('Error al crear el préstamo. Por favor inténtalo de nuevo.');
                console.error(err);
            });
    };

    const clearForm = () => {
        setSelectedCliente('');
        setMonto('');
        setPlazo('6');
        setInteres('10');
        setStartDate(new Date());
    };

    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="row align-items-center">
                    <div className="col-auto">
                        <h1>H&N Préstamos</h1>
                    </div>
                    <div className="col-auto ms-auto">
                        <Link to="/" className="btn btn-primary btn-sm me-1 botonAdd estBtn">Volver al inicio</Link>
                    </div>
                </div>
                <div className="row align-items-center mt-3">
                    <div className="col-auto">
                        <label htmlFor="cliente">Cliente: </label>
                        <select id="cliente" value={selectedCliente} onChange={(e) => setSelectedCliente(e.target.value)}>
                            <option value="">Selecciona un cliente</option>
                            {clientes.map(cliente => (
                                <option key={cliente._id} value={cliente._id}>{cliente.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-auto">
                        <label htmlFor="plazo">Plazo a pagar: </label>
                        <select id="plazo" value={plazo} onChange={(e) => setPlazo(e.target.value)}>
                            <option value="6">6 meses</option>
                            <option value="12">12 meses</option>
                            <option value="18">18 meses</option>
                            <option value="24">24 meses</option>
                        </select>
                    </div>
                    <div className="col-auto">
                        <label htmlFor="interes">Interés: </label>
                        <select id="interes" value={interes} onChange={(e) => setInteres(e.target.value)}>
                            <option value="10">10%</option>
                            <option value="20">20%</option>
                            <option value="30">30%</option>
                        </select>
                    </div>
                </div>
                <div className="row align-items-center mt-3">
                    <div className="col-auto">
                        <label htmlFor="monto">Cantidad préstamo: </label>
                        <input type="text" id="monto" value={monto} onChange={(e) => setMonto(e.target.value)} />
                    </div>
                    <div className="col-auto">
                        <label className='me-3' htmlFor="startDate">Fecha de préstamo: </label>
                        <DatePicker selected={startDate} onChange={date => setStartDate(date)} dateFormat="dd/MM/yyyy" id="startDate" />
                    </div>
                </div>
                <div className="row align-items-center mt-3">
                    <button type="submit" className="btn btn-primary">Generar préstamo</button>
                </div>
            </form>
            
            {/* Mostrar las cuotas solo si hay un préstamo generado */}
            {<ListarCuotas cuotas={cuotas} />}
        </div>
    );
}

export default CrearPrestamo;

