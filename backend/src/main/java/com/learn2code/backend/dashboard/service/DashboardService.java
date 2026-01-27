package com.learn2code.backend.dashboard.service;

import com.learn2code.backend.dashboard.dto.DashboardDTO;
import com.learn2code.backend.roadmap.model.RoadmapStep;
import com.learn2code.backend.roadmap.model.UserProgress;
import com.learn2code.backend.roadmap.repository.RoadmapStepRepository;
import com.learn2code.backend.roadmap.repository.UserProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private RoadmapStepRepository stepRepository;

    @Autowired
    private UserProgressRepository progressRepository;

    public List<DashboardDTO> getUserStats(Long userId) {
        // 1. Get all unique topics (e.g. "java", "react")
        // Note: Ensure findDistinctTopics() is defined in RoadmapStepRepository
        List<String> allTopics = stepRepository.findDistinctTopics();
        List<DashboardDTO> stats = new ArrayList<>();

        for (String topic : allTopics) {
            // 2. Get all steps for this specific topic
            List<RoadmapStep> steps = stepRepository.findByTopicOrderByStepOrderAsc(topic);
            int total = steps.size();
            int completed = 0;

            // 3. Count how many steps this user has completed
            for (RoadmapStep step : steps) {
                // Check if a progress record exists and is marked as true
                if (progressRepository.findByUserIdAndStepId(userId, step.getId())
                        .map(UserProgress::isCompleted)
                        .orElse(false)) {
                    completed++;
                }
            }

            // 4. Add to list (only if the topic actually has steps)
            if (total > 0) {
                stats.add(new DashboardDTO(topic, total, completed));
            }
        }

        return stats;
    }
}
