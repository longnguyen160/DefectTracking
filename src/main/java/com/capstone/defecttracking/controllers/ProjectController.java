package com.capstone.defecttracking.controllers;

import com.capstone.defecttracking.models.Project.Project;
import com.capstone.defecttracking.models.Server.ServerResponse;
import com.capstone.defecttracking.repositories.Project.ProjectRepository;
import com.capstone.defecttracking.repositories.Project.ProjectRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProjectController {

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    ProjectRepositoryCustom projectRepositoryCustom;

    @PostMapping("/admin/createProject")
    public ResponseEntity<?> createProject(@RequestBody Project project) {
        ServerResponse serverResponse;

        if (projectRepositoryCustom.isProjectExisted(project.getName())) {
            serverResponse = new ServerResponse(false, "A project with that name already exists");

            return new ResponseEntity(serverResponse, HttpStatus.BAD_REQUEST);
        }

        projectRepository.save(project);
        serverResponse = new ServerResponse(true, "Create project successfully");

        return new ResponseEntity(serverResponse, HttpStatus.ACCEPTED);
    }

    @PostMapping("/loadAllProjects")
    public List<Project> loadAllProject(String userId) {
        return projectRepositoryCustom.loadAllProjectsForCurrentUser(userId);
    }
}
