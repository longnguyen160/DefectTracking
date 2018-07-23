/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.repositories.Performance;

import com.capstone.defecttracking.models.PA.PerformanceAssessment;
import java.util.Date;
import java.util.List;

public interface PerformanceRepositoryCustom {
    List<PerformanceAssessment> loadPAwithrole(String role);
    Integer getPAofUser(String userId,Date StartDate, Date EndDate);
}
