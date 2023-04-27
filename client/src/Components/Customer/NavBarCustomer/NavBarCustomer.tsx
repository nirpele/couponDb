
import {Link} from 'react-router-dom';




export const NavBarCustomer = () => {


  return (
    <div className='navbar'>
      
      <Link to='/allCoupons' className='nav-link'><h3>All coupons</h3></Link>
        <Link to='/myCoupons' className='nav-link'><h3>My coupon</h3></Link>
        <Link to='/coupons/category' className='nav-link'><h3>My coupon by category</h3></Link>
        <Link to='/coupons/maxPrice' className='nav-link'><h3>My coupon by maxToPay</h3></Link>
        <Link to='/getDetails' className='nav-link'><h3>My Details</h3></Link>
        
    </div>
  )
}