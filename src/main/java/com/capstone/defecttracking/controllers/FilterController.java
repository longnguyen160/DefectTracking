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

import java.io.IOException;
import java.util.List;
import java.util.Map;
import javax.inject.Inject;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author doanb
 */
@RestController
public class FilterController {

    @Autowired
    FilterRepository filterRepository;

    @Autowired
    FilterRepositoryCustom filterRepositoryCustom;

    SimpMessagingTemplate messTemplate;

    @Autowired
    IssueRepository issueRepository;

    @Autowired
    IssueRepositoryCustom issueRepositoryCustom;

    @Inject
    public FilterController(SimpMessagingTemplate template) {
        this.messTemplate = template;
    }

    @GetMapping("user/updateFilter")
    public List<IssueResponse> updateFilter(@RequestParam Map<String, List<String>> filterRequest) {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            Filter filter = objectMapper.readValue(new Gson().toJson(filterRequest), Filter.class);
            filterRepositoryCustom.updateFilter(filter);

            return issueRepositoryCustom.loadAllIssuesBasedOnFilter(filter);
        } catch (IOException e) {
            e.printStackTrace();

            return null;
        }
    }

    @GetMapping("user/getFilter")
    public Filter getFilter(@RequestParam(value = "userId") String userId) {
        return filterRepositoryCustom.getFilter(userId);
    }
}
