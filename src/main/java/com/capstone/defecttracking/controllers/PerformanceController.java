/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.controllers;

import com.capstone.defecttracking.models.PA.PerformanceAssessment;
import com.capstone.defecttracking.models.User.User;
import com.capstone.defecttracking.repositories.Performance.PerformanceRepository;
import com.capstone.defecttracking.repositories.Performance.PerformanceRepositoryCustom;
import com.capstone.defecttracking.repositories.User.UserRepositoryCustom;
import java.util.List;
import javax.inject.Inject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PerformanceController {

    @Autowired
    PerformanceRepository performancerepository;
    @Autowired
    PerformanceRepositoryCustom performanceRepositoryCustom;
    @Autowired
    UserRepositoryCustom userRepositoryCustom;
    private SimpMessagingTemplate template;

    @Inject
    public PerformanceController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @GetMapping("/loadAllPAByRole")
    public List<PerformanceAssessment> loadAllPerformanceByRole(String role) {
        return performanceRepositoryCustom.loadPAwithrole(role);
    }

    @GetMapping("/loadPAofUser")
    public String loadPerformanceOfUser(String userId) {

        return null;
    }

}
