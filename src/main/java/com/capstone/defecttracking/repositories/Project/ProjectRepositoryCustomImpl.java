package com.capstone.defecttracking.repositories.Project;

import com.capstone.defecttracking.enums.Roles;
import com.capstone.defecttracking.models.Project.Project;
import com.capstone.defecttracking.models.Project.ProjectResponse;
import com.capstone.defecttracking.models.Project.UserProjectRequest;
import com.capstone.defecttracking.models.Server.ServerResponse;
import com.capstone.defecttracking.models.User.User;
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
    public Project loadProjectDetails(String projectId) {
        Query query = new Query(Criteria.where("_id").is(projectId));

        return mongoTemplate.findOne(query, Project.class);
    }

    @Override
    public Boolean doesProjectExisted(String projectName) {
        Query query = new Query(Criteria.where("name").is(projectName));
        Project project = mongoTemplate.findOne(query, Project.class);

        return project != null;
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
    public ResponseEntity<?> addUserToProject(UserProjectRequest userProjectRequest) {
        ServerResponse serverResponse;
        Query query = new Query(Criteria.where("_id").is(userProjectRequest.getProjectId()));
        Project project = mongoTemplate.findOne(query, Project.class);
        Update update = new Update();

        project.setMembers(new UserRole(userProjectRequest.getUserId(), userProjectRequest.getRole()));
        update.set("members", project.getMembers());

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

    public void updateBacklog(String projectId, ArrayList<String> backlog) {
        Query query = new Query(Criteria.where("_id").is(projectId));
        Update update = new Update();

        update.set("backlog", backlog);
        mongoTemplate.updateFirst(query, update, Project.class);
    }
}
