import {  Customer } from '../../../Entitis.type';
import { useState, FormEvent, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

type Props = {
  token: string
};

const GetOneCustomer = (props: Props) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: any }>();
  const customerId = parseInt(id)
  const [customer, setCustomer] = useState<Customer>({ id: customerId, firstName: '',lastName:'', email: '', password: '', coupons: [] });
 

  useEffect(() => {
    fetch('http://localhost:8080/admin/customer?customerId=' + id, {
      method: 'GET',
      headers: {
        'Authorization': props.token,
        'Content-Type': 'application/json',
      },
      mode: 'cors'
    }).then((res) => res.json()).then((data) => {
      setCustomer(data)
      console.log(data); // log response data to console
    }).catch((error) => console.log(error));
  }, [])

  return (
    <div className='getOneCompanys'>
          <button onClick={() => navigate(-1)}>Back</button> {/* add "Back" button */}
          <div className='companyDetails'>
        <div>ID: {customerId !== 0 ? customer?.id : null}</div>
        <div>first Name: {customerId !== 0 ? customer?.firstName : null}</div>
        <div>Name: {customerId !== 0 ? customer?.lastName : null}</div>
        <div>Email: {customerId !== 0 ? customer?.email : null}</div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Price</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {customerId !== 0 ? customer?.coupons.map((coupon) => {
              return (
                <tr key={coupon.id}>
                  <td>{coupon.id}</td>
                  <td>{coupon.category}</td>
                  <td>{coupon.price}</td>
                  <td>{coupon.endDate}</td>
                  <td className='pic'>
                  <img src={coupon.image} alt="#" />
                </td>
                </tr>
              )
            }) : null}
          </tbody>
        </table>
      </div>
      <div className='updateDeleteLinks'>
        {customerId !== 0 ?
          <Link to={`/updateCustomer/${customer.id}`} className="link link-update">
          Update me
        </Link>
         : null}  
        {customerId !== 0 ?
          <Link to={`/deleteCustomer/${customer.id}`} className="link link-delete">
          Delete company!
        </Link> : null}
      </div>
    </div>
  )
}

export default GetOneCustomer;