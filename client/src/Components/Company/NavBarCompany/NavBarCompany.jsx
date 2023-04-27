import {Link} from 'react-router-dom';
import '../../../Design/NavBarClient.css';

export const NavBarCompany = () => {
  return (
    <div className='navbar'>
      <div className='nav-links'>
        <Link to='/getCoupons/all' className='nav-link'><h3>Get my coupon</h3></Link>
        <Link to='/getCoupons/category' className='nav-link'><h3>Get my coupon by category</h3></Link>
        <Link to='/getCoupons/maxToPay' className='nav-link'><h3>Get my coupon by maxToPay</h3></Link>
        <Link to='/getDetails' className='nav-link'><h3>GetDetails coupon</h3></Link>
      </div>
    </div>
  )
}
