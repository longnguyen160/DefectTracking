/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.repositories.Category;

import com.capstone.defecttracking.models.Category.Category;
import com.capstone.defecttracking.models.Category.CategoryManagementResponse;
import com.capstone.defecttracking.models.Category.CategoryProjectResponse;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author doanb
 */
public interface CategoryRepositoryCustom {
    boolean doesCategoryExited(String name);
    void addProject(String projectId, ArrayList<String> categories);
    void removeCategoryFromIssue(String categoryId);
    CategoryProjectResponse loadCategoryDetails(String categoryId);
    boolean updateCategory(Category category);
    List<CategoryManagementResponse> loadAllCategories();
    List<CategoryProjectResponse> loadAllCategoriesInProject(String projectId);
}
