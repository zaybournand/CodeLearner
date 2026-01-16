package com.learn2code.backend.resource.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.learn2code.backend.resource.model.Resource;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {

    // find by topic and order by descending average rating
    List<Resource> findByTopicOrderByAverageRatingDesc(String topic);
}
