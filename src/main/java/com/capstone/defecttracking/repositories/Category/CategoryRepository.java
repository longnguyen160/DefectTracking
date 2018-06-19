/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.repositories.Category;

import com.capstone.defecttracking.categories.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author doanb
 */
public interface CategoryRepository extends MongoRepository<Category, String>{
    
}
