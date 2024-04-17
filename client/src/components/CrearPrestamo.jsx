import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams, Link } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../App.css';

const CrearPrestamo = () => {
    const [startDate, setStartDate] = useState(new Date()); // Estado para la fecha de préstamo
    const navegate = useNavigate();

    return (
        <form>
            <div className="row align-items-center">
                <div className="col-auto">
                    <h1>H&N Prestamos</h1>
                </div>

                <div className="col-auto ms-auto">
                    <Link to={`/`} className="btn btn-primary btn-sm me-1 botonAdd estBtn">back to home</Link>
                </div>
            </div>
            <div className="row align-items-center">
                <div className="col-auto">
                    <label className='me-3' htmlFor="">Cliente: </label>
                    <select>
                        <option value="default">Patricia</option>
                        <option value="">Juan</option>
                        <option value="">Pedro</option>
                    </select>
                </div>
                <div className="col-auto ms-auto">
                    <label className='me-3' htmlFor="">Plazo a pagar: </label>
                    <select>
                        <option value="default">6 meses</option>
                        <option value="">12 meses</option>
                        <option value="">18 meses</option>
                        <option value="">24 meses</option>
                    </select>
                </div>
                <div className="col-auto ms-auto">
                    <label className='me-3' htmlFor="">Interes: </label>
                    <select>
                        <option value="default">10%</option>
                        <option value="">20%</option>
                        <option value="">30%</option>
                    </select>
                </div>
            </div>

            <div className="row align-items-center mt-3">
                <div className="col-auto">
                    <label className='me-3' htmlFor="">Cantidad préstamo: </label>
                    <input type="text" name="cantidad" placeholder="ej. 1000" />
                </div>
                
                <div className="col-auto ms-auto">
                    <label className='me-3' htmlFor="">Fecha de préstamo: </label>
                    <DatePicker selected={startDate} onChange={date => setStartDate(date)} dateFormat="dd/MM/yyyy" />
                </div>
                <div className="col-auto ms-auto">
                    <button className='btn btn-primary'>Generar cuotas</button>
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3" onClick={() => navegate("/prestamos")}>Guardar Prestamo</button>
            <button type="button" className="btn btn-danger mt-3 ms-3" onClick={() => navegate("/")}>Cancel</button>
        </form>
    );
}

export default CrearPrestamo;
