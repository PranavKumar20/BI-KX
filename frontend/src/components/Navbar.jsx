import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white font-bold text-lg">
        <Link to="/">PranavApp</Link>
      </div>
      <div className="space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="text-white">Login</Link>
            <Link to="/signup" className="text-white">Signup</Link>
          </>
        ) : (
          <>
            <Link to="/apikey" className="text-white">API Keys</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
