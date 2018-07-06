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
import com.capstone.defecttracking.models.Category.CategoryProjectResponse;
import com.capstone.defecttracking.models.Project.Project;
import com.capstone.defecttracking.models.Project.ProjectCategoryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

@Repository
public class CategoryRepositoryCustomImpl implements CategoryRepositoryCustom {

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public boolean doesCategoryExited(String name) {
        Query query = new Query(Criteria.where("name").is(name));

        return mongoTemplate.findOne(query, Category.class) != null;
    }

    @Override
    public void addProject(String projectId, ArrayList<String> categories) {
        Query query = new Query(Criteria.where("_id").in(categories));
        Update update = new Update();

        update.push("projects", projectId);
        mongoTemplate.updateMulti(query, update, Category.class);
    }

    @Override
    public List<CategoryManagementResponse> loadAllCategories() {
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

    @Override
    public List<CategoryProjectResponse> loadAllCategoriesInProject(String projectId) {
        Query query = new Query(Criteria.where("projects").is(projectId));

        return mongoTemplate
            .find(query, Category.class)
            .stream()
            .map(category -> new CategoryProjectResponse(
                category.getId(),
                category.getName(),
                category.getColor(),
                category.getBackground()
            ))
            .collect(Collectors.toList());
    }

    private ProjectCategoryResponse getProjectCategoryResponse(String projectId) {
        Query query = new Query(Criteria.where("_id").is(projectId));
        Project project = mongoTemplate.findOne(query, Project.class);

        return new ProjectCategoryResponse(projectId, project.getName());
    }
}
