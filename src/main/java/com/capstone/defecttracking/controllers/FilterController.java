/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.controllers;

import com.capstone.defecttracking.models.Filter.Filter;
import com.capstone.defecttracking.models.Issue.IssueResponse;
import com.capstone.defecttracking.models.Server.ServerResponse;
import com.capstone.defecttracking.repositories.Filter.FilterRepository;
import com.capstone.defecttracking.repositories.Filter.FilterRepositoryCustom;
import com.capstone.defecttracking.repositories.Issue.IssueRepository;
import com.capstone.defecttracking.repositories.Issue.IssueRepositoryCustom;
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

/**
 *
 * @author doanb
 */
@RestController
public class FilterController {

    @Autowired
    FilterRepository filterrepository;
    @Autowired
    FilterRepositoryCustom filterrepositorycustom;
    SimpMessagingTemplate messTemplate;
    @Autowired
    IssueRepository issuerepository;
    @Autowired
    IssueRepositoryCustom issuerepositorycustom;

    @Inject
    public FilterController(SimpMessagingTemplate template) {
        this.messTemplate = template;
    }

    @GetMapping("user/updateFilter")
    public List<IssueResponse> updateFilter(@RequestBody Filter filter) {
        ServerResponse serverResponse;
        if (filterrepositorycustom.updateFilter(filter)) {
            return issuerepositorycustom.loadAllIssuesBasedOnFilter(filter);
        }
        return null;
    }
    

}
