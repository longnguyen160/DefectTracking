package com.capstone.defecttracking.controllers;

import com.capstone.defecttracking.models.Phase.Phase;
import com.capstone.defecttracking.models.Phase.PhaseIssueRequest;
import com.capstone.defecttracking.models.Phase.PhaseResponse;
import com.capstone.defecttracking.models.Server.ServerResponse;
import com.capstone.defecttracking.repositories.Phase.PhaseRepository;
import com.capstone.defecttracking.repositories.Phase.PhaseRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.List;

@RestController
public class PhaseController {

    @Autowired
    PhaseRepository phaseRepository;

    @Autowired
    PhaseRepositoryCustom phaseRepositoryCustom;

    private SimpMessagingTemplate template;

    @Inject
    public PhaseController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @PostMapping("user/createPhase")
    public ResponseEntity<?> createPhase(@RequestBody Phase phase) {
        ServerResponse serverResponse;

        if (phaseRepositoryCustom.didPhaseNameExisted(phase.getName(), phase.getProjectId())) {
            serverResponse = new ServerResponse(false, "Phase already existed");

            return new ResponseEntity(serverResponse, HttpStatus.BAD_REQUEST);
        }
        phaseRepository.save(phase);
        serverResponse = new ServerResponse(true, "Create phase successfully");

        template.convertAndSend("/topic/phase", serverResponse);

        return new ResponseEntity(serverResponse, HttpStatus.ACCEPTED);
    }

    @GetMapping("user/loadAllPhases")
    public List<PhaseResponse> loadAllPhases(@RequestParam(value = "projectId") String projectId) {
        return phaseRepositoryCustom.loadAllPhases(projectId);
    }

    @PostMapping("/user/updatePhaseIssueList")
    public ResponseEntity<?> updatePhaseIssueList(@RequestBody PhaseIssueRequest phaseIssueRequest) {
        ServerResponse serverResponse;

        phaseRepositoryCustom.updateIssueList(phaseIssueRequest.getPhaseId(), phaseIssueRequest.getIssueList());
        serverResponse = new ServerResponse(true, "Update phase successfully");

        template.convertAndSend("/topic/phase", serverResponse);

        return new ResponseEntity(serverResponse, HttpStatus.ACCEPTED);
    }

}
