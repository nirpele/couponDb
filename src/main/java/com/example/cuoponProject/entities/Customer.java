package com.example.cuoponProject.entities;

import lombok.*;
import org.springframework.context.annotation.Scope;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Scope("prototype")
@Table(name = "Customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String firstName;
    private String lastName;
    //uniqe
    private String email;
    private String password;
    @ManyToMany()
    List<Coupon> coupons=new ArrayList<>();;
}
