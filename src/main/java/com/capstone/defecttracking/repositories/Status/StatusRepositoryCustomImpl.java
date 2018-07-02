/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.repositories.Status;

import com.capstone.defecttracking.models.Issue.Issue;
import com.capstone.defecttracking.models.Status.Status;
import com.capstone.defecttracking.models.Status.StatusResponse;
import com.mongodb.client.result.UpdateResult;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

/**
 *
 * @author doanb
 */
public class StatusRepositoryCustomImpl implements StatusRepositoryCustom {

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public List<StatusResponse> loadAllStatus() {
        List<StatusResponse> result = new ArrayList<>();
        List<Status> Statuss = mongoTemplate.findAll(Status.class);
        for (int i = 0; i < Statuss.size(); i++) {
            Status s = Statuss.get(i);
            result.add(new StatusResponse(s.getId(), s.getName(), s.getColor(), s.getHandlers()));
        }
        return result;
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

}
