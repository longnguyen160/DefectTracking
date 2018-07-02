package com.capstone.defecttracking.repositories.Message;

import com.capstone.defecttracking.models.Message.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepository extends MongoRepository<Message, String> {
}
