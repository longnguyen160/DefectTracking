package com.capstone.defecttracking.repositories.Project;

import com.capstone.defecttracking.models.Project.Project;
import com.capstone.defecttracking.models.Project.ProjectManagementResponse;
import com.capstone.defecttracking.models.Project.ProjectResponse;
import com.capstone.defecttracking.models.Project.UserProjectRequest;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

public interface ProjectRepositoryCustom {
    Project loadProjectDetails(String projectId);
    Boolean doesProjectExisted(String projectName);
    List<ProjectResponse> loadAllProjectsForCurrentUser(String userId);
    List<ProjectManagementResponse> loadAllProjectsForManagement();
    ResponseEntity<?> addUserToProject(UserProjectRequest userProjectRequest);
    ResponseEntity<?> removeUserFromProject(String projectID, String userID);
    void updateBacklog(String projectId, ArrayList<String> backlog);
}
