import React, { useEffect } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../res/Logo.svg'

export default function Header({headerColor}) {
  const auth = useAuth();
  const navigate = useNavigate()

  const logout = (e)=>{
    e.preventDefault();
    auth.logout();
    navigate("/");
  }

  useEffect(()=>{
    if(!auth.user){
      // navigate("/Login");
    }
  }, [auth.user])

  return (
    <header className={`header ${headerColor}`}>
        <img src={logo} className="logo" alt='logo'/>
        <div className='header-links'>
          <Link to="/Modulos">Inicio</Link>
          <Link to="/Perfil" className='user-name-container'>
            {auth.user.photoURL && <img src={auth.user.photoURL} className='user-picture' alt="usuario-profile" />}
            {auth.user.displayName}
          </Link>
          <Link onClick={logout}>Logout</Link>
        </div>
      </header>
  )
}
