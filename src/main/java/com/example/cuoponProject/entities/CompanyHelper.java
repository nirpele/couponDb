package com.example.cuoponProject.entities;

import com.example.cuoponProject.enums.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyHelper {
    private int companyId;
    private Category category;
    private int maxPrice;
    private Coupon coupon;
}
