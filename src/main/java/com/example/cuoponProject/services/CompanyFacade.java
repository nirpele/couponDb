package com.example.cuoponProject.services;

import com.example.cuoponProject.Exceptions.CompanyException;
import com.example.cuoponProject.Exceptions.LoginException;
import com.example.cuoponProject.Login.UserDetails;
import com.example.cuoponProject.Utils.JWTUtil;
import com.example.cuoponProject.entities.Company;
import com.example.cuoponProject.entities.Coupon;
import com.example.cuoponProject.enums.Category;
import com.example.cuoponProject.enums.UserType;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Data
@Service
@RequiredArgsConstructor
public class CompanyFacade {
    private final CouponServes couponServes;
    private final JWTUtil jwtUtil;

    //finish
    public void addCoupon(int companyId, Coupon coupon, String token) throws LoginException, CompanyException {
        Company company = couponServes.getCompany(companyId);
        boolean isValid = jwtUtil.validateToken(token, new UserDetails(company.getPassword(), company.getEmail(), UserType.COMPANY));
        if (isValid) {
            if (company != null) {
                company.getCoupons().add(coupon);
                couponServes.updateCompany(company);
            } else {
                throw new CompanyException("the id company not exist please check what wrong");
            }
        } else {
            throw new LoginException("mail or password are wrong please try again");
        }
    }

    //finish
    public void updateCoupon(int companyId, Coupon coupon, String token) throws LoginException, CompanyException {
        Company company = couponServes.getCompany(companyId);
        boolean isValid = jwtUtil.validateToken(token, new UserDetails(company.getPassword(), company.getEmail(), UserType.COMPANY));
        if (isValid) {
            if (company != null) {
                int temp = -1;
                for (Coupon item : couponServes.getCompany(companyId).getCoupons()) {
                    if (item.getId() == coupon.getId()) {
                        temp = item.getId();
                    }
                }
                if (temp != -1) {
                    //couponServes.getCompany(companyId).getCoupons().set(temp, coupon);
                    couponServes.updateCoupon(coupon);
                    couponServes.updateCompany(couponServes.getCompany(companyId));
                } else {
                    System.out.println("the coupon not exist");
                }
            } else throw new CompanyException("the id company not exist please check what wrong");
        } else {
            throw new LoginException("mail or password are wrong please try again");
        }

    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //finish
    public void deleteCompanyCoupon(int companyId, int couponId, String token) throws LoginException, CompanyException {
        Optional<Company> company = couponServes.getCompanyRepo().findById(companyId);
        Company companyData = company.get();
        boolean isValid = jwtUtil.validateToken(token, new UserDetails(companyData.getPassword(), companyData.getEmail(), UserType.COMPANY));
        if (isValid) {
            if (company.isPresent()) {
                if (companyData.getCoupons().stream().filter(coupon -> coupon.getId() == couponId).collect(Collectors.toList()).size() == 1) {
                    List<Coupon> coupons = companyData.getCoupons().stream().filter(coupon -> coupon.getId() != couponId).collect(Collectors.toList());
                    companyData.getCoupons().clear();
                    companyData.getCoupons().addAll(coupons);
                    couponServes.getCompanyRepo().save(companyData);
                } else {
                    System.out.println("the coupon not exist");
                }
            } else {
                throw new CompanyException("the id company not exist please check what wrong");
            }
        } else {
            throw new LoginException("mail or password are wrong please try again");
        }
    }

    //for thread the app don't need token, its need to start when the program start and delete the expired coupon by end date
    public void deleteCompanyCouponByDate(int companyId, int couponId) {
        Optional<Company> company = couponServes.getCompanyRepo().findById(companyId);
        if (company.isPresent()) {
            Company companyData = company.get();
            List<Coupon> coupons = companyData.getCoupons().stream().filter(coupon -> coupon.getId() != couponId).collect(Collectors.toList());
            companyData.getCoupons().clear();
            companyData.getCoupons().addAll(coupons);
            couponServes.getCompanyRepo().save(companyData);
        } else {
            System.out.println("the coupon not exist");
        }
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //finish
    public List<Coupon> getCompanyCoupons(int companyId, String token) throws LoginException, CompanyException {
        Optional<Company> company = couponServes.getCompanyRepo().findById(companyId);
        Company companyData = company.get();
        boolean isValid = jwtUtil.validateToken(token, new UserDetails(companyData.getPassword(), companyData.getEmail(), UserType.COMPANY));
        if (isValid) {
            if (company.isPresent()) {
                return couponServes.getCompany(companyData.getId()).getCoupons();
            } else {
                throw new CompanyException("something wrong whit company facade to get the coupon");
            }
        } else {
            throw new LoginException("mail or password are wrong please try again");
        }

    }

    //finish
    public List<Coupon> getCompanyCoupons(int companyId, Category category, String token) throws LoginException, CompanyException {
        Optional<Company> company = couponServes.getCompanyRepo().findById(companyId);
        Company companyData = company.get();
        boolean isValid = jwtUtil.validateToken(token, new UserDetails(companyData.getPassword(), companyData.getEmail(), UserType.COMPANY));
        if (isValid) {
            if (company.isPresent()) {
                return couponServes.getCompany(companyId).getCoupons().stream().filter(coupon -> coupon.getCategory().equals(category)).collect(Collectors.toList());
            } else {
                throw new CompanyException("something wrong whit company facade to get the coupon");
            }
        } else {
            throw new LoginException("mail or password are wrong please try again");
        }
    }

    //finish
    public List<Coupon> getCompanyCoupons(int companyId, double maxPrice, String token) throws LoginException, CompanyException {
        Optional<Company> company = couponServes.getCompanyRepo().findById(companyId);
        Company companyData = company.get();
        boolean isValid = jwtUtil.validateToken(token, new UserDetails(companyData.getPassword(), companyData.getEmail(), UserType.COMPANY));
        if (isValid) {
            if (company.isPresent()) {
                return couponServes.getCompany(companyId).getCoupons().stream().filter(coupon -> coupon.getPrice() <= maxPrice).collect(Collectors.toList());
            } else {
                throw new CompanyException("the coupon not exist");
            }
        } else {
            throw new LoginException("mail or password are wrong please try again");
        }
    }

    //finish
    public Company getCompanyDetails(int companyId, String token) throws LoginException {
        Company company = couponServes.getCompany(companyId);
        boolean isValid = jwtUtil.validateToken(token, new UserDetails(company.getPassword(), company.getEmail(), UserType.COMPANY));
        if (isValid) {
            return couponServes.getCompany(companyId);
        } else {
            throw new LoginException("mail or password are wrong please try again");
        }
    }
}
