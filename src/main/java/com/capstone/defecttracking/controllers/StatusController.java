/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.controllers;

import com.capstone.defecttracking.models.Server.ServerResponse;
import com.capstone.defecttracking.models.Status.Status;
import com.capstone.defecttracking.repositories.Status.StatusRepository;
import com.capstone.defecttracking.repositories.Status.StatusRepositoryCustom;
import java.util.List;
import javax.inject.Inject;
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

    @GetMapping("/admin/loadAllStatus")
    public List<Status> loadAllStatus() {
        return statusRepositoryCustom.loadAllStatus();
    }
    
    @DeleteMapping("/admin/removeStatus/{statusId}")
    public ResponseEntity<?> removeStatus(@PathVariable("statusId") String statusId) {
        ServerResponse serverResponse;

        if (statusRepository.existsById(statusId)) {
            statusRepository.deleteById(statusId);
            serverResponse = new ServerResponse(true, "Remove Status successfully");

            messageTemplate.convertAndSend("/topic/status", serverResponse);
            return new ResponseEntity(serverResponse, HttpStatus.ACCEPTED);
        }

        serverResponse = new ServerResponse(true, "Remove Status fail");
        return new ResponseEntity(serverResponse, HttpStatus.BAD_REQUEST);
    }
    
    @PostMapping("/admin/updateStatus")
    public ResponseEntity<?> updateStatus(@RequestBody Status status) {
        ServerResponse serverResponse;
        
        if (statusRepositoryCustom.UpdateStatus(status)) {
            serverResponse = new ServerResponse(true, "Update Status successfully");

            messageTemplate.convertAndSend("/topic/status", serverResponse);
            return new ResponseEntity(serverResponse, HttpStatus.ACCEPTED);
        }

        serverResponse = new ServerResponse(true, "Update Status fail");
        return new ResponseEntity(serverResponse, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/admin/changeDefaultStatus")
    public ResponseEntity<?> updateBacklog(@RequestBody String statusId) {
        ServerResponse serverResponse;
        
        if (statusRepositoryCustom.UpdateStatusDefault(statusId)) {
            serverResponse = new ServerResponse(true, "Update Status successfully");
            return new ResponseEntity(serverResponse, HttpStatus.ACCEPTED);
        }
        serverResponse = new ServerResponse(true, "Update Status fail");
        messageTemplate.convertAndSend("/topic/status", serverResponse);
        return new ResponseEntity(serverResponse, HttpStatus.BAD_REQUEST);
    }
    
}
