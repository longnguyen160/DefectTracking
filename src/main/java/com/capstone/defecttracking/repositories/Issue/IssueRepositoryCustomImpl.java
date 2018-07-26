package com.capstone.defecttracking.repositories.Issue;

import com.capstone.defecttracking.enums.Roles;
import com.capstone.defecttracking.models.Category.Category;
import com.capstone.defecttracking.models.Category.CategoryProjectResponse;
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

        query = new Query(Criteria.where("_id").in(issue.getCategories()));
        ArrayList<CategoryProjectResponse> categories = mongoTemplate
            .find(query, Category.class)
            .stream()
            .map(category -> new CategoryProjectResponse(
                category.getId(),
                category.getName(),
                category.getColor(),
                category.getBackground()
            ))
            .collect(Collectors.toCollection(ArrayList::new));

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
            issue.getFinishedAt(),
            new ArrayList<UserResponse>(issue.getWatchers().stream().map(this::getUserResponse).collect(Collectors.toList())),
            categories,
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
            issue.getPriority(),
            issue.getStatus()
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
    public List<String> loadWatcherEmails(String issueId) {
        Query query = new Query(Criteria.where("_id").is(issueId));
        Issue issue = mongoTemplate.findOne(query, Issue.class);

        return getUserEmail(issue.getWatchers());
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

        if (user != null && user.getProfile() == null) {
            return new UserResponse(user.getId(), user.getUsername());
        } else if (user != null) {
            return new UserResponse(user.getId(), user.getUsername(), user.getProfile().getAvatarURL());
        }

        return null;
    }

    private List<String> getUserEmail(ArrayList<String> userIds) {
        Query query = new Query(Criteria.where("_id").in(userIds));

        return mongoTemplate.find(query, User.class).stream().map(User::getEmail).collect(Collectors.toList());
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
    public List<IssueShortcutResponse> loadAllIssuesBasedOnFilter(Filter filter) {
        Criteria criteria = new Criteria();

        if (filter.getStatus() != null && filter.getStatus().size() > 0) {
            criteria.and("status").in(filter.getStatus());
        }
        if (filter.getAssignee() != null && filter.getAssignee().size() > 0) {
            criteria.and("assignee").in(filter.getAssignee());
        }
        if (filter.getReporter() != null && filter.getReporter().size() > 0) {
            criteria.and("reporter").in(filter.getReporter());
        }
        if (filter.getCategories() != null && filter.getCategories().size() > 0) {
            criteria.and("categories").all(filter.getCategories());
        }
        if (filter.getProjectId() != null && filter.getProjectId().length() > 0) {
            criteria.and("projectId").in(filter.getProjectId());
        }
        if (filter.getPriority() != null && filter.getPriority().size() > 0) {
            criteria.and("priority").in(filter.getPriority());
        }
        Query query = new Query(criteria).with(Sort.by("updatedAt").descending());
        return mongoTemplate
            .find(query, Issue.class)
            .stream()
            .map(issue -> new IssueShortcutResponse(
                issue.getId(),
                issue.getIssueKey(),
                issue.getIssueName(),
                issue.getPriority(),
                getStatusColor(issue.getStatus())
            ))
            .collect(Collectors.toList());
    }

    @Override
    public IssueHomePageResponse loadAllIssuesShortcut(String userId) {
        Query query = new Query(Criteria.where("assignee").is(userId)).with(Sort.by("updatedAt").descending()).limit(6);
        List<Issue> issueList = mongoTemplate.find(query, Issue.class);
        IssueHomePageResponse issuesResponse = new IssueHomePageResponse();

        issuesResponse.setAssigned(issueList
            .stream()
            .map(issue -> new IssueShortcutResponse(
                issue.getId(),
                issue.getIssueKey(),
                issue.getIssueName(),
                issue.getPriority(),
                getStatusColor(issue.getStatus())
            ))
            .collect(Collectors.toList())
        );

        query = new Query(Criteria.where("reporter").is(userId)).with(Sort.by("updatedAt").descending()).limit(6);
        issueList = mongoTemplate.find(query, Issue.class);
        issuesResponse.setReported(issueList
            .stream()
            .map(issue -> new IssueShortcutResponse(
                issue.getId(),
                issue.getIssueKey(),
                issue.getIssueName(),
                issue.getPriority(),
                getStatusColor(issue.getStatus())
            ))
            .collect(Collectors.toList()));

        return issuesResponse;
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

    @Override
    public List<IssueReportResponse> getIssueSummary(IssueReportRequest issueReportRequest) {
        ArrayList<Integer> createdData = new ArrayList<>();
        ArrayList<Integer> resolvedData = new ArrayList<>();
        List<IssueReportResponse> issueReportResponses = new ArrayList<>();

        for (int i = 0; i < issueReportRequest.getDates().size(); i++) {
            Criteria criteria = new Criteria();
            criteria.andOperator(
                Criteria.where("projectId").is(issueReportRequest.getProjectId()),
                Criteria.where("createdAt").lte(issueReportRequest.getDates().get(i))
            );
            Query query = new Query(criteria);
            createdData.add(mongoTemplate.find(query, Issue.class).size());

            criteria = new Criteria();
            criteria.andOperator(
                Criteria.where("projectId").is(issueReportRequest.getProjectId()),
                Criteria.where("finishedAt").lte(issueReportRequest.getDates().get(i))
            );
            query = new Query(criteria);
            resolvedData.add(mongoTemplate.find(query, Issue.class).size());
        }
        issueReportResponses.add(new IssueReportResponse("created", createdData));
        issueReportResponses.add(new IssueReportResponse("resolved", resolvedData));

        return issueReportResponses;
    }

    private String getStatusColor(String statusId) {
        Query query = new Query(Criteria.where("_id").is(statusId));

        return mongoTemplate.findOne(query, Status.class).getBackground();
    }

    private Update configUpdate(ArrayList<?> list, String type, String value) {
        if (list.contains(value)) {
            return new Update().pull(type, value).currentDate("updatedAt");
        } else {
            return new Update().push(type, value).currentDate("updatedAt");
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
                update.set(type, value).currentDate("updatedAt");

                if (type.equals("status") && isStatusDone(value)) {
                    update.currentDate("finishedAt");
                }
                break;
        }

        UpdateResult result = mongoTemplate.updateFirst(query, update, Issue.class);

        return result.getModifiedCount() != 0;
    }

    private boolean isStatusDone(String statusId) {
        Query query = new Query(Criteria.where("_id").is(statusId));

        return mongoTemplate.findOne(query, Status.class).isIsDone();
    }

    @Override
    public Boolean updateIssueCategories(String issueId, String type, ArrayList<String> value) {
        Query query = new Query(Criteria.where("_id").is(issueId));
        Update update = new Update();

        update.set(type, value);
        UpdateResult result = mongoTemplate.updateFirst(query, update, Issue.class);

        return result.getModifiedCount() != 0;
    }

    @Override
    public void addIssueToBacklog(String issueId, String projectId) {
        Query query = new Query(Criteria.where("_id").is(projectId));
        Update update = new Update();

        update.push("backlog", issueId);
        mongoTemplate.updateFirst(query, update, Project.class);
    }

}
