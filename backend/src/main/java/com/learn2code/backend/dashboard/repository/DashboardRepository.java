package com.learn2code.backend.dashboard.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.learn2code.backend.roadmap.model.RoadmapStep;

@Repository
public interface DashboardRepository extends JpaRepository<RoadmapStep, Long> {

    List<RoadmapStep> findByTopicOrderByStepOrderAsc(String topic);
}
