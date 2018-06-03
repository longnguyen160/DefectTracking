package com.capstone.defecttracking.repositories.User;

import com.capstone.defecttracking.models.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

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

}
