
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Customer } from '../../../Entitis.type';
import { Footer } from '../../Footer/Footer';
import NotFound from '../../NotFound/NotFound';
import CustomerPurchaseCoupon from '../CustomerPurchaseCoupon/CustomerPurchaseCoupon';
import GetAllCoupons from '../GetAllCoupons/GetAllCoupons';
import GetCustomerCoupons from '../GetCustomerCoupons/GetCustomerCoupons';
import GetCustomerCouponsByCategory from '../GetCustomerCouponsByCategory/GetCustomerCouponsByCategory';
import GetCustomerCouponsByMaxPrice from '../GetCustomerCouponsByMaxPrice/GetCustomerCouponsByMaxPrice';
import GetCustomerDetails from '../GetCustomerDetails/GetCustomerDetails';
import { NavBarCustomer } from '../NavBarCustomer/NavBarCustomer';

interface Props {
  token?: string,
  id?: number 
}

export const HomeCustomer = (props: Props) => {

  const [customer,setCustomer]=useState<Customer>()
  useEffect(() => {
    fetch('http://localhost:8080/customer/getDetails?customerId=' + props.id, {
      method: 'GET',
      headers: {
        'Authorization': props.token!,
        'Content-Type': 'application/json',
      },
      mode: 'cors'
    }).then((res) => res.json()).then((data) => {
      setCustomer(data)
      console.log(data); // log response data to console
    }).catch((error) => console.log(error));
  }, [props.id]);

  return (
    <div className="HomeAdmin">
      <BrowserRouter>
      <div className='navbar'><h1>hello {customer?.firstName} {customer?.lastName} !!!</h1></div>
        <Routes>
          <Route path='/' element={<NavBarCustomer />} />
          <Route path='/myCoupons' element={<GetCustomerCoupons token={props.token} id={props.id} />} />
          <Route path='/allCoupons' element={<GetAllCoupons token={props.token} id={props.id} />} />
          <Route path='/coupons/category' element={<GetCustomerCouponsByCategory token={props.token} id={props.id} />} />
          <Route path='/coupons/maxPrice' element={<GetCustomerCouponsByMaxPrice token={props.token} id={props.id} />} />
          <Route path='/getDetails' element={<GetCustomerDetails token={props.token} id={props.id} />} />
          <Route path={`/purchaseCoupon/:id`} element={<CustomerPurchaseCoupon token={props.token} id={props.id} />} />
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>

    </div>
  )
}
