package com.capstone.defecttracking.repositories.Notification;

import com.capstone.defecttracking.models.Notification.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NotificationRepository extends MongoRepository<Notification, String> {
}
