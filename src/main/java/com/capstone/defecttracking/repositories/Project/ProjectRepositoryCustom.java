package com.capstone.defecttracking.repositories.Project;

import com.capstone.defecttracking.models.Project.*;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

public interface ProjectRepositoryCustom {
    ProjectDetailsResponse loadProjectDetails(String projectId);
    Boolean doesProjectExisted(Project project);
    List<ProjectResponse> loadAllProjectsForCurrentUser(String userId);
    List<ProjectManagementResponse> loadAllProjectsForManagement();
    ResponseEntity<?> addUserToProject(UserProjectRequest userProjectRequest);
    ResponseEntity<?> removeUserFromProject(String projectID, String userID);
    Project getProject(String issueId);
    List<ProjectResponse> searchProject(String value);
    void updateProject(ProjectCategoryRequest project);
    void updateBacklog(String projectId, ArrayList<String> backlog);
}
