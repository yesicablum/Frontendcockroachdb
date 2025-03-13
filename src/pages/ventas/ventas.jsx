import './ventas.css'
import { useState, useEffect } from 'react';

const Ventas = () => {
    const [productos, setProductos] = useState([]);
    const [resumenVenta, setResumenVenta] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [cantidad, setCantidad] = useState(1);

    useEffect(() => {
        consultarProductos();
    }, []);

    const consultarProductos = () => {
        fetch('https://aplicativo-web-cockroach-db.vercel.app/productos')
            .then(response => response.json())
            .then(data => setProductos(data.productos))
            .catch(error => console.error('Error fetching products:', error));
    }

    const agregarProducto = (e) => {
        e.preventDefault();
        const producto = productos.find(p => p.id === parseInt(selectedProduct));
        if (producto) {
            const total = producto.precio * cantidad;
            const newItem = { nombre: producto.nombre, cantidad, total };
            setResumenVenta([...resumenVenta, newItem]);
        }
    }

    const realizarVenta = () => {
        const venta = {
            productos: resumenVenta.map(item => ({
                producto_id: productos.find(p => p.nombre === item.nombre).id,
                cantidad: item.cantidad,
                precio_unitario: item.total / item.cantidad
            }))
        }
        fetch('https://aplicativo-web-cockroach-db.vercel.app/crear_venta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(venta)
        })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    alert('Venta realizada exitosamente');
                }
            })
            .catch(error => console.error('Error creating sale:', error))
            .finally(() => {
                setResumenVenta([]);
            });
    }

    const descargarReporteVentas = () => {
        window.open('https://aplicativo-web-cockroach-db.vercel.app/descargar_reporte_ventas', '_blank');
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
                                    <option key={producto.id} value={producto.id}>
                                        {producto.nombre} - ${producto.precio}
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
                            <>
                                {resumenVenta.map((item, index) => (
                                    <div key={index} className="summary-item">
                                        <p>{item.nombre} <br /> <span>{item.cantidad} x ${item.total / item.cantidad}</span></p>
                                        <p>${item.total}</p>
                                    </div>
                                ))}
                                <div className="total-summary">
                                    <h3>Total: ${resumenVenta.reduce((acc, item) => acc + item.total, 0)}</h3>
                                </div>
                            </>
                        ) : (
                            <p>No hay productos en la venta</p>
                        )}
                        <button className="button download-btn" onClick={realizarVenta}>📂 Finalizar venta</button>
                        <button className="button download-btn" onClick={descargarReporteVentas}>📂 Descargar reporte de venta</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ventas;