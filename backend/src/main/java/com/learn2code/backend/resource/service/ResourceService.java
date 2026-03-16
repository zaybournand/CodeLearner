package com.learn2code.backend.resource.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.learn2code.backend.resource.model.Resource;
import com.learn2code.backend.resource.model.ResourceRating;
import com.learn2code.backend.resource.repository.ResourceRatingRepository;
import com.learn2code.backend.resource.repository.ResourceRepository;

@Service
public class ResourceService {

    @Autowired
    private ResourceRepository resourceRepository;

    @Autowired
    private ResourceRatingRepository ratingRepository;

    public List<Resource> getResourcesByTopic(String topic) {
        return resourceRepository.findByTopicOrderByAverageRatingDesc(topic);
    }

    public Resource addResource(Resource resource) {
        return resourceRepository.save(resource);
    }

    @Transactional
    public Resource rateResource(Long resourceId, Integer score, Long userId) {
        // 1. Validate inputs
        if (score == null || score < 1 || score > 10) {
            throw new IllegalArgumentException("Score must be between 1 and 10");
        }

        // 2. Find the Resource
        Resource resource = resourceRepository.findById(resourceId)
                .orElseThrow(() -> new RuntimeException("Resource not found with id: " + resourceId));

        // 3. Check if this user already voted on this resource
        Optional<ResourceRating> existingRatingOpt = ratingRepository.findByUserIdAndResourceId(userId, resourceId);

        if (existingRatingOpt.isPresent()) {
            ResourceRating existingRating = existingRatingOpt.get();
            int oldScore = existingRating.getScore();

            // Update the rating object
            existingRating.setScore(score);

            // Update stats
            resource.setSumRating(resource.getSumRating() - oldScore + score);

        } else {
            // Brand new rating
            ResourceRating newRating = new ResourceRating(userId, resourceId, score);
            ratingRepository.save(newRating);

            // Update stats
            resource.setSumRating(resource.getSumRating() + score);
            resource.setTotalVotes(resource.getTotalVotes() + 1);
        }

        // 4. Calculate new Average
        if (resource.getTotalVotes() > 0) {
            double avg = (double) resource.getSumRating() / resource.getTotalVotes();
            double roundedAvg = Math.round(avg * 10.0) / 10.0;
            resource.setAverageRating(roundedAvg);
        }

        return resource;
    }
}
