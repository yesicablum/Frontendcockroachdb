import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const initialData = [
    [1, "Laptop", 1200.50, 10],
    [2, "Mouse", 25.99, 50],
    [3, "Teclado", 45.00, 30],
    [4, "Monitor", 1500.00, 20],
    [5, "Cargador", 75.00, 40]
];

const Inventario = () => {
    const [productos, setProductos] = useState([]);

    const deleteItem = (id) => {
        setProductos(productos.filter((producto) => producto[0] !== id));
    };

    const editarItem = (id) => {
        const producto = productos.find((producto) => producto[0] === id);
        console.log(producto);
    };

    const agregarProducto = () => {
        const nombre = document.querySelector(".input:nth-child(1)").value;
        const precio = document.querySelector(".input:nth-child(2)").value;
        const stock = document.querySelector(".input:nth-child(3)").value;
        const id = productos.length + 1;
        setProductos([...productos, [id, nombre, parseFloat(precio), parseInt(stock)]]);
    }

    const consultarProductos = () => {
        fetch('https://aplicativo-web-cockroach-db.vercel.app/productos')
            .then(response => response.json())
            .then(data => setProductos(data))
            .catch(error => console.error('Error fetching products:', error));
    }

    useEffect(() => {
        setProductos(initialData);
        consultarProductos();
    }, []);

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
                <h1 className="title">Gestión de Productos</h1>
                <div className="input-group">
                    <input className="input" placeholder="Nombre del producto" />
                    <input className="input" placeholder="Precio" type="number" />
                    <input className="input" placeholder="Stock" type="number" />
                </div>
                <button className="button" onClick={agregarProducto}>➕ Agregar Producto</button>
                <div className="grid-container">
                    {productos.map(([id, nombre, precio, stock]) => (
                        <div className="card" key={id}>
                            <h2>{nombre}</h2>
                            <p>Precio: ${precio}</p>
                            <p>Stock: {stock}</p>
                            <div className="button-group">
                                <button className="edit-btn" onClick={() => editarItem(id)}>✏️ Editar</button>
                                <button className="delete-btn" onClick={() => deleteItem(id)}>🗑 Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Inventario;
