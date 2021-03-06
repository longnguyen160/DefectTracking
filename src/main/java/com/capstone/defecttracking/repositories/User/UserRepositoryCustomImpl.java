package com.capstone.defecttracking.repositories.User;

import com.capstone.defecttracking.models.Project.Project;
import com.capstone.defecttracking.models.User.*;
import com.mongodb.client.result.UpdateResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class UserRepositoryCustomImpl implements UserRepositoryCustom {

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public User findByEmail(String email) {
        Query query = new Query(Criteria.where("email").is(email));

        return mongoTemplate.findOne(query, User.class);
    }

    @Override
    public User findById(String userId) {
        Query query = new Query(Criteria.where("_id").is(userId));

        return mongoTemplate.findOne(query, User.class);
    }

    @Override
    public Boolean doesUsernameExisted(String username) {
        Query query = new Query(Criteria.where("username").is(username));
        User user = mongoTemplate.findOne(query, User.class);

        return user != null;
    }

    @Override
    public List<User> getAllUsers(String input, String projectId) {
        if (input.length() == 0 && projectId.length() == 0) {
            Query query = new Query(Criteria.where("roles").ne("ADMIN"));

            return mongoTemplate.find(query, User.class);
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsSecurity userDetailsSecurity = (UserDetailsSecurity) authentication.getPrincipal();
        Criteria criteria = new Criteria();
        Query query;

        if (projectId.length() > 0) {
            query = new Query(Criteria.where("_id").is(projectId));
            Project project = mongoTemplate.findOne(query, Project.class);
            List<String> memberIds = project.getMembers().stream().map(UserRole::getUserId).collect(Collectors.toList());

            criteria.andOperator(
                Criteria.where("_id").ne(userDetailsSecurity.getId()),
                Criteria.where("_id").nin(memberIds),
                criteria.orOperator(Criteria.where("username").regex(input, "i"), Criteria.where("email").regex(input, "i"))
            );
        } else {
            criteria.andOperator(
                Criteria.where("_id").ne(userDetailsSecurity.getId()),
                criteria.orOperator(Criteria.where("username").regex(input, "i"), Criteria.where("email").regex(input, "i"))
            );
        }


        query = new Query(criteria);

        return mongoTemplate.find(query, User.class);
    }

    @Override
    public Boolean updateUserProfile(String userId, UserProfile profile, String email) {
        Query query = new Query(Criteria.where("_id").is(userId));
        Update update = new Update();
        UpdateResult result;

        update.set("profile", profile);
        result = mongoTemplate.updateFirst(query, update, User.class);
        update.set("email", email);
        result = mongoTemplate.updateFirst(query, update, User.class);

        return result != null;
    }

    @Override
    public List<UserProjectResponse> getAllUsersInProject(String projectId) {
        Query query = new Query(Criteria.where("_id").is(projectId));
        Project project = mongoTemplate.findOne(query, Project.class);

        return project
            .getMembers()
            .stream()
            .map(member -> {
                Query subQuery = new Query(Criteria.where("_id").is(member.getUserId()));
                User user = mongoTemplate.findOne(subQuery, User.class);

                if (user.getProfile() != null && user.getProfile().getAvatarURL() != null) {
                    return new UserProjectResponse(user.getId(), user.getUsername(), user.getEmail(), member.getRole(), user.getProfile().getAvatarURL());
                } else {
                    return new UserProjectResponse(user.getId(), user.getUsername(), user.getEmail(), member.getRole());
                }
            })
            .collect(Collectors.toList());
    }

    @Override
    public Boolean manageUser(UserActiveRequest userActiveRequest) {
        Query query = new Query(Criteria.where("_id").is(userActiveRequest.getId()));
        Update update = new Update();

        update.set("active", userActiveRequest.isActive());
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, User.class);

        return updateResult.getModifiedCount() != 0;
    }

    @Override
    public List<UserResponse> searchUser(String value) {
        Criteria criteria = new Criteria();

        criteria.orOperator(
            Criteria.where("username").regex(value, "i"),
            Criteria.where("email").regex(value, "i")
        );
        Query query = new Query(criteria);

        return mongoTemplate
            .find(query, User.class)
            .stream()
            .map(user -> {
                if (user.getProfile() != null) {
                    return new UserResponse(
                        user.getId(),
                        user.getUsername(),
                        user.getProfile().getAvatarURL(),
                        user.getEmail()
                    );
                } else {
                    return new UserResponse(
                        user.getId(),
                        user.getUsername(),
                        null,
                        user.getEmail()
                    );
                }
            })
            .collect(Collectors.toList());
    }

}
