package com.example.cuoponProject.services;

import com.example.cuoponProject.Repositories.CompanyRepo;
import com.example.cuoponProject.Repositories.CouponRepo;
import com.example.cuoponProject.Repositories.CustomerRepo;
import com.example.cuoponProject.entities.Company;
import com.example.cuoponProject.entities.Coupon;
import com.example.cuoponProject.entities.Customer;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Service
@RequiredArgsConstructor
public class CouponServes {
    private final CouponRepo couponRepo;
    private final CustomerRepo customerRepo;
    private final CompanyRepo companyRepo;

    //Coupon
    //check already
    public Coupon getCoupon(int id) {
        return couponRepo.findCouponById(id);
    }

    //we need that the customer can choose from all the coupons the coupon he wants
    public List<Coupon> getAllCoupons() {
        return couponRepo.findAll();
    }

    public void updateCoupon(Coupon coupon) {
        if (!couponRepo.existsById(coupon.getId())) {
            System.out.println("this coupon not exist try again");
        } else {
            couponRepo.saveAndFlush(coupon);
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public void deleteCoupon(int id) {
        if (!couponRepo.existsById(id)) {
            System.out.println("this coupon not exist ");
        } else {
            couponRepo.deleteById(id);
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //check already
    public void deleteCouponPurchase(int customerId, int couponId) {
        List<Coupon> coupons = getCustomer(customerId).getCoupons().stream().filter(coupon -> coupon.getId() == couponId).collect(Collectors.toList());
        if (coupons.size() == 0) {
            System.out.println("the coupon not exist");
        }
        Customer customer = getCustomer(customerId);
        customer.getCoupons().stream().filter(coupon -> coupon.getId() != couponId).collect(Collectors.toList());
        updateCustomer(customer);
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Customer
    public boolean isCustomerExistByMail(String email) {
        List<Customer> findByMailPassword = customerRepo.findAll().
                stream().
                filter(customer -> customer.getEmail().equals(email)).
                collect(Collectors.toList());
        return findByMailPassword.size() == 1;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public void addCustomer(Customer customer) {
        if (isCustomerExistByMail(customer.getEmail())) {
            System.out.println("this email already exist");
        } else {
            if (!isCustomerExistByMail(customer.getEmail())) {
                customerRepo.save(customer);
            }
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public void updateCustomer(Customer customer) {
        if (!customerRepo.existsById(customer.getId())) {
            System.out.println("this customer not exist try again");
        } else {
            //check that the company email not add already
            if (!isCustomerExistByMail(customer.getEmail())) {
                customerRepo.saveAndFlush(customer);
            }
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public void deleteCustomer(int id) {
        if (!customerRepo.existsById(id)) {
            System.out.println("this customer not exist try again");
        } else {
            customerRepo.deleteById(id);
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public Customer getCustomer(int id) {
        return customerRepo.findCustomerById(id);
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public List<Customer> getAllCustomers() {
        return customerRepo.findAll();
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Company
    //check already
    public boolean isCompanyExistByName(String email) {
        List<Company> findByMailPassword = companyRepo.findAll().
                stream().
                filter(company -> company.getEmail().equals(email)).
                collect(Collectors.toList());
        return findByMailPassword.size() == 1;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //check already
    public void addCompany(Company company) {
        if (companyRepo.findByNameLike(company.getName()).size() == 0 && company.getName() != null && company.getName() != "") {
            if (!isCompanyExistByName(company.getEmail())) {
                companyRepo.save(company);
            }
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public void updateCompany(Company company) {
        if (!companyRepo.existsById(company.getId())) {
            System.out.println("this company not exist try again");
        } else {
            companyRepo.saveAndFlush(company);
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public void deleteCompany(int id) {
        if (!companyRepo.existsById(id)) {
            System.out.println("this company not exist try again");
        } else {
            companyRepo.deleteById(id);
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //check already
    public List<Company> getAllCompany() {
        return companyRepo.findAll();
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //check already
    public Company getCompany(int id) {
        return companyRepo.findCompanyById(id);
    }
}
