package com.example.cuoponProject.Thread;

import com.example.cuoponProject.services.AdminFacade;
import com.example.cuoponProject.services.CompanyFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.Date;

@Component
@EnableAsync
@RequiredArgsConstructor
public class Job {
    private final AdminFacade adminFacade;
    private final CompanyFacade companyFacade;



    @Async
    @Scheduled(cron = "10 45 22 * * ?", zone = "Asia/Jerusalem")
    public void deleteCoupon() throws InterruptedException {
        Date today = new Date(System.currentTimeMillis());
        adminFacade.getAllCompaniesForLogIn().stream()
                .forEach(company -> company.getCoupons().stream()
                        .filter(coupon -> coupon.getEndDate().before(today))
                        .forEach(coupon -> companyFacade.
                                deleteCompanyCouponByDate(company.getId(), coupon.getId())));
        throw new InterruptedException();
    }
}
