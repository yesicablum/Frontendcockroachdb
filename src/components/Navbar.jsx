import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">Tienda</h1>
      <div className="nav-links">
        <Link to="/inventario" className="nav-item">
          Inventario
        </Link>
        <Link to="/ventas" className="nav-item">
          Ventas
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
