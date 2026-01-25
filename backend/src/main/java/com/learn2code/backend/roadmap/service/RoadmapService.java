package com.learn2code.backend.roadmap.service;

import com.learn2code.backend.roadmap.dto.RoadmapStepDTO;
import com.learn2code.backend.roadmap.model.RoadmapStep;
import com.learn2code.backend.roadmap.model.UserProgress;
import com.learn2code.backend.roadmap.repository.RoadmapStepRepository;
import com.learn2code.backend.roadmap.repository.UserProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RoadmapService {

    @Autowired
    private RoadmapStepRepository stepRepository;

    @Autowired
    private UserProgressRepository progressRepository;

    // Logic: Get all steps + check if user completed them
    public List<RoadmapStepDTO> getRoadmapForUser(String topic, Long userId) {
        List<RoadmapStep> steps = stepRepository.findByTopicOrderByStepOrderAsc(topic);
        List<RoadmapStepDTO> response = new ArrayList<>();

        for (RoadmapStep step : steps) {
            boolean isCompleted = false;
            if (userId != null) {
                Optional<UserProgress> prog = progressRepository.findByUserIdAndStepId(userId, step.getId());
                if (prog.isPresent() && prog.get().isCompleted()) {
                    isCompleted = true;
                }
            }
            response.add(new RoadmapStepDTO(step.getId(), step.getTitle(), step.getDescription(), isCompleted));
        }
        return response;
    }

    // Logic: Flip the completion status
    public void toggleProgress(Long userId, Long stepId) {
        Optional<UserProgress> existing = progressRepository.findByUserIdAndStepId(userId, stepId);

        if (existing.isPresent()) {
            UserProgress prog = existing.get();
            prog.setCompleted(!prog.isCompleted());
            progressRepository.save(prog);
        } else {
            UserProgress newProg = new UserProgress(userId, stepId, true);
            progressRepository.save(newProg);
        }
    }

    // Logic: Add new step (Admin)
    public RoadmapStep addStep(RoadmapStep step) {
        return stepRepository.save(step);
    }
}
