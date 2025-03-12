import './ventas.css'
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
    const [resumenVenta, setResumenVenta] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [cantidad, setCantidad] = useState(1);

    useEffect(() => {
        setProductos(initialData);
    }, []);

    const agregarProducto = (e) => {
        e.preventDefault();
        const producto = productos.find(p => p[0] === parseInt(selectedProduct));
        if (producto) {
            const total = producto[2] * cantidad;
            const newItem = [producto[1], cantidad, total];
            setResumenVenta([...resumenVenta, newItem]);
        }
    }

    return (
        <div className="container">
            <div className="container-1">
                <h1 className="title">Nueva Venta</h1>

                <div className="sales-section">
                    <form onSubmit={agregarProducto}>
                        <div className="add-product">
                            <h2>Agregar Productos</h2>
                            <select className="select-product" value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
                                <option value="">Seleccione un producto</option>
                                {productos.map(producto => (
                                    <option key={producto[0]} value={producto[0]}>
                                        {producto[1]} - ${producto[2]}
                                    </option>
                                ))}
                            </select>
                            <input type="number" className="input" placeholder="Cantidad" value={cantidad} onChange={(e) => setCantidad(parseInt(e.target.value))} />
                            <button type="submit" className="button add-btn">🛒 Agregar a la venta</button>
                        </div>
                    </form>

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