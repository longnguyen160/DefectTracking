/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.controllers;

import com.capstone.defecttracking.models.Project.Project;
import com.capstone.defecttracking.models.Server.ServerResponse;
import com.capstone.defecttracking.models.Status.Status;
import com.capstone.defecttracking.models.Status.StatusResponse;
import com.capstone.defecttracking.repositories.Status.StatusRepository;
import com.capstone.defecttracking.repositories.Status.StatusRepositoryCustom;
import java.util.List;
import javax.inject.Inject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 *
 * @author doanb
 */
public class StatusController {

    @Autowired
    StatusRepository statusRepository;
    @Autowired
    StatusRepositoryCustom statusRepositoryCustom;
    private SimpMessagingTemplate messageTemplate;

    @Inject
    public StatusController(SimpMessagingTemplate template) {
        this.messageTemplate = template;
    }

    @PostMapping("/admin/createStatus")
    public ResponseEntity<?> createStatus(@RequestBody Status status) {
        ServerResponse serverResponse;

        if (statusRepositoryCustom.didStatusExisted(status.getName())) {
            serverResponse = new ServerResponse(false, "A Status with that name already exists");
            return new ResponseEntity(serverResponse, HttpStatus.BAD_REQUEST);
        }

        statusRepository.save(status);
        serverResponse = new ServerResponse(true, "Create status successfully");

        messageTemplate.convertAndSend("/topic/status", serverResponse);

        return new ResponseEntity(serverResponse, HttpStatus.ACCEPTED);
    }

    @GetMapping("/loadAllStatus")
    public List<Status> loadAllStatus() {
        return statusRepositoryCustom.loadAllStatus();
    }

    @DeleteMapping("/admin/removeStatus/{statusId}")
    public ResponseEntity<?> removeStatus(@PathVariable("statusId") String statusId) {
        ServerResponse serverResponse;
        boolean result = statusRepository.existsById(statusId);
        if (result) {
            statusRepository.deleteById(statusId);
            serverResponse = new ServerResponse(true, "Remove Status successfully");
            return new ResponseEntity(serverResponse, HttpStatus.ACCEPTED);
        }
        serverResponse = new ServerResponse(true, "Remove Status fail");
        messageTemplate.convertAndSend("/topic/status", serverResponse);
        return new ResponseEntity(serverResponse, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/admin/updateStatus")
    public ResponseEntity<?> updateBacklog(@RequestBody Status status) {
        ServerResponse serverResponse;

        if (statusRepositoryCustom.UpdateStatus(status)) {
            serverResponse = new ServerResponse(true, "Update Status successfully");
            return new ResponseEntity(serverResponse, HttpStatus.ACCEPTED);
        }
        serverResponse = new ServerResponse(true, "Update Status fail");
        messageTemplate.convertAndSend("/topic/status", serverResponse);
        return new ResponseEntity(serverResponse, HttpStatus.BAD_REQUEST);
    }
}
