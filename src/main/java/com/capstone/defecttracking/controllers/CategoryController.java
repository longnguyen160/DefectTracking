/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.controllers;

import com.capstone.defecttracking.categories.Category;
import com.capstone.defecttracking.models.Server.ServerResponse;
import com.capstone.defecttracking.repositories.Category.CategoryRepository;
import com.capstone.defecttracking.repositories.Category.CategoryRepositoryCustom;
import java.util.List;
import javax.inject.Inject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class CategoryController {

    @Autowired
    CategoryRepository caterepository;
    @Autowired
    CategoryRepositoryCustom caterepositorycustom;
    SimpMessagingTemplate messTemplate;

    @Inject
    public CategoryController(SimpMessagingTemplate template) {
        this.messTemplate = template;
    }

    @PostMapping("/admin/createCategory")
    public ResponseEntity<?> createCate(@RequestBody Category cate) {
        ServerResponse serverrespone;
        if (caterepositorycustom.doesCateExited(cate.getName())) {
            serverrespone = new ServerResponse(Boolean.FALSE, "This Category have been create already");
            return new ResponseEntity(serverrespone, HttpStatus.BAD_REQUEST);
        }
        caterepository.save(cate);
        serverrespone = new ServerResponse(Boolean.TRUE, "Create category successfull");
        messTemplate.convertAndSend("/topic/categories", serverrespone);

        return new ResponseEntity<>(serverrespone, HttpStatus.ACCEPTED);
    }
    @PostMapping("/admin/deleteCategory")
    public ResponseEntity<?> deleteCategory(@RequestBody String categoryId) {
        ServerResponse serverrespone;
        
        caterepository.deleteById(categoryId);
        serverrespone = new ServerResponse(Boolean.TRUE, "Delete category successfully");
        messTemplate.convertAndSend("/topic/categories",serverrespone);
        return new ResponseEntity<>(serverrespone, HttpStatus.ACCEPTED);
    }
    @GetMapping("/admin/loadAllCategories")
    public List<Category> getAllCate() {
        return caterepositorycustom.loadAllCate();
    }

}
