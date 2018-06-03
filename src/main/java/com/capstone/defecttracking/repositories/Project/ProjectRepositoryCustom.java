package com.capstone.defecttracking.repositories.Project;

import com.capstone.defecttracking.models.Project.Project;

import java.util.List;

public interface ProjectRepositoryCustom {
    Project findById(String projectId);
    Boolean doesProjectExisted(String projectName);
    List<Project> loadAllProjectsForCurrentUser(String userId);
}
