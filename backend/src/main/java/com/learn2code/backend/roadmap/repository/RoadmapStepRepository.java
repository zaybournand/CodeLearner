package com.learn2code.backend.roadmap.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.learn2code.backend.roadmap.model.RoadmapStep;

@Repository
public interface RoadmapStepRepository extends JpaRepository<RoadmapStep, Long> {

    List<RoadmapStep> findByTopicOrderByStepOrderAsc(String topic);

    @Query("SELECT DISTINCT r.topic FROM RoadmapStep r")
    List<String> findDistinctTopics();
}
