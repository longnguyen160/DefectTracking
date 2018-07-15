package com.capstone.defecttracking.repositories.Project;

import com.capstone.defecttracking.enums.Roles;
import com.capstone.defecttracking.models.Category.Category;
import com.capstone.defecttracking.models.Category.CategoryProjectResponse;
import com.capstone.defecttracking.models.Issue.Issue;
import com.capstone.defecttracking.models.Project.*;
import com.capstone.defecttracking.models.Server.ServerResponse;
import com.capstone.defecttracking.models.User.User;
import com.capstone.defecttracking.models.User.UserResponse;
import com.capstone.defecttracking.models.User.UserRole;
import com.mongodb.client.result.UpdateResult;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class ProjectRepositoryCustomImpl implements ProjectRepositoryCustom {

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public ProjectDetailsResponse loadProjectDetails(String projectId) {
        Query query = new Query(Criteria.where("_id").is(projectId));
        Project project = mongoTemplate.findOne(query, Project.class);
        query = new Query(Criteria.where("projects").is(projectId));

        ArrayList<CategoryProjectResponse> categories = mongoTemplate
                .find(query, Category.class)
                .stream()
                .map(category -> new CategoryProjectResponse(
                category.getId(),
                category.getName(),
                category.getColor(),
                category.getBackground()
        ))
                .collect(Collectors.toCollection(ArrayList::new));

        return new ProjectDetailsResponse(
                projectId,
                project.getName(),
                project.getDescription(),
                project.getStatus(),
                project.getMembers(),
                project.getBacklog(),
                categories
        );
    }

    @Override
    public Boolean doesProjectExisted(Project project) {
        Query query = new Query(Criteria.where("name").is(project.getName()));
        Project existedProject = mongoTemplate.findOne(query, Project.class);

        if (existedProject != null && existedProject.getId().equals(project.getId())) {
            return false;
        }
        return existedProject != null;
    }

    @Override
    public List<ProjectResponse> loadAllProjectsForCurrentUser(String userId) {
        Query query = new Query(Criteria.where("_id").is(userId));
        User user = mongoTemplate.findOne(query, User.class);

        if (user.getRoles().contains(Roles.USER.toString())) {
            query = new Query(Criteria.where("members.userId").is(userId));

            return mongoTemplate
                    .find(query, Project.class)
                    .stream()
                    .map(project -> new ProjectResponse(
                    project.getId(),
                    project.getName(),
                    project.getDescription(),
                    project.getStatus()
            ))
                    .collect(Collectors.toList());
        } else {
            return mongoTemplate
                    .findAll(Project.class)
                    .stream()
                    .map(project -> new ProjectResponse(
                    project.getId(),
                    project.getName(),
                    project.getDescription(),
                    project.getStatus()
            ))
                    .collect(Collectors.toList());
        }
    }

    @Override
    public List<ProjectManagementResponse> loadAllProjectsForManagement() {
        return mongoTemplate
                .findAll(Project.class)
                .stream()
                .map(project -> {
                    Query query = new Query(Criteria.where("projects").is(project.getId()));
                    ArrayList<CategoryProjectResponse> categories = mongoTemplate
                            .find(query, Category.class)
                            .stream()
                            .map(category -> new CategoryProjectResponse(
                            category.getId(),
                            category.getName(),
                            category.getColor(),
                            category.getBackground()
                    ))
                            .collect(Collectors.toCollection(ArrayList::new));
                    ArrayList<UserResponse> managers = project
                            .getMembers()
                            .stream()
                            .filter(member -> member.getRole().equals("manager"))
                            .map(member -> getUserResponse(member.getUserId()))
                            .collect(Collectors.toCollection(ArrayList::new));

                    return new ProjectManagementResponse(
                            project.getId(),
                            project.getName(),
                            project.getDescription(),
                            project.getStatus(),
                            managers,
                            categories
                    );
                })
                .collect(Collectors.toList());
    }

    @Override
    public ResponseEntity<?> addUserToProject(UserProjectRequest userProjectRequest) {
        ServerResponse serverResponse;
        Query query = new Query(Criteria.where("_id").is(userProjectRequest.getProjectId()));
        Update update = new Update();

        update.push("members", new UserRole(userProjectRequest.getRole(), userProjectRequest.getUserId()));
        UpdateResult result = mongoTemplate.updateFirst(query, update, Project.class);

        query = new Query(Criteria.where("_id").is(userProjectRequest.getUserId()));
        User user = mongoTemplate.findOne(query, User.class);

        if (result.getModifiedCount() != 0) {
            serverResponse = new ServerResponse(true, "Add " + user.getUsername() + " to project successfully");

            return new ResponseEntity(serverResponse, HttpStatus.ACCEPTED);
        }

        serverResponse = new ServerResponse(false, "Add " + user.getUsername() + " to project failed");

        return new ResponseEntity(serverResponse, HttpStatus.BAD_REQUEST);

    }

    @Override
    public ResponseEntity<?> removeUserFromProject(String projectID, String userID) {
        ServerResponse serverResponse;
        Query query = new Query(Criteria.where("_id").is(projectID));
        Update update = new Update();

        update.pull("members", Query.query(Criteria.where("userId").is(userID)));
        UpdateResult result = mongoTemplate.updateFirst(query, update, Project.class);

        if (result.getModifiedCount() != 0) {
            serverResponse = new ServerResponse(true, "Remove user from project successfully");

            return new ResponseEntity(serverResponse, HttpStatus.ACCEPTED);

        }
        serverResponse = new ServerResponse(true, "Remove user from project failed");

        return new ResponseEntity(serverResponse, HttpStatus.BAD_REQUEST);
    }

    @Override
    public Project getProject(String issueId) {
        Query query = new Query(Criteria.where("_id").is(issueId));
        String projectId = mongoTemplate.findOne(query, Issue.class).getProjectId();

        query = new Query(Criteria.where("_id").is(projectId));

        return mongoTemplate.findOne(query, Project.class);
    }

    @Override
    public void updateProject(ProjectCategoryRequest projectRequest) {
        Project project = projectRequest.getProject();
        Query query = new Query(Criteria.where("_id").is(project.getId()));
        Update update = new Update();

        update.set("name", project.getName());
        update.set("description", project.getDescription());
        update.set("members", project.getMembers());
        update.set("status", project.getStatus());
        mongoTemplate.updateFirst(query, update, Project.class);

        update = new Update();
        query = new Query(Criteria.where("projects").is(project.getId()));
        update.pull("projects", project.getId());
        mongoTemplate.updateMulti(query, update, Category.class);

        update = new Update();
        query = new Query(Criteria.where("_id").in(projectRequest.getCategories()));
        update.push("projects", project.getId());
        mongoTemplate.updateMulti(query, update, Category.class);
    }

    private UserResponse getUserResponse(String userId) {
        Query query = new Query(Criteria.where("_id").is(userId));
        User user = mongoTemplate.findOne(query, User.class);

        if (user.getProfile() == null) {
            return new UserResponse(user.getId(), user.getUsername());
        }

        return new UserResponse(user.getId(), user.getUsername(), user.getProfile().getAvatarURL());
    }

    public void updateBacklog(String projectId, ArrayList<String> backlog) {
        Query query = new Query(Criteria.where("_id").is(projectId));
        Update update = new Update();

        update.set("backlog", backlog);
        mongoTemplate.updateFirst(query, update, Project.class);
    }
}
