/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.repositories.Performance;

import com.capstone.defecttracking.models.Issue.Issue;
import com.capstone.defecttracking.models.Message.Message;
import com.capstone.defecttracking.models.PA.*;
import com.capstone.defecttracking.models.Project.Project;
import com.capstone.defecttracking.models.Status.Status;
import com.capstone.defecttracking.models.User.User;
import com.capstone.defecttracking.models.User.UserResponse;
import com.capstone.defecttracking.repositories.User.UserRepositoryCustom;

import java.util.ArrayList;
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

    List<PerformanceAssessmentSummaryResponse> performanceAssessmentSummaryResponses = new ArrayList<>();

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
    public PerformanceAssessmentSummaryResponse getSummaryDetails(String userId) {
        Query query = new Query(Criteria.where("_id").is(userId));
        String username = mongoTemplate.findOne(query, User.class).getUsername();

        return performanceAssessmentSummaryResponses
            .stream()
            .filter(item -> item.getUsername().equals(username))
            .collect(Collectors.toList())
            .get(0);
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

        criteria.andOperator(
            Criteria.where("assignee").is(userId),
            Criteria.where("createdAt").gte(from).lte(to)
        );
        Query query = new Query(criteria);
        List<Issue> issueList = mongoTemplate.find(query, Issue.class);
        query = new Query(Criteria.where("_id").is(userId));
        String username = mongoTemplate.findOne(query, User.class).getUsername();

        if (issueList.size() > 0) {
            long sum = issueList.size();
            long submittedIssues = getSubmittedIssues(issueList, "developer", "reporter");
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
            List<PerformanceAssementPoint> summary = new ArrayList<>();

            summary.add(new PerformanceAssementPoint(performanceAssessmentList.get(0).getCriteria(), onTimeIssues));
            summary.add(new PerformanceAssementPoint(performanceAssessmentList.get(1).getCriteria(), lateTimeIssues));
            summary.add(new PerformanceAssementPoint(performanceAssessmentList.get(2).getCriteria(), reOpenedIssues));
            summary.add(new PerformanceAssementPoint(performanceAssessmentList.get(3).getCriteria(), submittedIssues));

            if (performanceAssessmentSummaryResponses.stream().anyMatch(item -> item.getUsername().equals(username))) {
                performanceAssessmentSummaryResponses
                    .stream()
                    .filter(item -> item.getUsername().equals(username))
                    .findFirst()
                    .get()
                    .setSummary(summary);
            } else {
                performanceAssessmentSummaryResponses.add(new PerformanceAssessmentSummaryResponse(username, summary));
            }
            return (double) Math.round((
                Double.parseDouble(performanceAssessmentList.get(0).getWeight()) * onTimeIssues / submittedIssues
                    + Double.parseDouble(performanceAssessmentList.get(1).getWeight()) * lateTimeIssues / submittedIssues
                    + Double.parseDouble(performanceAssessmentList.get(2).getWeight()) * reOpenedIssues / submittedIssues
                    + Double.parseDouble(performanceAssessmentList.get(3).getWeight()) * submittedIssues / sum
            ) * 100) / 100;
        }
        List<PerformanceAssementPoint> summary = new ArrayList<>();

        summary.add(new PerformanceAssementPoint(performanceAssessmentList.get(0).getCriteria(), 0));
        summary.add(new PerformanceAssementPoint(performanceAssessmentList.get(1).getCriteria(), 0));
        summary.add(new PerformanceAssementPoint(performanceAssessmentList.get(2).getCriteria(), 0));
        summary.add(new PerformanceAssementPoint(performanceAssessmentList.get(3).getCriteria(), 0));

        if (performanceAssessmentSummaryResponses.stream().anyMatch(item -> item.getUsername().equals(username))) {
            performanceAssessmentSummaryResponses
                .stream()
                .filter(item -> item.getUsername().equals(username))
                .findFirst()
                .get()
                .setSummary(summary);
        } else {
            performanceAssessmentSummaryResponses.add(new PerformanceAssessmentSummaryResponse(username, summary));
        }

        return 0;
    }

    private double calculateReporterPoint(String userId, Date from, Date to) {
        Criteria criteria = new Criteria();
        List<PerformanceAssessment> performanceAssessmentList = loadPAWithRole("reporter");

        criteria.andOperator(
            Criteria.where("reporter").is(userId),
            Criteria.where("createdAt").gte(from).lte(to)
        );
        Query query = new Query(criteria);
        List<Issue> issueList = mongoTemplate.find(query, Issue.class);
        query = new Query(Criteria.where("_id").is(userId));
        String username = mongoTemplate.findOne(query, User.class).getUsername();

        if (issueList.size() > 0) {
            long sum = issueList.size();
            long submittedIssues = getSubmittedIssues(issueList, "reporter", "manager");
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
            List<PerformanceAssementPoint> summary = new ArrayList<>();

            summary.add(new PerformanceAssementPoint(performanceAssessmentList.get(0).getCriteria(), reOpenedIssues));
            summary.add(new PerformanceAssementPoint(performanceAssessmentList.get(1).getCriteria(), sum));
            summary.add(new PerformanceAssementPoint(performanceAssessmentList.get(2).getCriteria(), submittedIssues));

            if (performanceAssessmentSummaryResponses.stream().anyMatch(item -> item.getUsername().equals(username))) {
                performanceAssessmentSummaryResponses
                    .stream()
                    .filter(item -> item.getUsername().equals(username))
                    .findFirst()
                    .get()
                    .setSummary(summary);
            } else {
                performanceAssessmentSummaryResponses.add(new PerformanceAssessmentSummaryResponse(username, summary));
            }

            double point = (double) Math.round((
                Double.parseDouble(performanceAssessmentList.get(0).getWeight()) * reOpenedIssues / submittedIssues
                    + Double.parseDouble(performanceAssessmentList.get(1).getWeight())
                    + Double.parseDouble(performanceAssessmentList.get(2).getWeight()) * submittedIssues / sum
            ) * 100) / 100;

            return point > 100 ? 100 : point;
        }
        List<PerformanceAssementPoint> summary = new ArrayList<>();

        summary.add(new PerformanceAssementPoint(performanceAssessmentList.get(0).getCriteria(), 0));
        summary.add(new PerformanceAssementPoint(performanceAssessmentList.get(1).getCriteria(), 0));
        summary.add(new PerformanceAssementPoint(performanceAssessmentList.get(2).getCriteria(), 0));

        if (performanceAssessmentSummaryResponses.stream().anyMatch(item -> item.getUsername().equals(username))) {
            performanceAssessmentSummaryResponses
                .stream()
                .filter(item -> item.getUsername().equals(username))
                .findFirst()
                .get()
                .setSummary(summary);
        } else {
            performanceAssessmentSummaryResponses.add(new PerformanceAssessmentSummaryResponse(username, summary));
        }

        return 0;
    }

    private long getSubmittedIssues(List<Issue> issueList, String roleA, String roleB) {
        return issueList
            .stream()
            .filter(issue -> {
                List<String> roles = new ArrayList<>();

                roles.add(roleA);
                roles.add(roleB);
                Query subQuery = new Query(Criteria.where("handlers").all(roles));
                List<String> statusIds = mongoTemplate
                    .find(subQuery, Status.class)
                    .stream()
                    .map(Status::getId)
                    .collect(Collectors.toList());
                Criteria subCriteria1 = new Criteria();

                subCriteria1.andOperator(
                    Criteria.where("issueId").is(issue.getId()),
                    Criteria.where("type.newEntityId").in(statusIds)
                );
                subQuery = new Query(subCriteria1);
                Message message = mongoTemplate.findOne(subQuery, Message.class);

                return message != null;
            })
            .count();
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
