import { Company, Coupon } from '../../../Entitis.type';
import { useState, useEffect } from 'react';
import '../../../Design/GetAll.css';
import { Link, useNavigate } from 'react-router-dom';

type Props = {
  token: string
};

const GetAllCompanys = (props: Props) => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<Array<Company>>([]);
  console.log(props.token);

  useEffect(() => {
    fetch('http://localhost:8080/admin/company/all', {
      method: 'GET',
      headers: {
        'Authorization': props.token,
        'Content-Type': 'application/json',
      },
      mode: 'cors'
    })
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data)
        console.log(data); // log response data to console
      })
      .catch((error) => console.log(error));
  }, []); // add empty array to run useEffect only once on component mount
   
  return (
    <div>
      <button onClick={() => navigate(-1)} className='back'>Back</button>
      <table>
        <thead>
          <tr>
            <th>Id:</th>
            <th>Company Name:</th>
            <th>Coupons:</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => {
            return (
              <tr key={company.id}>
                <td>{company.id} </td>
                <td>
                  <Link to={`/getOneCompany/${company.id}`}>
                    <div className="name">{company.name}</div>
                  </Link>
                </td>
                <td>
                  <table>
               
                    <tbody>
                      {company.coupons.map((coupon: Coupon) => {
                        return (
                          <tr key={coupon.id}>
                            <td>{coupon.id}</td>
                            <td>{coupon.category}</td>
                            <td className='pic'>
                              <img src={coupon.image} alt="#" />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="add">
        <Link to='/addCompany'className='professional-button'>Add Company</Link>   
      </div>
    </div>
  );
};

export default GetAllCompanys;
