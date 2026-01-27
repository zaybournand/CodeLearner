package com.learn2code.backend.roadmap.repository;

import com.learn2code.backend.roadmap.model.RoadmapStep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query; // <--- MUST HAVE THIS
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RoadmapStepRepository extends JpaRepository<RoadmapStep, Long> {

    List<RoadmapStep> findByTopicOrderByStepOrderAsc(String topic);

    // FIX: Ensure this query string is correct and imported
    @Query("SELECT DISTINCT r.topic FROM RoadmapStep r")
    List<String> findDistinctTopics();
}
