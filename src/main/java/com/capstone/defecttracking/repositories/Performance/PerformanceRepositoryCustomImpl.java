/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.repositories.Performance;

import com.capstone.defecttracking.models.Issue.Issue;
import com.capstone.defecttracking.models.Message.Message;
import com.capstone.defecttracking.models.PA.PerformanceAssessment;
import com.capstone.defecttracking.models.PA.PerformanceAssessmentRequest;
import com.capstone.defecttracking.models.PA.PerformanceAssessmentResponse;
import com.capstone.defecttracking.models.Project.Project;
import com.capstone.defecttracking.models.User.User;
import com.capstone.defecttracking.models.User.UserResponse;
import com.capstone.defecttracking.repositories.User.UserRepositoryCustom;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.function.Predicate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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
public class PerformanceRepositoryCustomImpl implements PerformanceRepositoryCustom {

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    UserRepositoryCustom userRepositoryCustom;


    private List<PerformanceAssessment> loadPAWithRole(String role) {
        Query query = new Query(Criteria.where("role").is(role));

        return mongoTemplate.find(query, PerformanceAssessment.class);
    }

    @Override
    public List<PerformanceAssessmentResponse> getUserKPI(PerformanceAssessmentRequest performanceAssessmentRequest) {
        Query query = new Query(Criteria.where("_id").is(performanceAssessmentRequest.getProjectId()));
        Project project = mongoTemplate.findOne(query, Project.class);
        Date from = performanceAssessmentRequest.getFrom();
        Date to = performanceAssessmentRequest.getTo();

        return project
            .getMembers()
            .stream()
            .map(member -> {
                double point = 0;

                if (member.getRole().equals("developer")) {
                    point = calculateDeveloperPoint(member.getUserId(), from, to);

                    if (point < 0) {
                        point = 0;
                    }
                } else if (member.getRole().equals("reporter")) {
                    point = calculateReporterPoint(member.getUserId(), from, to);

                    if (point < 0) {
                        point = 0;
                    }
                }

                return new PerformanceAssessmentResponse(
                    member.getRole(),
                    point,
                    getUserResponse(member.getUserId())
                );
            })
            .collect(Collectors.toList());
    }

    @Override
    public boolean updateKPI(PerformanceAssessment performanceAssessment) {
        Query query = new Query(Criteria.where("_id").is(performanceAssessment.getId()));
        Update update = new Update();

        update.set("weight", performanceAssessment.getWeight());

        return mongoTemplate.updateFirst(query, update, PerformanceAssessment.class).getModifiedCount() != 0;
    }

    private double calculateDeveloperPoint(String userId, Date from, Date to) {
        Criteria criteria = new Criteria();
        List<PerformanceAssessment> performanceAssessmentList = loadPAWithRole("developer");
        double sumPA = 0;

        for (PerformanceAssessment aPerformanceAssessmentList : performanceAssessmentList) {
            sumPA = sumPA + Double.parseDouble(aPerformanceAssessmentList.getWeight());
        }

        criteria.andOperator(
            Criteria.where("assignee").is(userId),
            Criteria.where("createdAt").gte(from).lte(to)
        );
        Query query = new Query(criteria);
        List<Issue> issueList = mongoTemplate.find(query, Issue.class);

        if (issueList.size() > 0) {
            long sum = issueList.size();
            long finishedIssues = issueList
                .stream()
                .filter(issue -> issue.getFinishedAt() != null)
                .count();
            long onTimeIssues = issueList
                .stream()
                .filter(issue -> issue.getFinishedAt() != null && issue.getDueDate().after(issue.getFinishedAt()))
                .count();
            long lateTimeIssues = issueList
                .stream()
                .filter(issue -> issue.getFinishedAt() == null || issue.getDueDate().before(issue.getFinishedAt()))
                .count();
            long reOpenedIssues = issueList
                .stream()
                .filter(issue -> {
                    Criteria subCriteria = new Criteria();

                    subCriteria.andOperator(
                        Criteria.where("issueId").is(issue.getId()),
                        Criteria.where("type.rejectBy").is("reporter")
                    );
                    Query subQuery = new Query(subCriteria).with(Sort.by("createdAt").descending());

                    return mongoTemplate.findOne(subQuery, Message.class) != null;
                })
                .count();

            return (
                Double.parseDouble(performanceAssessmentList.get(0).getWeight()) * onTimeIssues
                    - Double.parseDouble(performanceAssessmentList.get(1).getWeight()) * lateTimeIssues
                    - Double.parseDouble(performanceAssessmentList.get(2).getWeight()) * reOpenedIssues
                    + (finishedIssues / sum) * 100
            ) / sum * 100;
        }

        return 0;
    }

    private double calculateReporterPoint(String userId, Date from, Date to) {
        Criteria criteria = new Criteria();
        List<PerformanceAssessment> performanceAssessmentList = loadPAWithRole("reporter");
        double sumPA = 0;

        for (PerformanceAssessment aPerformanceAssessmentList : performanceAssessmentList) {
            sumPA = sumPA + Double.parseDouble(aPerformanceAssessmentList.getWeight());
        }

        criteria.andOperator(
            Criteria.where("reporter").is(userId),
            Criteria.where("createdAt").gte(from).lte(to)
        );
        Query query = new Query(criteria);
        List<Issue> issueList = mongoTemplate.find(query, Issue.class);

        if (issueList.size() > 0) {
            long sum = issueList.size();
            long finishedIssues = issueList
                .stream()
                .filter(issue -> issue.getFinishedAt() != null)
                .count();
            long reOpenedIssues = issueList
                .stream()
                .filter(issue -> {
                    Criteria subCriteria = new Criteria();

                    subCriteria.andOperator(
                        Criteria.where("issueId").is(issue.getId()),
                        Criteria.where("type.rejectBy").is("manager")
                    );
                    Query subQuery = new Query(subCriteria).with(Sort.by("createdAt").descending());

                    return mongoTemplate.findOne(subQuery, Message.class) != null;
                })
                .count();

            return (
                Double.parseDouble(performanceAssessmentList.get(0).getWeight()) * finishedIssues
                    + Double.parseDouble(performanceAssessmentList.get(1).getWeight()) * sum
                    - Double.parseDouble(performanceAssessmentList.get(2).getWeight()) * reOpenedIssues
            ) / (sum * sumPA) * 100;
        }

        return 0;
    }

    private UserResponse getUserResponse(String userId) {
        Query query = new Query(Criteria.where("_id").is(userId));
        User user = mongoTemplate.findOne(query, User.class);

        if (user.getProfile() == null) {
            return new UserResponse(user.getId(), user.getUsername());
        }

        return new UserResponse(user.getId(), user.getUsername(), user.getProfile().getAvatarURL());
    }
}
