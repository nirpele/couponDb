import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Coupon } from '../../../Entitis.type';

interface Props {
  token: string | undefined
  id: number | undefined
}
const CompanyGetAllCoupons = (props: Props) => {
  const url = 'http://localhost:8080/company/getCoupons?companyId=' + props.id;

  const [coupons, setCoupons] = useState<Array<Coupon>>([]);
  const navigate = useNavigate();
  console.log(props.token);

  useEffect(() => {
    fetch(
      url,
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
            <th>Coupon Update:</th>
            <th>ID:</th>
            <th>Category:</th>
            <th>Start Date:</th>
            <th>End Date:</th>
            <th>Amount:</th>
            <th>Price:</th>
            <th>Image:</th> {/* add a column for the image */}
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon.id}>
              <td className="add">
                <Link className='professional-button' to={`/updateCoupon/${coupon.id}`}>
                  update
                </Link>
              </td>
              <td>
                {coupon.id}
              </td>
              <td>{coupon.category}</td>
              <td>{coupon.startDate}</td>
              <td>{coupon.endDate}</td>
              <td>{coupon.amount}</td>
              <td>{coupon.price}</td>
          
              <td className='pic'>
                <img src={coupon.image} alt="#" />
              </td>
              <td className="add">
                <Link  className='professional-button' to={`/deleteCoupon/${coupon.id}`}>
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add">
        <Link className='professional-button' to='/addCoupon'>Add Coupon</Link>
      </div>
    </div>
  );
};
export default CompanyGetAllCoupons



