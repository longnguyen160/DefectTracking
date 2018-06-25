package com.capstone.defecttracking.repositories.Issue;

import com.capstone.defecttracking.enums.Roles;
import com.capstone.defecttracking.models.Issue.*;
import com.capstone.defecttracking.models.Project.Project;
import com.capstone.defecttracking.models.User.User;
import com.capstone.defecttracking.models.User.UserResponse;
import com.mongodb.client.result.UpdateResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Repository
public class IssueRepositoryCustomImpl implements IssueRepositoryCustom {

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public IssueDetailsResponse loadIssueDetails(String issueId) {
        Query query = new Query(Criteria.where("_id").is(issueId));
        Issue issue = mongoTemplate.findOne(query, Issue.class);

        return new IssueDetailsResponse(
            issue.getId(),
            issue.getIssueKey(),
            issue.getIssueName(),
            issue.getProjectId(),
            issue.getDescription(),
            getUserResponse(issue.getReporter()),
            getUserResponse(issue.getAssignee()),
            issue.getStatus(),
            issue.getPriority(),
            issue.getDueDate(),
            issue.getCreatedAt(),
            issue.getUpdatedAt(),
            new ArrayList<UserResponse>(issue.getWatchers().stream().map(this::getUserResponse).collect(Collectors.toList())),
            issue.getCategory(),
            issue.getAttachments()
        );
    }

    @Override
    public IssueShortcutResponse loadIssueShortcut(String issueId) {
        Query query = new Query(Criteria.where("_id").is(issueId));
        Issue issue = mongoTemplate.findOne(query, Issue.class);

        return new IssueShortcutResponse(
            issue.getId(),
            issue.getIssueKey(),
            issue.getIssueName(),
            issue.getPriority()
        );
    }

    @Override
    public Boolean didIssueExisted(String issueName) {
        Query query = new Query(Criteria.where("name").is(issueName));
        Issue issue = mongoTemplate.findOne(query, Issue.class);

        return issue != null;
    }

    @Override
    public List<Issue> loadAllIssuesInProject(String projectId) {
        return null;
    }

    @Override
    public String generateIssueKey() {
        Query query = new Query().with(Sort.by("updatedAt").descending());
        Issue latestIssue = mongoTemplate.findOne(query, Issue.class);

        if (latestIssue != null) {
            String key = latestIssue.getIssueKey();
            String[] arr = key.split("-");

            return "ISSUE-" + (Integer.parseInt(arr[arr.length - 1]) + 1) + "";
        } else {
            return "ISSUE-1";
        }
    }

    private UserResponse getUserResponse(String userId) {
        Query query = new Query(Criteria.where("_id").is(userId));
        User user = mongoTemplate.findOne(query, User.class);

        if (user.getProfile() == null) {
            return new UserResponse(user.getId(), user.getUsername());
        }

        return new UserResponse(user.getId(), user.getUsername(), user.getProfile().getAvatarURL());
    }

    @Override
    public List<IssueResponse> loadAllIssues(String userId) {
        Query query = new Query(Criteria.where("_id").is(userId));
        User user = mongoTemplate.findOne(query, User.class);
        List<Issue> issueList;

        if (user.getRoles().contains(Roles.USER.toString())) {
            query = new Query(Criteria.where("members.userId").is(userId));
            List<Project> projects = mongoTemplate.find(query, Project.class);
            List<String> projectIds = projects.stream().map(Project::getId).collect(Collectors.toList());

            query = new Query(Criteria.where("projectId").in(projectIds));
            issueList = mongoTemplate.find(query, Issue.class);
        } else {
            issueList =  mongoTemplate.findAll(Issue.class);
        }

        return issueList
            .stream()
            .map(issue -> new IssueResponse(
                issue.getId(),
                issue.getIssueKey(),
                issue.getIssueName(),
                issue.getProjectId(),
                issue.getDescription(),
                getUserResponse(issue.getReporter()),
                getUserResponse(issue.getAssignee()),
                issue.getStatus(),
                issue.getPriority(),
                issue.getDueDate(),
                issue.getCreatedAt(),
                issue.getUpdatedAt()
            ))
            .collect(Collectors.toList());
    }

    @Override
    public List<IssueResponse> loadAllIssuesBasedOnFilter(String value, String filter) {
        Query query = new Query(Criteria.where(filter).is(value));
        List<Issue> issueList = mongoTemplate.find(query, Issue.class);

        return issueList
            .stream()
            .map(issue -> new IssueResponse(
                issue.getId(),
                issue.getIssueKey(),
                issue.getIssueName(),
                issue.getProjectId(),
                issue.getDescription(),
                getUserResponse(issue.getReporter()),
                getUserResponse(issue.getAssignee()),
                issue.getStatus(),
                issue.getPriority(),
                issue.getDueDate(),
                issue.getCreatedAt(),
                issue.getUpdatedAt()
            ))
            .collect(Collectors.toList());
    }

    @Override
    public List<IssueShortcutResponse> loadAllIssuesShortcut(String userId) {
        Query query = new Query(Criteria.where("assignee").is(userId)).with(Sort.by("updatedAt").descending());
        List<Issue> issueList = mongoTemplate.find(query, Issue.class);

        return issueList
            .stream()
            .map(issue -> new IssueShortcutResponse(
                issue.getId(),
                issue.getIssueKey(),
                issue.getIssueName(),
                issue.getPriority()
            ))
            .collect(Collectors.toList());
    }

    @Override
    public List<IssuePhaseResponse> loadAllIssuesInPhase(ArrayList<String> issueIds) {
        Query query = new Query(Criteria.where("_id").in(issueIds));

        return mongoTemplate.find(query, IssuePhaseResponse.class);
    }

    private Update configUpdate(ArrayList<?> list, String type, String value) {
        if (list.contains(value)) {
            return new Update().pull(type, value);
        } else {
            return new Update().push(type, value);
        }
    }
    @Override
    public Boolean updateIssue(String issueId, String type, String value) {
        Query query = new Query(Criteria.where("_id").is(issueId));
        Issue issue = mongoTemplate.findOne(query, Issue.class);
        Update update = new Update();

        switch (type) {
            case "watchers":
                update = configUpdate(issue.getWatchers(), type, value);
                break;

            case "attachments":
                update = configUpdate(issue.getAttachments(), type, value);
                break;
            default:
                update.set(type, value);
                break;
        }

        UpdateResult result = mongoTemplate.updateFirst(query, update, Issue.class);

        return result != null;
    }

    @Override
    public void addIssueToBacklog(String issueId, String projectId) {
        Query query = new Query(Criteria.where("_id").is(projectId));
        Update update = new Update();

        update.push("backlog", issueId);
        mongoTemplate.updateFirst(query, update, Project.class);
    }
}
