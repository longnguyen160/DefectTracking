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
        Query query = new Query(Criteria.where("_id").is(filter.getId()));
        Update update = new Update();
        update.set("status", filter.getStatus());
        update.set("priority", filter.getPriority());
        update.set("assignee", filter.getAssignee());
        update.set("reporter", filter.getReporter());
        update.set("project", filter.getProjectId());
        update.set("categories", filter.getCategories());
        if (mongoTemplate.updateFirst(query, update, Filter.class) != null) {            
            return true;
        }
        return false;
    }

}
