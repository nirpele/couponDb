package com.example.cuoponProject.CLR;

import com.example.cuoponProject.entities.Company;
import com.example.cuoponProject.entities.Coupon;
import com.example.cuoponProject.entities.Customer;
import com.example.cuoponProject.enums.Category;
import com.example.cuoponProject.services.AdminFacade;
import com.example.cuoponProject.services.CompanyFacade;
import com.example.cuoponProject.services.CustomerFacade;
import com.example.cuoponProject.services.LoginFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Order(1)
public class Tester implements CommandLineRunner {
    private final AdminFacade adminFacade;
    private final CompanyFacade companyFacade;
    private final CustomerFacade customerFacade;
    private final LoginFacade loginFacade;

    public void run(String... args) throws Exception {

        Coupon coupon1 = Coupon.builder().category(Category.FOOD).price(1.2).build();
        Coupon coupon2 = Coupon.builder().category(Category.FOOD).price(1.1).build();
        Coupon coupon3 = Coupon.builder().category(Category.RESTAURANT).price(1.5).build();
        Coupon coupon4 = Coupon.builder().category(Category.FOOD).price(1.5).build();
        Coupon coupon5 = Coupon.builder().category(Category.ELECTRICITY).build();
        Coupon coupon6 = Coupon.builder().category(Category.FOOD).build();
        Coupon coupon7 = Coupon.builder().category(Category.RESTAURANT).build();
        Coupon coupon8 = Coupon.builder().category(Category.ELECTRICITY).build();
        Coupon coupon9 = Coupon.builder().category(Category.FOOD).build();
        Coupon coupon10 = Coupon.builder().id(1).price(80).image("jvvh").category(Category.VACATION).build();
        List<Coupon> listCouponCom1 = new ArrayList<>();
        listCouponCom1.add(coupon1);
        listCouponCom1.add(coupon2);
        listCouponCom1.add(coupon3);
        listCouponCom1.add(coupon4);
        List<Coupon> listCouponCom2 = new ArrayList<>();
        listCouponCom2.add(coupon5);
        listCouponCom2.add(coupon6);
        listCouponCom2.add(coupon7);
        listCouponCom2.add(coupon8);


        Company company1 = Company.builder().name("blackrock").email("1111").password("9999").coupons(listCouponCom1).build();
        Company company2 = Company.builder().name("paypal").email("1111").password("99995").coupons(listCouponCom2).build();
        ///////////////////////////////////////////////////////////////////////////////////////////////////////
        Customer customer1 = Customer.builder().firstName("nir").build();
        //////////////////////////////////////////////////////////////////////////////////////////////////////////

       // companyFacade.deleteCompanyCoupon(company1.getId(),1);
        //System.out.println(companyFacade.getCompanyDetails(company1.getId()));
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}


