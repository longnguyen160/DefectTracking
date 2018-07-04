/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.repositories.Filter;

import com.capstone.defecttracking.models.Filter.Filter;
import org.springframework.http.ResponseEntity;

/**
 *
 * @author doanb
 */
public interface FilterRepositoryCustom {
    Boolean updateFilter(Filter filter);
}
