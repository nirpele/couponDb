package com.example.cuoponProject.services;


import com.example.cuoponProject.Exceptions.LoginException;
import com.example.cuoponProject.Login.UserDetails;
import com.example.cuoponProject.Utils.JWTUtil;
import com.example.cuoponProject.entities.Company;
import com.example.cuoponProject.entities.Customer;
import com.example.cuoponProject.enums.UserType;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Data
public class AdminFacade {
    private final CouponServes couponServes;
    private final JWTUtil jwtUtil;


    public void addCompany(Company company, String token) throws LoginException {
        boolean isValid = jwtUtil.validateToken(token, new UserDetails("admin", "admin@admin", UserType.ADMINISTRATOR));
        if (isValid) {
            couponServes.addCompany(company);
        } else {
            throw new LoginException("mail or password are wrong please try again");
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public void deleteCompany(int companyId, String token) throws LoginException {
        boolean isValid = jwtUtil.validateToken(token, new UserDetails("admin", "admin@admin", UserType.ADMINISTRATOR));
        if (isValid) {
            couponServes.deleteCompany(companyId);
        } else {
            throw new LoginException("mail or password are wrong please try again");
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public void updateCompany(Company company, String token) throws LoginException {
        boolean isValid = jwtUtil.validateToken(token, new UserDetails("admin", "admin@admin", UserType.ADMINISTRATOR));
        if (isValid) {
            couponServes.updateCompany(company);
        } else {
            throw new LoginException("mail or password are wrong please try again");
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public List<Company> getAllCompanies(String token) throws LoginException {
        boolean isValid = jwtUtil.validateToken(token, new UserDetails("admin", "admin@admin", UserType.ADMINISTRATOR));
        if (isValid) {
            return couponServes.getAllCompany();
        } else {
            throw new LoginException("mail or password are wrong please try again");
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//service for login service to get all customers and get from them the right company by id
    public List<Company> getAllCompaniesForLogIn() {
        return couponServes.getAllCompany();
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public Company getOneCompany(int companyId, String token) throws LoginException {
        boolean isValid = jwtUtil.validateToken(token, new UserDetails("admin", "admin@admin", UserType.ADMINISTRATOR));
        if (isValid) {
            return couponServes.getCompany(companyId);
        } else {
            throw new LoginException("mail or password are wrong please try again");
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public void addCustomer(Customer customer, String token) throws LoginException {
        boolean isValid = jwtUtil.validateToken(token, new UserDetails("admin", "admin@admin", UserType.ADMINISTRATOR));
        if (isValid) {
            couponServes.addCustomer(customer);
        } else {
            throw new LoginException("mail or password are wrong please try again");
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public void updateCustomer(Customer customer, String token) throws LoginException {
        boolean isValid = jwtUtil.validateToken(token, new UserDetails("admin", "admin@admin", UserType.ADMINISTRATOR));
        if (isValid) {
            couponServes.updateCustomer(customer);
        } else {
            throw new LoginException("mail or password are wrong please try again");
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public void deleteCustomer(int customerId, String token) throws LoginException {
        boolean isValid = jwtUtil.validateToken(token, new UserDetails("admin", "admin@admin", UserType.ADMINISTRATOR));
        if (isValid) {
            couponServes.deleteCustomer(customerId);
        } else {
            throw new LoginException("mail or password are wrong please try again");
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public List<Customer> getAllCustomers(String token) throws LoginException {
        boolean isValid = jwtUtil.validateToken(token, new UserDetails("admin", "admin@admin", UserType.ADMINISTRATOR));
        if (isValid) {
            return couponServes.getAllCustomers();
        } else {
            throw new LoginException("mail or password are wrong please try again");
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //service for login service to get all customers and get from them the right customer by id

    public List<Customer> getAllCustomersForLogIn() {

        return couponServes.getAllCustomers();
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public Customer getOneCustomer(int customerId, String token) throws LoginException {
        boolean isValid = jwtUtil.validateToken(token, new UserDetails("admin", "admin@admin", UserType.ADMINISTRATOR));
        if (isValid) {
            return couponServes.getCustomer(customerId);
        } else {
            throw new LoginException("mail or password are wrong please try again");
        }
    }
}
