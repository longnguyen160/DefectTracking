package com.capstone.defecttracking.repositories.User;

import com.capstone.defecttracking.models.User;
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
    public User findByUsername(String username) {
        Query query = new Query(Criteria.where("username").is(username));

        return mongoTemplate.findOne(query, User.class);
    }

    @Override
    public boolean login(User user) {
        Query query = new Query(Criteria.where("username").is(user.getUsername()));
        User userData = mongoTemplate.findOne(query, User.class);

        return userData.getPassword().equals(user.getPassword());
    }
}
