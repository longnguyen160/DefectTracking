package com.capstone.defecttracking.repositories.Notification;

import com.capstone.defecttracking.models.Issue.Issue;
import com.capstone.defecttracking.models.Issue.IssueHistoryResponse;
import com.capstone.defecttracking.models.Notification.Notification;
import com.capstone.defecttracking.models.Notification.NotificationResponse;
import com.capstone.defecttracking.models.User.User;
import com.capstone.defecttracking.models.User.UserDetailsSecurity;
import com.capstone.defecttracking.models.User.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class NotificationRepositoryCustomImpl implements NotificationRepositoryCustom {

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public long getUnseenNotification() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsSecurity userDetailsSecurity = (UserDetailsSecurity) authentication.getPrincipal();
        Criteria criteria = Criteria.where("recipients").elemMatch(
            Criteria
                .where("userId").is(userDetailsSecurity.getId())
                .and("isSeen").is(false)
        );
        Query query = new Query(criteria);

        return mongoTemplate.find(query, Notification.class).size();
    }

    @Override
    public List<NotificationResponse> loadNotifications() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsSecurity userDetailsSecurity = (UserDetailsSecurity) authentication.getPrincipal();
        Criteria criteria = Criteria.where("recipients").elemMatch(
            Criteria
                .where("userId").is(userDetailsSecurity.getId())
                .and("isDeleted").is(false)
        );
        Query query = new Query(criteria).with(Sort.by("createdAt").descending());

        return mongoTemplate
            .find(query, Notification.class)
            .stream()
            .map(notification -> new NotificationResponse(
                notification.getId(),
                getIssueKey(notification.getIssueId()),
                notification.getMessage(),
                notification.getType(),
                getUserResponse(notification.getSender()),
                notification.getRecipients()
                    .stream()
                    .filter(recipient -> recipient.getUserId().equals(userDetailsSecurity.getId()))
                    .findFirst().get().isRead(),
                notification.getCreatedAt()
            ))
            .collect(Collectors.toList());
    }

    @Override
    public NotificationResponse loadNotification() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsSecurity userDetailsSecurity = (UserDetailsSecurity) authentication.getPrincipal();
        Query query = new Query(Criteria.where("recipients.userId").is(userDetailsSecurity.getId())).with(Sort.by("createdAt").descending());
        Notification notification = mongoTemplate.findOne(query, Notification.class);

        return new NotificationResponse(
            notification.getId(),
            getIssueKey(notification.getIssueId()),
            notification.getMessage(),
            notification.getType(),
            getUserResponse(notification.getSender()),
            notification.getRecipients()
                .stream()
                .filter(recipient -> recipient.getUserId().equals(userDetailsSecurity.getId()))
                .findFirst().get().isRead(),
            notification.getCreatedAt()
        );
    }

    @Override
    public void setNotificationToSeen(String notificationId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsSecurity userDetailsSecurity = (UserDetailsSecurity) authentication.getPrincipal();
        Query query = new Query(Criteria.where("_id").is(notificationId).and("recipients.userId").is(userDetailsSecurity.getId()));
        Update update = new Update();

        update.set("recipients.$.isSeen", true);
        mongoTemplate.updateFirst(query, update, Notification.class);
    }

    @Override
    public void setNotificationToRead(String notificationId, String notificationType) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsSecurity userDetailsSecurity = (UserDetailsSecurity) authentication.getPrincipal();
        Query query = new Query(Criteria.where("_id").is(notificationId).and("recipients.userId").is(userDetailsSecurity.getId()));
        Update update = new Update();

        update.set("recipients.$.isSeen", true);
        if (notificationType.equals("read")) {
            update.set("recipients.$.isRead", true);
        } else {
            update.set("recipients.$.isRead", false);
        }
        mongoTemplate.updateFirst(query, update, Notification.class);
    }

    @Override
    public void setAllNotificationsToSeen() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsSecurity userDetailsSecurity = (UserDetailsSecurity) authentication.getPrincipal();
        Criteria criteria = Criteria.where("recipients").elemMatch(
            Criteria
                .where("userId").is(userDetailsSecurity.getId())
                .and("isSeen").is(false)
        );
        Query query = new Query(criteria);
        Update update = new Update();

        update.set("recipients.$.isSeen", true);
        mongoTemplate.updateMulti(query, update, Notification.class);
    }

    @Override
    public void setAllNotificationsToRead() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsSecurity userDetailsSecurity = (UserDetailsSecurity) authentication.getPrincipal();
        Criteria criteria = Criteria.where("recipients").elemMatch(
            Criteria
                .where("userId").is(userDetailsSecurity.getId())
                .and("isRead").is(false)
        );
        Query query = new Query(criteria);
        Update update = new Update();

        update.set("recipients.$.isRead", true);
        mongoTemplate.updateMulti(query, update, Notification.class);
    }

    @Override
    public void setAllNotificationsToDelete() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsSecurity userDetailsSecurity = (UserDetailsSecurity) authentication.getPrincipal();
        Criteria criteria = Criteria.where("recipients").elemMatch(
            Criteria
                .where("userId").is(userDetailsSecurity.getId())
                .and("isDeleted").is(false)
        );
        Query query = new Query(criteria);
        Update update = new Update();

        update.set("recipients.$.isDeleted", true);
        mongoTemplate.updateMulti(query, update, Notification.class);
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

    public IssueHistoryResponse getIssueKey(String issueId) {
        Query query = new Query(Criteria.where("_id").is(issueId));
        Issue issue = mongoTemplate.findOne(query, Issue.class);

        return new IssueHistoryResponse(
            issue.getId(),
            issue.getIssueName(),
            issue.getIssueKey()
        );
    }

}
