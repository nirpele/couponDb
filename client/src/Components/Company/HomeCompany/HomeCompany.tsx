
import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Company } from '../../../Entitis.type'
import { Footer } from '../../Footer/Footer'
import NotFound from '../../NotFound/NotFound'
import  CompanyAddCoupon  from '../CompanyAddCoupon/CompanyAddCoupon'
import CompanyDeleteCoupon from '../CompanyDeleteCoupon/CompanyDeleteCoupon'
import CompanyGetAllCoupons from '../CompanyGetAllCoupons/CompanyGetAllCoupons'
import CompanyGetCouponsByCategory from '../CompanyGetCouponsByCategory/CompanyGetCouponsByCategory'
import CompanyGetCouponsByMaxPrice from '../CompanyGetCouponsByMaxPrice/CompanyGetCouponsByMaxPrice'
import CompanyGetDetails from '../CompanyGetDetails/CompanyGetDetails'
import CompanyUpdateCoupon from '../CompanyUpdateCoupon/CompanyUpdateCoupon'
import { NavBarCompany } from '../NavBarCompany/NavBarCompany'

interface Props {
  token?: string,
  id?: number; 
}


export const HomeCompany = (props: Props) => {
  const [company, setCompany] = useState<Company>();
  
  useEffect(() => {
    fetch('http://localhost:8080/company/getDetails?companyId=' + props.id, {
      method: 'GET',
      headers: {
        'Authorization': props.token!,
        'Content-Type': 'application/json',
      },
      mode: 'cors'
    }).then((res) => res.json()).then((data) => {
      setCompany(data)
      console.log(data); // log response data to console
    }).catch((error) => console.log(error));
  }, [props.id]);

  return (
    <div className="HomeAdmin">
    <BrowserRouter>
    <div className='navbar'><h1>hello {company?.name} !!!</h1></div>
      <Routes>
        <Route path='/' element={<NavBarCompany />} />
        <Route path='/addCoupon' element={<CompanyAddCoupon token={props.token} id={props.id}/>} />
        <Route path={`/updateCoupon/:id`} element={<CompanyUpdateCoupon token={props.token} id={props.id}/>} />
        <Route path='/getCoupons/all' element={<CompanyGetAllCoupons token={props.token} id={props.id}/>} />
        <Route path={`/deleteCoupon/:id`} element={<CompanyDeleteCoupon token={props.token} companyId={props.id}/>} />
        <Route path='/getCoupons/category' element={<CompanyGetCouponsByCategory token={props.token} id={props.id}/>} />
        <Route path='/getCoupons/maxToPay' element={<CompanyGetCouponsByMaxPrice token={props.token} id={props.id} />} />
        <Route path='/getDetails' element={<CompanyGetDetails token={props.token} id={props.id}/>} /> 
        <Route path='*' element={<NotFound />}/>
      </Routes> 
    </BrowserRouter>
    <Footer/>
  </div>
  )
}
