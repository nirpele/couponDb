package com.example.cuoponProject.entities;

import com.example.cuoponProject.enums.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Scope;

import javax.persistence.*;
import java.sql.Date;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Scope("prototype")
@Table(name = "Coupon")
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Enumerated(EnumType.ORDINAL)
    private Category category;
    private Date startDate=new Date(System.currentTimeMillis());
    private Date endDate;
    private int amount;
    private double price;
    private String image;

}
