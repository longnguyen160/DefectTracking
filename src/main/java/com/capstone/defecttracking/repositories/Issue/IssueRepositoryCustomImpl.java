package com.capstone.defecttracking.repositories.Issue;

import com.capstone.defecttracking.enums.Roles;
import com.capstone.defecttracking.models.Filter.Filter;
import com.capstone.defecttracking.models.Issue.*;
import com.capstone.defecttracking.models.Project.Project;
import com.capstone.defecttracking.models.Status.Status;
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
            getIssueStatusResponse(issue.getStatus()),
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

    private Status getIssueStatusResponse(String statusId) {
        Query query = new Query(Criteria.where("_id").is(statusId));

        return mongoTemplate.findOne(query, Status.class);
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
    public String generateIssueKey(String projectId) {
        Query query = new Query(Criteria.where("projectId").is(projectId)).with(Sort.by("updatedAt").descending());
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
            issueList = mongoTemplate.findAll(Issue.class);
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
    public List<IssueResponse> loadAllIssuesBasedOnFilter(Filter filter) {
        Criteria criteria = new Criteria();

        if (filter.getStatus() != null) {
            criteria.andOperator(
                Criteria.where("status").is(filter.getStatus())
            );
        }
        if (filter.getAssignee() != null) {
            criteria.andOperator(
                Criteria.where("status").is(filter.getAssignee())
            );
        }
        if (filter.getReporter() != null) {
            criteria.andOperator(
                Criteria.where("reporter").is(filter.getReporter())
            );
        }
        if (filter.getCategories() != null) {
            criteria.andOperator(
                Criteria.where("categories").is(filter.getCategories())
            );
        }
        if (filter.getProjectId() != null) {
            criteria.andOperator(
                Criteria.where("projectId").is(filter.getProjectId())
            );
        }
        if (filter.getPriority() != null) {
            criteria.andOperator(
                Criteria.where("priority").is(filter.getPriority())
            );
        }
        Query query = new Query(criteria);
        return mongoTemplate
            .find(query, Issue.class)
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
    public List<IssueBacklogResponse> loadAllIssuesInPhase(ArrayList<String> issueIds) {
        return issueIds
            .stream()
            .map(issueId -> {
                Query query = new Query(Criteria.where("_id").is(issueId));
                Issue issue = mongoTemplate.findOne(query, Issue.class);

                return new IssueBacklogResponse(
                    issue.getId(),
                    issue.getIssueKey(),
                    issue.getIssueName(),
                    getUserResponse(issue.getAssignee()),
                    issue.getPriority(),
                    issue.getStatus()
                );
            })
            .collect(Collectors.toList());
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
