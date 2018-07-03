/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.repositories.Status;

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
    public List<Status> loadAllStatus() {
        return mongoTemplate.findAll(Status.class);

    }

    @Override
    public Boolean removeStatus(String id) {
        Query query = new Query(Criteria.where("_id").is(id));
        Status status = mongoTemplate.findOne(query, Status.class);
        if (status != null) {
            mongoTemplate.remove(status);
            return true;
        }
        return false;
    }

    @Override
    public Boolean UpdateStatus(Status status) {
        Query query = new Query(Criteria.where("_id").is(status.getId()));
        Update update = new Update();
        update.set("name", status.getName());
        update.set("color", status.getColor());
        update.set("handlers", status.getHandlers());
        UpdateResult result = mongoTemplate.updateFirst(query, update, Status.class);
        return result != null;
    }

    @Override
    public Boolean didStatusExisted(String name) {
        Query query = new Query(Criteria.where("name").is(name));
        Status status = mongoTemplate.findOne(query, Status.class);
        return status != null;
    }

    @Override
    public Boolean UpdateStatusDefault(String statusId) {
        // xoa trang thai default status hien tai
        Query query = new Query(Criteria.where("isDefault").is(true));
        Update update = new Update();
        update.set("isDefault", false);
        if (mongoTemplate.updateFirst(query, update, Status.class) != null) {
            // update trang thai default qua cho status moi
            Query query2 = new Query(Criteria.where("_id").is(statusId));
            Update update2 = new Update();
            update2.set("isDefault", true);
            return mongoTemplate.updateFirst(query2, update2, Status.class) != null;
        }
        return false;
    }

}
