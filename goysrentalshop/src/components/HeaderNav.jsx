import React from 'react'
import images from '../constant/image'
import { Link  } from 'react-router-dom';
export default function HeaderNav() {


  return (
    <header className="flex justify-between items-center p-6 bg-black bg-opacity-70">
      <div className="text-xl font-bold flex items-center gap-2">
        <img src={images.logo} alt="Logo" className="h-8 w-auto" />
        Goy's Car Rental Services
      </div>
      <nav className="space-x-6 hidden md:flex">
        <Link to='/'>Home</Link>
        <Link to='/information'>information</Link>
        <a href="#" className="hover:text-gray-300">Contacts</a>
        <Link to='/Login'>Login/Register</Link>
        
  
      </nav>
    </header>
  )
}
