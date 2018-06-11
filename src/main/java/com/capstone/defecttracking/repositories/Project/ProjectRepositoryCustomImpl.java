package com.capstone.defecttracking.repositories.Project;

import com.capstone.defecttracking.enums.Roles;
import com.capstone.defecttracking.models.Project.Project;
import com.capstone.defecttracking.models.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ProjectRepositoryCustomImpl implements ProjectRepositoryCustom {

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public Project findById(String projectId) {
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
    public List<Project> loadAllProjectsForCurrentUser(String userId) {
        Query query = new Query(Criteria.where("_id").is(userId));
        User user = mongoTemplate.findOne(query, User.class);

        if (user.getRoles().contains(Roles.USER.toString())) {
            query = new Query(Criteria.where("members").is(userId));

            return mongoTemplate.find(query, Project.class);
        } else {
            return mongoTemplate.findAll(Project.class);
        }
    }
}
