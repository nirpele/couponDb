import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Company } from '../../../Entitis.type';
interface Props {
  token: string | undefined
  id: number | undefined
}
//DONE!
const CompanyGetDetails = (props: Props) => {
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company>();
  console.log(props.token);

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
  }, []); // add empty array to run useEffect only once on component mount

  
  return (
    <div className='getCompanyDetails'>
      <button onClick={() => navigate(-1)}>Back</button>
      <table>
        <caption>Company Details</caption>
        <thead>
          <tr>
            <th>Name:</th>
            <th>Email:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{company?.name}</td>
            <td>{company?.email}</td>
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
          {company?.coupons.map((coupon) => (
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

export default CompanyGetDetails;