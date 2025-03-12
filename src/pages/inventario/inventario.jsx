import { useEffect, useState } from "react";

const Inventario = () => {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");

    const deleteItem = (id) => {
        setProductos(productos.filter((producto) => producto.id !== id));
    };

    const editarItem = (id) => {
        const producto = productos.find((producto) => producto.id === id);
        if (producto) {
            setNombre(producto.nombre);
            setPrecio(producto.precio.toString());
            setStock(producto.stock.toString());
            setProductos(productos.filter((producto) => producto.id !== id));
        }
    };

    const agregarProducto = (e) => {
        e.preventDefault();
        const id = productos.length ? productos[productos.length - 1].id + 1 : 1;
        setProductos([...productos, { id, nombre, precio: parseFloat(precio), stock: parseInt(stock) }]);
        setNombre("");
        setPrecio("");
        setStock("");
    }

    const consultarProductos = () => {
        fetch('https://aplicativo-web-cockroach-db.vercel.app/productos')
            .then(response => response.json())
            .then(data => setProductos(data.productos))
            .catch(error => console.error('Error fetching products:', error));
    }

    useEffect(() => {
        consultarProductos();
    }, []);

    return (
        <div className="container">
            <div className="container-1">
                <h1 className="title">Gestión de Productos</h1>
                <form onSubmit={agregarProducto}>
                    <div className="input-group">
                        <input
                            className="input"
                            placeholder="Nombre del producto"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        <input
                            className="input"
                            placeholder="Precio"
                            type="number"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                        />
                        <input
                            className="input"
                            placeholder="Stock"
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">➕ Agregar Producto</button>
                </form>
                <div className="grid-container">
                    {productos.map(({ id, nombre, precio, stock }) => (
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
