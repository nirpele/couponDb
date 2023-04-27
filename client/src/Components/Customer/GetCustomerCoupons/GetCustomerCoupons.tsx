import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import { Coupon } from '../../../Entitis.type';

interface Props {
    token: string | undefined
    id: number | undefined
  }
const GetCustomerCoupons = (props:Props) => {
  const navigate = useNavigate();

  const [coupons, setCoupons] = useState<Array<Coupon>>([]);

  console.log(props.token);

  useEffect(() => {
    fetch('http://localhost:8080/customer/coupons?customerId=' + props.id,
      {
        method: 'GET',
        headers: {
          Authorization: props.token!,
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      }
    ).then((res) => res.json()).then((data) => {
      setCoupons(data);
      console.log(data); // log response data to console
    }).catch((error) => console.log(error))
  }, [])

  return (
    <div className="companyGetAllCoupons">
    <button onClick={() => navigate('/')}>Back</button>
    <table>
      <thead>
        <tr>
          <th>index:</th>
          <th>Category:</th>
          <th>Start Date:</th>
          <th>End Date:</th>
          <th>Amount:</th>
          <th>Price:</th>
          <th>Image:</th> {/* add a column for the image */}
        </tr>
      </thead>
      <tbody>
        {coupons.map((coupon,index) => (
          <tr key={index}>
            <td>{index+1}</td>
            <td>{coupon.category}</td>
            <td>{coupon.startDate}</td>
            <td>{coupon.endDate}</td>
            <td>{coupon.amount}</td>
            <td>{coupon.price}</td>
            <td className='pic'>
                <img src={coupon.image} alt="#" />
              </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};

export default GetCustomerCoupons