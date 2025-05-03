// components/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex justify-between items-center">
        <div className="text-white text-lg">My Website</div>
        <div className="flex space-x-4">
          <Link to="/" className="text-white">Login</Link>
          <Link to="/tables" className='text-white'>Tables</Link>
          <Link to="/afitsant" className="text-white">Afitsant</Link>
          <Link to="/casir" className="text-white">Casir</Link>
          <Link to="/admin" className="text-white">Admin</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
