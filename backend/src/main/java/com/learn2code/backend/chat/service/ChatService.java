package com.learn2code.backend.chat.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learn2code.backend.chat.model.Chat;
import com.learn2code.backend.chat.repository.ChatRepository;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    public List<Chat> getMessagesByTopic(String topic) {
        try {
            return chatRepository.findByTopic(topic);
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving messages for topic " + topic + ": " + e.getMessage());
        }

    }

    public Chat saveMessage(Chat message) {
        try {
            return chatRepository.save(message);
        } catch (Exception e) {
            throw new RuntimeException("Error saving message: " + e.getMessage());
        }

    }

}
