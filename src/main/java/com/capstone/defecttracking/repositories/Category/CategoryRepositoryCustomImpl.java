/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.repositories.Category;

import com.capstone.defecttracking.models.Category.Category;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.capstone.defecttracking.models.Category.CategoryManagementResponse;
import com.capstone.defecttracking.models.Project.Project;
import com.capstone.defecttracking.models.Project.ProjectCategoryResponse;
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
    public boolean doesCateExited(String name) {
        Query query = new Query(Criteria.where("name").is(name));

        Category cate = mongoTemplate.findOne(query, Category.class);
        return cate != null;
    }

    @Override
    public List<CategoryManagementResponse> loadAllCategory() {
        return mongoTemplate
            .findAll(Category.class)
            .stream()
            .map(category -> new CategoryManagementResponse(
                category.getId(),
                category.getName(),
                category.getColor(),
                category.getBackground(),
                new ArrayList<ProjectCategoryResponse>(category
                    .getProjects()
                    .stream()
                    .map(this::getProjectCategoryResponse)
                    .collect(Collectors.toList()))
            ))
            .collect(Collectors.toList());
    }

    private ProjectCategoryResponse getProjectCategoryResponse(String projectId) {
        Query query = new Query(Criteria.where("_id").is(projectId));
        Project project = mongoTemplate.findOne(query, Project.class);

        return new ProjectCategoryResponse(projectId, project.getName());
    }
}
