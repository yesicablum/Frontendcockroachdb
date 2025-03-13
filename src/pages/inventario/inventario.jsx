import { useEffect, useState } from "react";

const Inventario = () => {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");

    const deleteItem = async (id) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
        if (!confirmacion) return;

        try {
            const respuesta = await fetch(`https://aplicativo-web-cockroach-db.vercel.app/productos/${id}`, {
                method: "DELETE",
            });

            if (!respuesta.ok) {
                throw new Error("Error al eliminar el producto");
            }

            alert("Producto eliminado correctamente");

            // Actualizar el estado solo si el backend eliminó correctamente el producto
            setProductos(prevProductos => prevProductos.filter((producto) => producto.id !== id));

        } catch (error) {
            console.error("Error:", error);
            alert("Hubo un problema al eliminar el producto.");
        }
    };

    const editarItem = (id) => {
        // const producto = productos.find((producto) => producto.id === id);
        // if (producto) {
        //     setNombre(producto.nombre);
        //     setPrecio(producto.precio.toString());
        //     setStock(producto.stock.toString());
        //     setProductos(productos.filter((producto) => producto.id !== id));
        // }
        console.log("Editar producto con id:", id);
    };

    const agregarProducto = async (e) => {
        e.preventDefault();

        // Validar que los campos no estén vacíos
        if (!nombre.trim() || isNaN(precio) || isNaN(stock) || precio <= 0 || stock < 0) {
            alert("Por favor ingresa datos válidos.");
            return;
        }

        const nuevoProducto = {
            nombre,
            precio: parseFloat(precio),
            stock: parseInt(stock, 10)
        };

        try {
            const respuesta = await fetch("https://aplicativo-web-cockroach-db.vercel.app/productos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevoProducto)
            });

            if (!respuesta.ok) {
                throw new Error("Error al agregar el producto");
            }

            const data = await respuesta.json();
            alert("Producto agregado correctamente");

            // Agregar el producto al estado solo si se agregó correctamente en el backend
            setProductos(prevProductos => [...prevProductos, { id: data.id, ...nuevoProducto }]);

            // Limpiar los campos del formulario
            setNombre("");
            setPrecio("");
            setStock("");
        } catch (error) {
            console.error("Error:", error);
            alert("Hubo un problema al agregar el producto.");
        }
    };

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
