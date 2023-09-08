import React from 'react';
import { Link } from 'react-router-dom';
// Icons
import { RiSearch2Line } from "react-icons/ri";

const Home = () => {

  return (
    <div>
      <Link
                to="/registro-user"
                className="text-gray-500 font-medium hover:text-gray-300 transition-colors"
              >
                Crear Usuario
              </Link>
              </div>
  );
};

export default Home;

