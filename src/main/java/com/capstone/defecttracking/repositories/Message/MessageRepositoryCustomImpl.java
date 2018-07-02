package com.capstone.defecttracking.repositories.Message;

import com.capstone.defecttracking.models.Message.Message;
import com.capstone.defecttracking.models.Message.MessageResponse;
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
    public List<MessageResponse> findAllMessages(String issueId, String type) {
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
}
