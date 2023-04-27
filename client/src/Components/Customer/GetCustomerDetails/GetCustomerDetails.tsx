import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Customer } from '../../../Entitis.type';
interface Props {
    token: string|undefined;
    id:number|undefined
  }
const GetCustomerDetails = (props: Props) => {
  const [customer, setCustomer] = useState<Customer>();
  const navigate = useNavigate();

  console.log(props.token);

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
  }, []); // add empty array to run useEffect only once on component mount

  return (
    <div className='getCompanyDetails'>
      <button onClick={() => navigate(-1)}>Back</button>
      <table>
        <caption>Company Details</caption>
        <thead>
          <tr>
            <th>First Name:</th>
            <th>Last Name:</th>
            <th>Email:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{customer?.firstName}</td>
            <td>{customer?.lastName}</td>
            <td>{customer?.email}</td>
          </tr>
        </tbody>
      </table>
      <table>
        <caption>Coupons Details</caption>
        <thead>
          <tr>
            <th>Coupon ID:</th>
            <th>Category:</th>
            <th>Price:</th>
            <th>Amount:</th>
            <th>End Date:</th>
            <th>Image:</th>
          </tr>
        </thead>
        <tbody>
          {customer?.coupons.map((coupon) => (
            <tr key={coupon.id}>
              <td>{coupon.id}</td>
              <td>{coupon.category}</td>
              <td>{coupon.price}</td>
              <td>{coupon.amount}</td>
              <td>{coupon.endDate}</td>
              <td className='pic'>
                <img src={coupon.image} alt="#" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default GetCustomerDetails