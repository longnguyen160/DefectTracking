/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.repositories.Category;

import com.capstone.defecttracking.categories.Category;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class CategoryRepositoryCustomImpl implements CategoryRepositoryCustom {

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public Category findbyId(String Cateid) {
        Query query = new Query(Criteria.where("_id").is(Cateid));
        Category cate = mongoTemplate.findOne(query, Category.class);
        if (cate != null) {
            return cate;
        }
        return null;
    }

    @Override
    public boolean doesCateExited(String name) {
        Query query = new Query(Criteria.where("name").is(name));
        Category cate = mongoTemplate.findOne(query, Category.class);
        if (cate != null) {
            return true;
        }
        return false;
    }

    @Override
    public List<Category> loadAllCate() {
        List<Category> result = mongoTemplate.findAll(Category.class);
        if (result.isEmpty()) {
            return null;
        }
        return result;

    }

}
