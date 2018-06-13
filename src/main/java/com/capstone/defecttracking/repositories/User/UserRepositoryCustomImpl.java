package com.capstone.defecttracking.repositories.User;

import com.capstone.defecttracking.models.User.User;
import com.capstone.defecttracking.models.User.UserDetailsSecurity;
import com.capstone.defecttracking.models.User.UserProfile;
import com.mongodb.client.result.UpdateResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;

import java.util.List;

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
    public List<User> getAllUsers(String input) {
        if (input.length() == 0) {
            return mongoTemplate.findAll(User.class);
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsSecurity userDetailsSecurity = (UserDetailsSecurity) authentication.getPrincipal();
        Criteria criteria = new Criteria();

        criteria.andOperator(
            Criteria.where("_id").ne(userDetailsSecurity.getId()),
            criteria.orOperator(Criteria.where("username").regex(input), Criteria.where("email").regex(input))
        );

        Query query = new Query(criteria);

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

}
