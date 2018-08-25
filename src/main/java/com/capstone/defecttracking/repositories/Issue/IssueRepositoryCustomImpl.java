package com.capstone.defecttracking.repositories.Issue;

import com.capstone.defecttracking.models.Category.Category;
import com.capstone.defecttracking.models.Category.CategoryProjectResponse;
import com.capstone.defecttracking.models.Filter.Filter;
import com.capstone.defecttracking.models.Issue.*;
import com.capstone.defecttracking.models.Message.Message;
import com.capstone.defecttracking.models.Project.Project;
import com.capstone.defecttracking.models.Status.Status;
import com.capstone.defecttracking.models.Status.StatusResponse;
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

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
            getStatusResponse(issue.getStatus())
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
        ArrayList<String> watchers = new ArrayList<>();

        watchers.add(issue.getAssignee());
        watchers.add(issue.getReporter());
        return getUserEmail(watchers);
    }

    @Override
    public String generateIssueKey(String projectId) {
        Query query = new Query(Criteria.where("projectId").is(projectId)).with(Sort.by("createdAt").descending());
        Issue latestIssue = mongoTemplate.findOne(query, Issue.class);
        query = new Query(Criteria.where("_id").is(projectId));
        Project project = mongoTemplate.findOne(query, Project.class);

        if (latestIssue != null) {
            String key = latestIssue.getIssueKey();
            String[] arr = key.split("-");

            return project.getKey() + "-" + (Integer.parseInt(arr[arr.length - 1]) + 1) + "";
        } else {
            return project.getKey() + "-1";
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
    public IssueListResponse loadAllIssues(IssueListRequest issueListRequest) {
        Criteria criteria = new Criteria();
        Sort sort = Sort.by("updatedAt").descending();

        for (int i = 0; i < issueListRequest.getFiltered().size(); i++) {
            FilterType filterType = issueListRequest.getFiltered().get(i);
            if (filterType.getId().equals("createdAt") || filterType.getId().equals("finishedAt")) {
                Date date = null;
                Date dateAfterDate = null;
                try {
                    date = new SimpleDateFormat("MM/dd/yyyy").parse(filterType.getValue());
                    dateAfterDate = new Date(date.getTime() + 24 * 60 * 60 * 1000);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                criteria.and(filterType.getId()).gte(date).lte(dateAfterDate);
            } else {
                criteria.and(filterType.getId()).regex(filterType.getValue(), "i");
            }
        }
        if (issueListRequest.getSorted() != null && issueListRequest.getSorted().isDesc()) {
            sort = Sort.by(issueListRequest.getSorted().getId()).descending();
        } else if (issueListRequest.getSorted() != null) {
            sort = Sort.by(issueListRequest.getSorted().getId()).ascending();
        }
        Query query = new Query(criteria).with(sort).limit(issueListRequest.getPageSize()).skip(issueListRequest.getPage() * issueListRequest.getPageSize());
        List<IssueResponse> issueList = mongoTemplate
            .find(query, Issue.class)
            .stream()
            .map(issue -> new IssueResponse(
                issue.getId(),
                issue.getIssueKey(),
                issue.getIssueName(),
                getUserResponse(issue.getReporter()),
                getUserResponse(issue.getAssignee()),
                getStatusResponse(issue.getStatus()),
                issue.getPriority(),
                issue.getDueDate(),
                issue.getCreatedAt(),
                issue.getFinishedAt()
            ))
            .collect(Collectors.toList());

        query = new Query(criteria);
        int pages = (int) Math.ceil((double) mongoTemplate.find(query, Issue.class).size() / issueListRequest.getPageSize());
        return new IssueListResponse(issueList, pages);
    }

    @Override
    public IssueListResponse loadAllIssuesBasedOnFilter(IssueListRequest issueListRequest, Filter filter) {
        Query query = configCriteriaForIssueList(issueListRequest, filter);
        int pages = (int) Math.ceil((double) mongoTemplate.find(query, Issue.class).size() / issueListRequest.getPageSize());

        query.limit(issueListRequest.getPageSize()).skip(issueListRequest.getPage() * issueListRequest.getPageSize());
        List<IssueResponse> issueList = mongoTemplate
            .find(query, Issue.class)
            .stream()
            .map(issue -> new IssueResponse(
                issue.getId(),
                issue.getIssueKey(),
                issue.getIssueName(),
                getStatusResponse(issue.getStatus()),
                issue.getPriority(),
                issue.getCreatedAt()
            ))
            .collect(Collectors.toList());


        return new IssueListResponse(issueList, pages);
    }

    @Override
    public IssueHomePageResponse loadAllIssuesShortcut(String userId) {
        Query query = new Query(Criteria.where("isDone").is(true));
        Status status = mongoTemplate.findOne(query, Status.class);
        query = new Query(Criteria.where("assignee").is(userId).and("status").ne(status.getId())).with(Sort.by("updatedAt").descending()).limit(6);
        List<Issue> issueList = mongoTemplate.find(query, Issue.class);
        IssueHomePageResponse issuesResponse = new IssueHomePageResponse();

        issuesResponse.setAssigned(issueList
            .stream()
            .map(issue -> new IssueShortcutResponse(
                issue.getId(),
                issue.getIssueKey(),
                issue.getIssueName(),
                issue.getPriority(),
                getStatusResponse(issue.getStatus())
            ))
            .collect(Collectors.toList())
        );

        query = new Query(Criteria.where("reporter").is(userId).and("status").ne(status.getId())).with(Sort.by("updatedAt").descending()).limit(6);
        issueList = mongoTemplate.find(query, Issue.class);
        issuesResponse.setReported(issueList
            .stream()
            .map(issue -> new IssueShortcutResponse(
                issue.getId(),
                issue.getIssueKey(),
                issue.getIssueName(),
                issue.getPriority(),
                getStatusResponse(issue.getStatus())
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
        ArrayList<Long> createdData = new ArrayList<>();
        List<IssueReportResponse> issueReportResponses = new ArrayList<>();

        for (int j = 0; j < issueReportRequest.getStatus().size(); j++) {
            ArrayList<Long> data = new ArrayList<>();
            String statusId = issueReportRequest.getStatus().get(j);
            Query query = new Query(Criteria.where("_id").is(statusId));
            Status statusData = mongoTemplate.findOne(query, Status.class);

            for (int i = 0; i < issueReportRequest.getDates().size(); i++) {
                Criteria criteria = new Criteria();
                Date date = issueReportRequest.getDates().get(i);
                long count1 = 0;

                criteria.andOperator(
                    Criteria.where("projectId").is(issueReportRequest.getProjectId()),
                    Criteria.where("createdAt").lte(date)
                );
                query = new Query(criteria);
                if (createdData.size() < issueReportRequest.getDates().size()) {
                    createdData.add((long) mongoTemplate.find(query, Issue.class).size());
                }
                if (statusData.isDefault() == true) {
                    criteria.and("status").is(statusId);
                    query = new Query(criteria);
                    count1 = (long) mongoTemplate.find(query, Issue.class).size();
                }
                if (statusData.isIsDone() == true) {
                    criteria.and("finishedAt").lte(date);
                    query = new Query(criteria);
                    data.add((long) mongoTemplate.find(query, Issue.class).size());
                    continue;
                }
                query = new Query(criteria);
                long count = mongoTemplate.find(query, Issue.class)
                    .stream()
                    .filter(issue -> {
                        Criteria subCriteria = new Criteria();

                        subCriteria.andOperator(
                            Criteria.where("issueId").is(issue.getId()),
                            Criteria.where("type.newEntityId").is(statusId),
                            Criteria.where("createdAt").lte(date)
                        );
                        Query subQuery = new Query(subCriteria);

                        return mongoTemplate.findOne(subQuery, Message.class) != null;
                    })
                    .count();
                data.add(count1 > 0 ? count + count1 : count);
            }
            issueReportResponses.add(new IssueReportResponse(statusData.getName(), data));
        }
        issueReportResponses.add(new IssueReportResponse("Created", createdData));

        return issueReportResponses;
    }

    private Query configCriteriaForIssueList(IssueListRequest issueListRequest, Filter filter) {
        Criteria criteria = new Criteria();
        Sort sort = Sort.by("updatedAt").descending();

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

        for (int i = 0; i < issueListRequest.getFiltered().size(); i++) {
            FilterType filterType = issueListRequest.getFiltered().get(i);
            if (filterType.getId().equals("createdAt") || filterType.getId().equals("finishedAt")) {
                Date date = null;
                Date dateAfterDate = null;
                try {
                    date = new SimpleDateFormat("MM/dd/yyyy").parse(filterType.getValue());
                    dateAfterDate = new Date(date.getTime() + 24 * 60 * 60 * 1000);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                criteria.and(filterType.getId()).gte(date).lte(dateAfterDate);
            } else {
                criteria.and(filterType.getId()).regex(filterType.getValue(), "i");
            }
        }
        if (issueListRequest.getSorted() != null && issueListRequest.getSorted().isDesc()) {
            sort = Sort.by(issueListRequest.getSorted().getId()).descending();
        } else if (issueListRequest.getSorted() != null) {
            sort = Sort.by(issueListRequest.getSorted().getId()).ascending();
        }
        return new Query(criteria).with(sort);
    }

    private StatusResponse getStatusResponse(String statusId) {
        Query query = new Query(Criteria.where("_id").is(statusId));
        Status status = mongoTemplate.findOne(query, Status.class);

        return new StatusResponse(statusId, status.getName(), status.getBackground(), status.getColor(), status.isIsDone());
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
