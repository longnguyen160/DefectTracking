/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.repositories.Performance;

import com.capstone.defecttracking.models.Issue.Issue;
import com.capstone.defecttracking.models.PA.PerformanceAssessment;
import com.capstone.defecttracking.models.User.User;
import com.capstone.defecttracking.repositories.User.UserRepositoryCustom;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author doanb
 */
@Repository
public class PerformanceRepositoryCustomImpl implements PerformanceRepositoryCustom {

    @Autowired
    MongoTemplate mongoTemplate;
    @Autowired
    UserRepositoryCustom userRepositoryCustom;

    @Override
    public List<PerformanceAssessment> loadPAwithrole(String role) {
        Query query = new Query(Criteria.where("role").is(role));
        List<PerformanceAssessment> performances = mongoTemplate.find(query, PerformanceAssessment.class);
        if (performances != null) {
            return performances;
        }
        return null;
    }

    @Override
    public Integer getPAofUser(String userId, Date StartDate, Date EndDate) {
        User user = userRepositoryCustom.findById(userId);
        int PAresult = 0;
        //roles dev
        if (user.getRoles().equals("developer")) {
            List<PerformanceAssessment> ListPA = loadPAwithrole("developer");
            // tinh tong cac trong so cua cac dev
            int SumPAAmong = 0;
            for (int i = 0; i < ListPA.size(); i++) {
                SumPAAmong = SumPAAmong + Integer.parseInt(ListPA.get(i).getAmong());
            }
            int ontimebug = 0;
            int latetimebug = 0;
            int sumofthebug = 0;
            int donebug = 0;
            Query query = new Query(Criteria.where("assignee").is(userId));
            List<Issue> issues = mongoTemplate.find(query, Issue.class);
            for (int i = 0; i < issues.size(); i++) {
                // tim bug trong khoang tg user chon
                if (issues.get(i).getFinishedAt().getTime() <= EndDate.getTime() && issues.get(i).getFinishedAt().getTime() >= StartDate.getTime()) {
                    if (issues.get(i).getFinishedAt().getTime() <= issues.get(i).getDueDate().getTime()) {
                        ontimebug++;
                    } else {
                        latetimebug++;
                    }
                    if (issues.get(i).getFinishedAt().getTime() <= EndDate.getTime() && issues.get(i).getCreatedAt().getTime() >= StartDate.getTime()) {
                        donebug++;
                    }
                    sumofthebug++;
                }
            }
            // 
            PAresult = ((Integer.parseInt(ListPA.get(1).getAmong()) * ontimebug / sumofthebug)
                    - (Integer.parseInt(ListPA.get(2).getAmong()) * latetimebug / sumofthebug)
                    + (Integer.parseInt(ListPA.get(3).getAmong()) * donebug / sumofthebug) // thieu tieu chi reopen
                    )
                    / SumPAAmong * 100;
        }
        // role tester
        if (user.getRoles().equals("reporter")) {
            List<PerformanceAssessment> ListPA = loadPAwithrole("reporter");
            // tinh tong cac trong so cua cac tester
            int SumPAAmong = 0;
            for (int i = 0; i < ListPA.size(); i++) {
                SumPAAmong = SumPAAmong + Integer.parseInt(ListPA.get(i).getAmong());
            }
            int reopenbug = 0;
            int foundbug = 0;
            int donebug = 0;
            int sumofthebug = 0;
            Query query = new Query(Criteria.where("reporter").is(userId));
            List<Issue> issues = mongoTemplate.find(query, Issue.class);
            for (int i = 0; i < issues.size(); i++) {
                // tim bug trong khoang tg user chon
                if (issues.get(i).getCreatedAt().getTime() <= StartDate.getTime() && issues.get(i).getCreatedAt().getTime() <= EndDate.getTime()) {
                    sumofthebug++;
                }

            }
            // 
            PAresult = ( - (Integer.parseInt(ListPA.get(5).getAmong()) * reopenbug / sumofthebug)
                    + (Integer.parseInt(ListPA.get(6).getAmong()) * foundbug)
                    + (Integer.parseInt(ListPA.get(7).getAmong()) * donebug / sumofthebug) // thieu tieu chi reopen
                    )
                    / SumPAAmong * 100;

        } else {

        }

        return PAresult;

    }

}
