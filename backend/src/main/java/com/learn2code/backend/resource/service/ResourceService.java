package com.learn2code.backend.resource.service;

import com.learn2code.backend.resource.model.Resource;
import com.learn2code.backend.resource.model.ResourceRating;
import com.learn2code.backend.resource.repository.ResourceRatingRepository;
import com.learn2code.backend.resource.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ResourceService {

    @Autowired
    private ResourceRepository resourceRepository;

    // 1. Inject the Rating Repository (Required for "One Vote" logic)
    @Autowired
    private ResourceRatingRepository ratingRepository;

    public List<Resource> getResourcesByTopic(String topic) {
        return resourceRepository.findByTopicOrderByAverageRatingDesc(topic);
    }

    public Resource addResource(Resource resource) {
        return resourceRepository.save(resource);
    }

    // 2. Updated Method to match your Controller: (ID, Score, UserID)
    @Transactional
    public Resource rateResource(Long resourceId, int score, Long userId) {
        if (score < 1 || score > 10) throw new IllegalArgumentException("Score must be 1-10");

        // Find the Resource
        Resource resource = resourceRepository.findById(resourceId)
                .orElseThrow(() -> new RuntimeException("Resource not found with id: " + resourceId));

        // Check if this user already voted on this resource
        Optional<ResourceRating> existingRating = ratingRepository.findByUserIdAndResourceId(userId, resourceId);

        if (existingRating.isPresent()) {
            // --- USER HAS VOTED BEFORE: UPDATE IT ---
            ResourceRating rating = existingRating.get();
            int oldScore = rating.getScore();
            
            // Update the record in the join table
            rating.setScore(score);
            ratingRepository.save(rating);

            // Update the stats on the Resource object
            long newSum = resource.getSumRating() - oldScore + score;
            resource.setSumRating(newSum);
            // Count stays the same
        } else {
            // --- NEW VOTE: CREATE IT ---
            ResourceRating newRating = new ResourceRating(userId, resourceId, score);
            ratingRepository.save(newRating);

            // Update stats
            resource.setSumRating(resource.getSumRating() + score);
            resource.setTotalVotes(resource.getTotalVotes() + 1);
        }

        // Calculate new Average
        if (resource.getTotalVotes() > 0) {
            double avg = (double) resource.getSumRating() / resource.getTotalVotes();
            resource.setAverageRating(avg);
        }

        return resourceRepository.save(resource);
    }
}