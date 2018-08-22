/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.repositories.Performance;

import com.capstone.defecttracking.models.PA.PerformanceAssessment;
import com.capstone.defecttracking.models.PA.PerformanceAssessmentRequest;
import com.capstone.defecttracking.models.PA.PerformanceAssessmentResponse;
import com.capstone.defecttracking.models.PA.PerformanceAssessmentSummaryResponse;

import java.util.Date;
import java.util.List;

public interface PerformanceRepositoryCustom {
    List<PerformanceAssessmentResponse> getUserKPI(PerformanceAssessmentRequest performanceAssessmentRequest);
    PerformanceAssessmentSummaryResponse getSummaryDetails(String userId);
    boolean updateKPI(PerformanceAssessment performanceAssessment);
}
