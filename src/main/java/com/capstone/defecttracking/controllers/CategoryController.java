/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.controllers;

import com.capstone.defecttracking.models.Category.Category;
import com.capstone.defecttracking.models.Category.CategoryManagementResponse;
import com.capstone.defecttracking.models.Category.CategoryProjectResponse;
import com.capstone.defecttracking.models.Server.ServerResponse;
import com.capstone.defecttracking.repositories.Category.CategoryRepository;
import com.capstone.defecttracking.repositories.Category.CategoryRepositoryCustom;
import java.util.List;
import javax.inject.Inject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController

public class CategoryController {

    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    CategoryRepositoryCustom categoryRepositoryCustom;

    private SimpMessagingTemplate messTemplate;

    @Inject
    public CategoryController(SimpMessagingTemplate template) {
        this.messTemplate = template;
    }

    @PostMapping("/admin/createCategory")
    public ResponseEntity<?> createCategory(@RequestBody Category cate) {
        ServerResponse serverResponse;

        if (categoryRepositoryCustom.doesCategoryExited(cate.getName())) {
            serverResponse = new ServerResponse(Boolean.FALSE, "This Category have been create already");

            return new ResponseEntity(serverResponse, HttpStatus.BAD_REQUEST);
        }
        categoryRepository.save(cate);
        serverResponse = new ServerResponse(Boolean.TRUE, "Create category successfull");
        messTemplate.convertAndSend("/topic/categories", serverResponse);

        return new ResponseEntity<>(serverResponse, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/admin/deleteCategory/{categoryId}")
    public ResponseEntity<?> deleteCategory(@PathVariable("categoryId") String categoryId) {
        ServerResponse serverResponse;

        categoryRepositoryCustom.removeCategoryFromIssue(categoryId);
        categoryRepository.deleteById(categoryId);
        serverResponse = new ServerResponse(Boolean.TRUE, "Delete category successfully");

        messTemplate.convertAndSend("/topic/categories",serverResponse);
        return new ResponseEntity<>(serverResponse, HttpStatus.ACCEPTED);
    }

    @GetMapping("/admin/loadAllCategories")
    public List<CategoryManagementResponse> getAllCategories() {
        return categoryRepositoryCustom.loadAllCategories();
    }

    @GetMapping("/user/loadAllCategoriesInProject")
    public List<CategoryProjectResponse> loadAllCategoriesInProject(@RequestParam(value = "projectId") String projectId) {
        return categoryRepositoryCustom.loadAllCategoriesInProject(projectId);
    }
}
