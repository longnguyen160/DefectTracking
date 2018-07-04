/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.repositories.Category;

import com.capstone.defecttracking.models.Category.Category;
import java.util.List;

/**
 *
 * @author doanb
 */
public interface CategoryRepositoryCustom {
    Category findbyId(String id);
    boolean doesCateExited(String name);
    List<Category> loadAllCate();
}
