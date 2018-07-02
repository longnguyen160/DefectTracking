package com.capstone.defecttracking.repositories.Message;

import com.capstone.defecttracking.models.Message.Message;
import com.capstone.defecttracking.models.Message.MessageResponse;

import java.util.List;

public interface MessageRepositoryCustom {
    List<MessageResponse> findAllMessages(String issueId, String type);
    Boolean editMessage(Message message);
}
