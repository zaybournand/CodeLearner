package com.learn2code.backend.resource.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learn2code.backend.resource.model.Resource;
import com.learn2code.backend.resource.repository.ResourceRepository;

@Service
public class ResourceService {

    @Autowired
    private ResourceRepository resourceRepository;

    public List<Resource> getResourcesByTopic(String topic) {
        return resourceRepository.findByTopicOrderByAverageRatingDesc(topic);
    }

    public Resource addResource(Resource resource) {
        return resourceRepository.save(resource);
    }

    public Resource rateResource(Long id, int score) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resource not found with id: " + id));

        resource.addRating(score);
        return resourceRepository.save(resource);
    }
}
