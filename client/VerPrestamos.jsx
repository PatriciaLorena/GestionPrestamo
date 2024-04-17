import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const VerPrestamos = () => {
    

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
                    <tr >
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <button className="btn btn-success btn-sm me-1">Editar</button>
                            <button className="btn btn-danger btn-sm">Eliminar</button>
                        </td>
                    </tr>

            </tbody>
        </table>
</>
    )
}

VerPrestamos.propTypes = {

}
export default VerPrestamos;
