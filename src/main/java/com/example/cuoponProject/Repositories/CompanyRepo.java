package com.example.cuoponProject.Repositories;

import com.example.cuoponProject.entities.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CompanyRepo extends JpaRepository<Company, Integer> {

    Company findCompanyById(int id);

    List<Company> findByNameLike(String name);

}
