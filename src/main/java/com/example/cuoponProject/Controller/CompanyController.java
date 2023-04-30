package com.example.cuoponProject.Controller;

import com.example.cuoponProject.Exceptions.CompanyException;
import com.example.cuoponProject.Exceptions.LoginException;
import com.example.cuoponProject.entities.Coupon;
import com.example.cuoponProject.enums.Category;
import com.example.cuoponProject.services.CompanyFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("company")
@CrossOrigin
public class CompanyController {
    private final CompanyFacade companyFacade;

    @GetMapping("findMyIdByEmail")
    public ResponseEntity<?> findMyIdByEmail(@RequestParam String email) throws CompanyException {
        try {
            return new ResponseEntity<>(companyFacade.findMyIdByEmail(email), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //checked
    @PostMapping("addCoupon")
    public ResponseEntity<?> addCoupon(@RequestParam int companyId, @RequestBody Coupon coupon, @RequestHeader(name = "Authorization") String token) throws LoginException, CompanyException {
        try {
            companyFacade.addCoupon(companyId, coupon, token);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //checked
    @PostMapping("deleteCoupon")
    public ResponseEntity<?> deleteCoupon(@RequestParam int companyId, @RequestParam int couponId, @RequestHeader(name = "Authorization") String token) throws LoginException, CompanyException {
        try {
            //check if token is valid
            //int companyId = Integer.parseInt(data.get("companyId"));
            //int couponId = Integer.parseInt(data.get("couponId"));
            // @RequestBody Map<String,String> data
            companyFacade.deleteCompanyCoupon(companyId, couponId, token);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (LoginException|CompanyException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //need to check
    @PostMapping("updateCoupon")
    public ResponseEntity<?> updateCoupon(@RequestParam int companyId, @RequestBody Coupon coupon, @RequestHeader(name = "Authorization") String token) throws LoginException, CompanyException {
        try {
            //check if token is valid
            companyFacade.updateCoupon(companyId, coupon, token);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //checked
    @GetMapping("getCoupons")
    public ResponseEntity<?> getCompanyCoupons(@RequestParam int companyId, @RequestHeader(name = "Authorization") String token) throws LoginException, CompanyException {
        try {
            //check if token is valid
            return new ResponseEntity<>(companyFacade.getCompanyCoupons(companyId, token), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //checked
    @GetMapping("getCoupons/category")
    public ResponseEntity<?> getCouponsByCategory(@RequestParam int companyId, @RequestParam Category category, @RequestHeader(name = "Authorization") String token) throws LoginException, CompanyException {
        //check if token is valid

            return new ResponseEntity<>(companyFacade.getCompanyCoupons(companyId, category, token), HttpStatus.OK);
    }


    @GetMapping("getCoupons/maxToPay")
    public ResponseEntity<?> getCouponsByMaxPrice(@RequestParam int companyId, @RequestParam int maxPrice, @RequestHeader(name = "Authorization") String token) throws LoginException, CompanyException {
        try {
            //check if token is valid
            return new ResponseEntity<>(companyFacade.getCompanyCoupons(companyId, maxPrice, token), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    //checked
    @GetMapping("getDetails")
    public ResponseEntity<?> getCompanyDetails(@RequestParam int companyId, @RequestHeader(name = "Authorization") String token) throws LoginException, CompanyException {
        try {
            //check if token is valid
            return new ResponseEntity<>(companyFacade.getCompanyDetails(companyId, token), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


}
