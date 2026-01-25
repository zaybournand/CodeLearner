package com.learn2code.backend.roadmap.controller;

import com.learn2code.backend.roadmap.dto.RoadmapStepDTO;
import com.learn2code.backend.roadmap.model.RoadmapStep;
import com.learn2code.backend.roadmap.service.RoadmapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/roadmaps")
public class RoadmapController {

    @Autowired
    private RoadmapService roadmapService;

    @GetMapping("/{topic}")
    public List<RoadmapStepDTO> getRoadmap(
            @PathVariable String topic,
            @RequestParam(required = false) Long userId
    ) {
        return roadmapService.getRoadmapForUser(topic, userId);
    }

    @PostMapping("/{stepId}/toggle")
    public ResponseEntity<String> toggleStep(
            @PathVariable Long stepId,
            @RequestBody Map<String, Long> payload
    ) {
        Long userId = payload.get("userId");

        if (userId == null) {
            return ResponseEntity.badRequest().body("UserId required");
        }

        // FIX: Changed 'togglePassword' to 'toggleProgress' to match your Service
        roadmapService.toggleProgress(userId, stepId);
        return ResponseEntity.ok("Toggled");
    }

    @PostMapping
    public RoadmapStep addStep(@RequestBody RoadmapStep step) {
        return roadmapService.addStep(step);
    }
}
