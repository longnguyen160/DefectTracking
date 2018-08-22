/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.controllers;

import com.capstone.defecttracking.models.PA.PerformanceAssessment;
import com.capstone.defecttracking.models.PA.PerformanceAssessmentRequest;
import com.capstone.defecttracking.models.PA.PerformanceAssessmentResponse;
import com.capstone.defecttracking.models.PA.PerformanceAssessmentSummaryResponse;
import com.capstone.defecttracking.models.Server.ServerResponse;
import com.capstone.defecttracking.models.User.User;
import com.capstone.defecttracking.repositories.Performance.PerformanceRepository;
import com.capstone.defecttracking.repositories.Performance.PerformanceRepositoryCustom;
import com.capstone.defecttracking.repositories.User.UserRepositoryCustom;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.inject.Inject;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
public class PerformanceController {

    @Autowired
    PerformanceRepository performanceRepository;

    @Autowired
    PerformanceRepositoryCustom performanceRepositoryCustom;

    @Autowired
    UserRepositoryCustom userRepositoryCustom;

    private SimpMessagingTemplate template;

    @Inject
    public PerformanceController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @GetMapping("/admin/getKPIData")
    public List<PerformanceAssessment> getKPIData() {
        return performanceRepository.findAll();
    }

    @GetMapping("/user/getUsersKPI")
    public List<PerformanceAssessmentResponse> getUserKPI(@RequestParam("dataRequest") String dataRequest) {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            PerformanceAssessmentRequest performanceAssessmentRequest = objectMapper.readValue(dataRequest, PerformanceAssessmentRequest.class);

            return performanceRepositoryCustom.getUserKPI(performanceAssessmentRequest);
        } catch (IOException e) {
            e.printStackTrace();

            return new ArrayList<>();
        }
    }

    @GetMapping("/user/getSummaryDetails")
    public PerformanceAssessmentSummaryResponse getSummaryDetails(@RequestParam("userId") String userId) {
        return performanceRepositoryCustom.getSummaryDetails(userId);
    }

    @PostMapping("/admin/updateKPI")
    public ResponseEntity<?> updateKPI(@RequestBody PerformanceAssessment kpi) {
        ServerResponse serverResponse;

        if (performanceRepositoryCustom.updateKPI(kpi)) {
            serverResponse = new ServerResponse(true, "Update KPI successfully");

            return new ResponseEntity(serverResponse, HttpStatus.ACCEPTED);
        }

        serverResponse = new ServerResponse(true, "Update KPI failed");

        return new ResponseEntity(serverResponse, HttpStatus.BAD_REQUEST);
    }
}
