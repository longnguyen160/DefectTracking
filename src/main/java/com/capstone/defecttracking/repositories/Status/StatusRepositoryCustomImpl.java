/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.repositories.Status;

import com.capstone.defecttracking.enums.Roles;
import com.capstone.defecttracking.models.Status.Status;
import com.mongodb.client.result.UpdateResult;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

/**
 *
 * @author doanb
 */
@Repository
public class StatusRepositoryCustomImpl implements StatusRepositoryCustom {

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public List<Status> loadAllStatus(String role) {
        switch (role) {
            case "ADMIN":
                return mongoTemplate.findAll(Status.class);

            default:
                Query query = new Query(Criteria.where("handlers").is(role));

                return mongoTemplate.find(query, Status.class);
        }
    }

    @Override
    public String getDefaultStatus() {
        Query query = new Query(Criteria.where("isDefault").is(true));

        return mongoTemplate.findOne(query, Status.class).getId();
    }

    @Override
    public Boolean updateStatus(Status status) {
        Query query = new Query(Criteria.where("_id").is(status.getId()));
        Update update = new Update();
        update.set("name", status.getName());
        update.set("background", status.getBackground());
        update.set("color", status.getColor());
        update.set("handlers", status.getHandlers());
        UpdateResult result = mongoTemplate.updateFirst(query, update, Status.class);

        return result.getModifiedCount() != 0;
    }

    @Override
    public Boolean didStatusExisted(String name) {
        Query query = new Query(Criteria.where("name").is(name));
        Status status = mongoTemplate.findOne(query, Status.class);
        return status != null;
    }

    @Override
    public Boolean updateStatusDefault(String statusId) {
        Query query = new Query(Criteria.where("isDefault").is(true));
        Status status = mongoTemplate.findOne(query, Status.class);
        Update update = new Update();

        update.set("isDefault", false);
        if (mongoTemplate.updateFirst(query, update, Status.class).getModifiedCount() != 0 || status == null) {
            // update trang thai default qua cho status moi
            query = new Query(Criteria.where("_id").is(statusId));
            update.set("isDefault", true);

            return mongoTemplate.updateFirst(query, update, Status.class).getModifiedCount() != 0;
        }
        return false;
    }

}
