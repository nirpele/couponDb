
import { Route, Routes } from 'react-router';
import GetAllCompanys from '../GetAllCompanys/GetAllCompanys';
import { NavBar } from '../NavBar/NavBar';
import DeleteCompany from '../DeleteCompany/DeleteCompany';
import GetOneCompany from '../GetOneCompany/GetOneCompany';
import UpdateCompany from '../UpdateCompany/UpdateCompany';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from '../../Footer/Footer';
import AddCompany from '../AddCompany/AddCompany';
import AddCustomer from '../AddCustomer/AddCustomer';
import {GetAllCustomers} from '../GetAllCustomers/GetAllCustomers';
import DeleteCustomer from '../DeleteCustomer/DeleteCustomer';
import GetOneCustomer from '../GetOneCustomer/GetOneCustomer';
import UpdateCustomer from '../UpdateCustomer/UpdateCustomer';
import NotFound from '../../NotFound/NotFound';

interface Props {
  token: string;

}



function HomeAdmin(props: Props) {

  return (
    <div className="HomeAdmin">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<NavBar/>} />
          <Route path={`/updateCompany/:id`} element={<UpdateCompany token={props.token}/>} />
          <Route path='/getAllCompanys' element={<GetAllCompanys token={props.token} />} />
          <Route path='/deleteCompany/:id' element={<DeleteCompany token={props.token} />} />
          <Route path={`/getOneCompany/:id`} element={<GetOneCompany token={props.token} />} />
          <Route path='/addCompany' element= {<AddCompany token={props.token} />} />
          <Route path='/updateCustomer/:id' element={<UpdateCustomer token={props.token} />} />
          <Route path='/deleteCustomer/:id' element={<DeleteCustomer token={props.token} />} />
          <Route path='/getAllCustomers' element={<GetAllCustomers token={props.token} />} />
          <Route path='/getOneCustomer/:id' element={<GetOneCustomer token={props.token} />} />
          <Route path='/addCustomer' element={<AddCustomer token={props.token} />} />
          <Route path='*' element={<NotFound />}/> 
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default HomeAdmin;


// import { Route, Routes } from 'react-router';
// import GetAllCompanys from './GetAllCompanys';
// import { NavBar } from './NavBar';
// import DeleteCompany from './DeleteCompany';
// import GetOneCompany from './GetOneCompany';
// import UpdateCompany from './UpdateCompany';
// import { BrowserRouter } from 'react-router-dom';
// import { Footer } from '../Footer';
// import AddCompany from './AddCompany';
// import AddCustomer from './AddCustomer';
// import {GetAllCustomers} from './GetAllCustomers';
// import DeleteCustomer from './DeleteCustomer';
// import GetOneCustomer from './GetOneCustomer';
// import UpdateCustomer from './UpdateCustomer';
// import NotFound from '../NotFound';
// import { CustomerContexts } from '../../contexts/AppContextCustomer';

// interface Props {
//   token: string;
// }



// function HomeAdmin() {
//   const token = CustomerContexts();

//   return (
//     <div className="HomeAdmin">
//       <BrowserRouter>
//         <Routes>
//           <Route path='/' element={<NavBar/>} />
//           <Route path='/updateCompany' element={<UpdateCompany token={token.loginToken} />} />
//           <Route path='/getAllCompanys' element={<GetAllCompanys token={token.loginToken} />} />
//           <Route path='/deleteCompany' element={<DeleteCompany token={token.loginToken} />} />
//           <Route path='/getOneCompany' element={<GetOneCompany token={token.loginToken} />} />
//           <Route path='/addCompany' element={<AddCompany token={token.loginToken} />} />
//           <Route path='/updateCustomer' element={<UpdateCustomer token={token.loginToken} />} />
//           <Route path='/deleteCustomer' element={<DeleteCustomer token={token.loginToken} />} />
//           <Route path='/getAllCustomers' element={<GetAllCustomers token={token.loginToken} />} />
//           <Route path='/getOneCustomer' element={<GetOneCustomer token={token.loginToken} />} />
//           <Route path='/addCustomer' element={<AddCustomer token={token.loginToken} />} />
//           {/* <Route path='*' element={<NotFound />}/> */}
//         </Routes>
//       </BrowserRouter>
//       <Footer/>
//     </div>
//   );
// }

// export default HomeAdmin;