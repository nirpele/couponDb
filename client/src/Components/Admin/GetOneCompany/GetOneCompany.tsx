import { Company } from '../../../Entitis.type';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../../Design/GetOneCompany.css';

type Props = {
  token: string
};

const GetOneCompany = (props: Props) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: any }>();
  const companyId = parseInt(id)
  const [company, setCompany] = useState<Company>({ id: companyId, name: '', email: '', password: '', coupons: [] });

  useEffect(() => {
    fetch('http://localhost:8080/admin/getCompany?id=' + companyId, {
      method: 'GET',
      headers: {
        'Authorization': props.token,
        'Content-Type': 'application/json',
      },
      mode: 'cors'
    }).then((res) => res.json()).then((data) => {
      setCompany(data)
      console.log(data); // log response data to console
    }).catch((error) => console.log(error));
  }, [])

  return (
    <div className='getAllCompanys'>
      <button onClick={() => navigate(-1)}>Back</button>
      <div className='companyDetails'>
        <div>ID: {companyId !== 0 ? company?.id : null}</div>
        <div>Name: {companyId !== 0 ? company?.name : null}</div>
        <div>Email: {companyId !== 0 ? company?.email : null}</div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Price</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {companyId !== 0 ? company?.coupons.map((coupon) => {
              return (
                <tr key={coupon.id}>
                  <td>{coupon.id}</td>
                  <td>{coupon.category}</td>
                  <td>{coupon.price}</td>
                  <td>{coupon.startDate}</td>
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
        {companyId !== 0 ?
          <Link to={`/updateCompany/${company.id}`} className="link link-update">
          Update me
        </Link>
         : null}  
        {companyId !== 0 ?
          <Link to={`/deleteCompany/${company.id}`} className="link link-delete">
          Delete company!
        </Link> : null}
      </div>
    </div>
  )
}

export default GetOneCompany;
