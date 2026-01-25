package com.learn2code.backend.roadmap.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.learn2code.backend.roadmap.model.RoadmapStep;

@Repository
public interface RoadmapStepRepository extends JpaRepository<RoadmapStep, Long> {

    // Finds all steps for a topic (e.g. "react") and sorts them by 1, 2, 3...
    List<RoadmapStep> findByTopicOrderByStepOrderAsc(String topic);

}
