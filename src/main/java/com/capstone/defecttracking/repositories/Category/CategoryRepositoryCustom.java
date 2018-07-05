/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.repositories.Category;

import com.capstone.defecttracking.models.Category.CategoryManagementResponse;
import com.capstone.defecttracking.models.Category.CategoryProjectResponse;

import java.util.List;

/**
 *
 * @author doanb
 */
public interface CategoryRepositoryCustom {
    boolean doesCateExited(String name);
    List<CategoryManagementResponse> loadAllCategories();
    List<CategoryProjectResponse> loadAllCategoriesInProject(String projectId);
}
