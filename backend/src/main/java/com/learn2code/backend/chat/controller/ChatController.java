package com.learn2code.backend.chat.controller;

import com.learn2code.backend.chat.model.Chat;
import com.learn2code.backend.chat.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    // Get past message by topic
    @GetMapping("/{topic}")
    public List<Chat> getMessagesByTopic(@PathVariable String topic) {
        return chatService.getMessagesByTopic(topic);
    }

    // Websocket to send and receive messages to a specific topic
    @MessageMapping("/sendMessage/{topic}")
    @SendTo("/topic/messages/{topic}")
    public Chat sendMessage(
            @DestinationVariable String topic,
            Chat message
    ) {
        message.setTopic(topic);
        return chatService.saveMessage(message);
    }
}
