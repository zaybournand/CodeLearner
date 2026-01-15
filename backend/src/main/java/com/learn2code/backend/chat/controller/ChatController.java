package com.learn2code.backend.chat.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping; // Imported all annotations (PostMapping, RequestBody, etc.)
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learn2code.backend.chat.model.Chat;
import com.learn2code.backend.chat.service.ChatService;

@RestController
@RequestMapping("/api/v1/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    // 1. GET: Fetch messages (Matches your frontend axios.get)
    @GetMapping("/{topic}")
    public List<Chat> getMessagesByTopic(@PathVariable String topic) {
        return chatService.getMessagesByTopic(topic);
    }

    // 2. POST: Send a message (Matches your frontend axios.post)
    // --- THIS WAS MISSING ---
    @PostMapping
    public Chat createMessage(@RequestBody Chat message) {
        message.setTimestamp(LocalDateTime.now());
        return chatService.saveMessage(message);
    }

    // 3. WebSocket: Keep this for future real-time features
    @MessageMapping("/sendMessage/{topic}")
    @SendTo("/topic/messages/{topic}")
    public Chat sendMessage(
            @DestinationVariable String topic,
            @Payload Chat message
    ) {
        message.setTopic(topic);
        message.setTimestamp(LocalDateTime.now());
        return chatService.saveMessage(message);
    }
}
