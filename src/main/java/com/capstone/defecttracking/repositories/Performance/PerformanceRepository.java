/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.repositories.Performance;

import com.capstone.defecttracking.models.PA.PerformanceAssessment;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author doanb
 */
public interface PerformanceRepository extends MongoRepository<PerformanceAssessment, String>{
    
}
