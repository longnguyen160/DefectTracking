package com.capstone.defecttracking.controllers;

import com.capstone.defecttracking.models.Message.EditedMessageRequest;
import com.capstone.defecttracking.models.Message.Message;
import com.capstone.defecttracking.models.Message.MessageResponse;
import com.capstone.defecttracking.models.Server.ServerResponse;
import com.capstone.defecttracking.repositories.Message.MessageRepository;
import com.capstone.defecttracking.repositories.Message.MessageRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.List;

@RestController
public class MessageController {

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    MessageRepositoryCustom messageRepositoryCustom;

    private SimpMessagingTemplate template;

    @Inject
    public MessageController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @PostMapping("/user/createMessage")
    public ResponseEntity<?> createMessage(@RequestBody Message message) {
        ServerResponse serverResponse;

        messageRepository.save(message);
        serverResponse = new ServerResponse(true, "Create message successfully");

        template.convertAndSend("/topic/message", serverResponse);

        return new ResponseEntity(serverResponse, HttpStatus.ACCEPTED);
    }

    @GetMapping("/user/getAllMessages")
    public List<MessageResponse> getAllMessages(@RequestParam(value = "issueId") String issueId, String type) {
        return messageRepositoryCustom.findAllMessages(issueId, type);
    }

    @PostMapping("/user/editMessage")
    public ResponseEntity<?> editMessage(@RequestBody Message message) {
        ServerResponse serverResponse;

        if (messageRepositoryCustom.editMessage(message)) {
            serverResponse = new ServerResponse(true, "Edit message successfully");

            template.convertAndSend("/topic/message", serverResponse);
            return new ResponseEntity(serverResponse, HttpStatus.ACCEPTED);
        }

        serverResponse = new ServerResponse(true, "Edit message failed");
        return new ResponseEntity(serverResponse, HttpStatus.BAD_REQUEST);
    }
}
