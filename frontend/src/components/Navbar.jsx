import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white font-bold text-lg">
        <Link to="/">Home</Link>
      </div>
      <div className="space-x-4 flex items-center">
        {!user ? (
          <>
            <Link to="/login" className="text-white">Login</Link>
            <Link to="/signup" className="text-white">Signup</Link>
          </>
        ) : (
          <>
            <Link to="/apikey" className="text-white">API Keys</Link>
            <button
              onClick={logout}  // Correct function name here
              className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
