package com.learn2code.backend.chat.controller;

import com.learn2code.backend.chat.model.ChatMessage;
import com.learn2code.backend.chat.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @GetMapping("/{topic}")
    public List<ChatMessage> getMessagesByTopic(@PathVariable String topic) {
        return chatService.getMessagesByTopic(topic);
    }

    @MessageMapping("/sendMessage")
    @SendTo("/topic/messages")
    public ChatMessage sendMessage(ChatMessage message) {
        return chatService.saveMessage(message);
    }
}
