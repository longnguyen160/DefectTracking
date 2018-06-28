package com.capstone.defecttracking.controllers;

import com.capstone.defecttracking.models.Project.Project;
import com.capstone.defecttracking.models.Project.ProjectBacklogRequest;
import com.capstone.defecttracking.models.Project.ProjectResponse;
import com.capstone.defecttracking.models.Project.UserProjectRequest;
import com.capstone.defecttracking.models.Server.ServerResponse;
import com.capstone.defecttracking.models.User.UserDetailsSecurity;
import com.capstone.defecttracking.repositories.Project.ProjectRepository;
import com.capstone.defecttracking.repositories.Project.ProjectRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsCriteria;

@RestController
public class ProjectController {

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    ProjectRepositoryCustom projectRepositoryCustom;

    private SimpMessagingTemplate template;

    @Inject
    public ProjectController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @PostMapping("/admin/createProject")
    public ResponseEntity<?> createProject(@RequestBody Project project) {
        ServerResponse serverResponse;

        if (projectRepositoryCustom.doesProjectExisted(project.getName())) {
            serverResponse = new ServerResponse(false, "A project with that name already exists");

            return new ResponseEntity(serverResponse, HttpStatus.BAD_REQUEST);
        }

        projectRepository.save(project);
        serverResponse = new ServerResponse(true, "Create project successfully");

        template.convertAndSend("/topic/projects", serverResponse);

        return new ResponseEntity(serverResponse, HttpStatus.ACCEPTED);
    }

    @GetMapping("/loadAllProjects")
    public List<ProjectResponse> loadAllProject() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsSecurity userDetailsSecurity = (UserDetailsSecurity) authentication.getPrincipal();

        return projectRepositoryCustom.loadAllProjectsForCurrentUser(userDetailsSecurity.getId());
    }

    @GetMapping("user/loadProjectDetails")
    public Project loadProjectDetails(@RequestParam(value = "projectId") String projectId) {
        return projectRepositoryCustom.loadProjectDetails(projectId);
    }

    @PostMapping("/project/addUserToProject")
    public ResponseEntity<?> addUserToProject(@RequestBody UserProjectRequest userProjectRequest) {
        ResponseEntity<?> responseEntity = projectRepositoryCustom.addUserToProject(userProjectRequest);

        template.convertAndSend("/topic/usersInProject", responseEntity);

        return responseEntity;
    }

    @DeleteMapping("/manager/removeUserFromProject/{projectId}/{userId}")
    public ResponseEntity<?> removeUser(@PathVariable("projectId") String projectId,@PathVariable("userId") String userId) {
        ResponseEntity<?> responseEntity = projectRepositoryCustom.removeUserFromProject(projectId, userId);

        template.convertAndSend("/topic/usersInProject", responseEntity);
        return responseEntity;
    }

    @PostMapping("/project/updateBacklog")
    public ResponseEntity<?> updateBacklog(@RequestBody ProjectBacklogRequest projectBacklog) {
        ServerResponse serverResponse;

        projectRepositoryCustom.updateBacklog(projectBacklog.getProjectId(), projectBacklog.getBacklog());
        serverResponse = new ServerResponse(true, "Update backlog successfully");

        template.convertAndSend("/topic/projects", serverResponse);

        return new ResponseEntity(serverResponse, HttpStatus.ACCEPTED);
    }
}
