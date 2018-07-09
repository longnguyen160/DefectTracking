package com.capstone.defecttracking.repositories.Message;

import com.capstone.defecttracking.models.Message.Message;
import com.capstone.defecttracking.models.Message.MessageHistoryResponse;
import com.capstone.defecttracking.models.Message.MessageResponse;

import java.util.List;

public interface MessageRepositoryCustom {
    List<MessageResponse> findAllMessagesOnIssue(String issueId, String type);
    List<MessageHistoryResponse> findAllMessages(String userId);
    Boolean editMessage(Message message);
}
