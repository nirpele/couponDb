package com.example.cuoponProject.Repositories;


import com.example.cuoponProject.entities.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CouponRepo extends JpaRepository<Coupon, Integer> {
    //smart dilect
    Coupon findCouponById(int id);

}
