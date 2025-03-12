import './ventas.css'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

const initialData = [
    [1, "Laptop", 1200.50, 10],
    [2, "Mouse", 25.99, 50],
    [3, "Teclado", 45.00, 30],
    [4, "Monitor", 1500.00, 20],
    [5, "Cargador", 75.00, 40]
];

const Ventas = () => {
    const [productos, setProductos] = useState([]);
    const [resumenVenta, setResumenVenta] = useState([])

    useEffect(() => {
        setProductos(initialData);
    }, []);

    const agregarProducto = () => {
        const productoId = parseInt(document.querySelector(".select-product").value);
        const cantidad = parseInt(document.querySelector(".input").value);
        const productoSeleccionado = productos.find((producto) => producto[0] === productoId);
        if (productoSeleccionado && cantidad > 0) {
            const total = productoSeleccionado[2] * cantidad;
            setResumenVenta([...resumenVenta, [productoSeleccionado[1], cantidad, total]]);
        }
    }

    return (
        <div className="container">
            <nav className="navbar">
                <h1 className="logo">Tienda</h1>
                <div className="nav-links">
                    <Link to="/inventario" className="nav-item">Inventario</Link>
                    <Link to="/ventas" className="nav-item">Ventas</Link>
                </div>
            </nav>

            <div className="container-1">
                <h1 className="title">Nueva Venta</h1>

                <div className="sales-section">

                    <div className="add-product">
                        <h2>Agregar Productos</h2>
                        <select className="select-product">
                            {productos.map(producto => (
                                <option key={producto[0]} value={producto[0]}>
                                    {producto[1]} - ${producto[2]}
                                </option>
                            ))}
                        </select>
                        <input type="number" className="input" placeholder="Cantidad" />
                        <button className="button add-btn" onClick={agregarProducto} >🛒 Agregar a la venta</button>
                    </div>

                    <div className="sales-summary">
                        <h2>Resumen de Venta</h2>
                        {resumenVenta.length > 0 ? (
                            resumenVenta.map((item, index) => (
                                <div key={index} className="summary-item">
                                    <p>{item[0]} <br /> <span>{item[1]} x ${item[2] / item[1]}</span></p>
                                    <p>${item[2]}</p>
                                </div>
                            ))
                        ) : (
                            <p>No hay productos en la venta</p>
                        )}
                        <button className="button download-btn">📂 Finalizar y Descargar CSV</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ventas;