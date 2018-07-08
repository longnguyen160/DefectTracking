/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.repositories.Filter;

import com.capstone.defecttracking.models.Filter.Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

/**
 *
 * @author doanb
 */
@Repository
public class FilterRepositoryCustomImpl implements FilterRepositoryCustom {

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public Boolean updateFilter(Filter filter) {
        Query query = new Query(Criteria.where("userId").is(filter.getUserId()));
        Filter userFilter = mongoTemplate.findOne(query, Filter.class);

        if (userFilter == null) {
            mongoTemplate.save(filter);
            return true;
        } else {
            Update update = new Update();

            update.set("status", filter.getStatus() == null ? "" : filter.getStatus());
            update.set("priority", filter.getPriority() == null ? "" : filter.getPriority());
            update.set("assignee", filter.getAssignee() == null ? "" : filter.getAssignee());
            update.set("reporter", filter.getReporter() == null ? "" : filter.getReporter());
            update.set("projectId", filter.getProjectId() == null ? "" : filter.getProjectId());
            update.set("categories", filter.getCategories() == null ? new ArrayList<>() : filter.getCategories());

            return mongoTemplate.updateFirst(query, update, Filter.class).getModifiedCount() != 0;
        }
    }

    @Override
    public Filter getFilter(String userId) {
        Query query = new Query(Criteria.where("userId").is(userId));
        Filter filter = mongoTemplate.findOne(query, Filter.class);

        if (filter == null) {
            filter = new Filter(userId);
            mongoTemplate.save(filter);

            return filter;
        }
        return filter;
    }

}
