package com.example.cuoponProject.entities;

import com.example.cuoponProject.enums.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerHelper {
    private int customerId;
    private Coupon coupon;
    private int maxPrice;
    private Category category;
}
