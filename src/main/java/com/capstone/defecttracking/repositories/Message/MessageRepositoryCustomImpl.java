package com.capstone.defecttracking.repositories.Message;

import com.capstone.defecttracking.models.Issue.Issue;
import com.capstone.defecttracking.models.Issue.IssueHistoryResponse;
import com.capstone.defecttracking.models.Message.Message;
import com.capstone.defecttracking.models.Message.MessageHistoryResponse;
import com.capstone.defecttracking.models.Message.MessageResponse;
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

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class MessageRepositoryCustomImpl implements MessageRepositoryCustom {

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public List<MessageResponse> findAllMessagesOnIssue(String issueId, String type) {
        Criteria criteria = new Criteria();

        switch (type) {
            case "all":
                criteria = Criteria.where("issueId").is(issueId);
                break;
            default:
                criteria.andOperator(
                    Criteria.where("issueId").is(issueId),
                    Criteria.where("type").is(type)
                );
                break;
        }
        Query query = new Query(criteria).with(Sort.by("createdAt").descending());

        return mongoTemplate
            .find(query, Message.class)
            .stream()
            .map(message -> new MessageResponse(
                message.getId(),
                message.getIssueId(),
                message.getMessage(),
                message.getType(),
                getUserResponse(message.getSender()),
                message.getEdited(),
                message.getCreatedAt(),
                message.getUpdatedAt(),
                message.getAttachments()
            ))
            .collect(Collectors.toList());
    }

    @Override
    public List<MessageHistoryResponse> findAllMessages(String userId) {
        Query query = new Query(Criteria.where("_id").is(userId));
        User user = mongoTemplate.findOne(query, User.class);

        if (user.getRoles().contains("ADMIN")) {
            query = new Query().limit(10);
            return mongoTemplate
                .find(query, Message.class)
                .stream()
                .map(message -> new MessageHistoryResponse(
                    message.getId(),
                    getIssueKey(message.getIssueId()),
                    message.getMessage(),
                    message.getType(),
                    getUserResponse(message.getSender()),
                    message.getCreatedAt(),
                    message.getUpdatedAt()
                ))
                .collect(Collectors.toList());
        }

        query = new Query(Criteria.where("members.userId").is(userId));
        List<String> projectIds = mongoTemplate
            .find(query, Project.class)
            .stream()
            .map(Project::getId)
            .collect(Collectors.toList());

        query = new Query(Criteria.where("projectId").in(projectIds));
        List<String> issueIds = mongoTemplate
            .find(query, Issue.class)
            .stream()
            .map(Issue::getId)
            .collect(Collectors.toList());

        query = new Query(Criteria.where("issueId").in(issueIds)).with(Sort.by("createdAt").descending()).limit(10);

        return mongoTemplate
            .find(query, Message.class)
            .stream()
            .map(message -> new MessageHistoryResponse(
                message.getId(),
                getIssueKey(message.getIssueId()),
                message.getMessage(),
                message.getType(),
                getUserResponse(message.getSender()),
                message.getCreatedAt(),
                message.getUpdatedAt()
            ))
            .collect(Collectors.toList());
    }

    @Override
    public IssueHistoryResponse getIssueKey(String issueId) {
        Query query = new Query(Criteria.where("_id").is(issueId));
        Issue issue = mongoTemplate.findOne(query, Issue.class);

        return new IssueHistoryResponse(
            issue.getId(),
            issue.getIssueName(),
            issue.getIssueKey()
        );
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
    public Boolean editMessage(Message message) {
        Query query = new Query(Criteria.where("_id").is(message.getId()));
        Update update = new Update();

        update.set("message", message.getMessage());
        update.set("attachments", message.getAttachments());
        update.set("edited", true);
        UpdateResult result = mongoTemplate.updateFirst(query, update, Message.class);

        return result.getModifiedCount() == 1;
    }

    @Override
    public String checkReject(Message message) {
        Query query = new Query(Criteria.where("_id").is(message.getIssueId()));
        Issue issue = mongoTemplate.findOne(query, Issue.class);

        query = new Query(Criteria.where("_id").is(issue.getProjectId()));
        Project project = mongoTemplate.findOne(query, Project.class);

        if (project != null) {
            String senderRole = project.getMembers()
                .stream()
                .filter(member -> member.getUserId().equals(message.getSender()))
                .findFirst()
                .get()
                .getRole();

            query = new Query(Criteria.where("_id").is(message.getType().getNewEntityId()));
            Status newStatus = mongoTemplate.findOne(query, Status.class);
            List<String> newHandlers = newStatus.getHandlers();

            query = new Query(Criteria.where("_id").is(message.getType().getOldEntityId()));
            Status oldStatus = mongoTemplate.findOne(query, Status.class);
            List<String> oldHandlers = oldStatus.getHandlers();

            if (senderRole.equals("reporter")) {
                if (newHandlers.contains("reporter") && newHandlers.contains("developer") && oldHandlers.contains("reporter") && oldHandlers.contains("developer")) {
                    return "reporter";
                }
            } else if (senderRole.equals("manager")) {
                if (newHandlers.contains("manager") && newHandlers.contains("reporter") && oldHandlers.contains("manager") && oldHandlers.contains("reporter")) {
                    return "manager";
                }
            }
        }

        return null;
    }
}
