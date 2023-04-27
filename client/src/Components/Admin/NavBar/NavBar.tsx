import { Link } from 'react-router-dom';
import '../../../Design/NavBarClient.css';

export const NavBar = () => {
  return (
    <div className='navbar'>
      <h1 className='nav-title'>WELCOME ADMIN!</h1>
      <div className='nav-links'>
        <Link to='/getAllCompanys' className='nav-link'>Get All Companies</Link>
        <Link to='/getAllCustomers' className='nav-link'>Get All Customers</Link>
      </div>
    </div>
  )
}