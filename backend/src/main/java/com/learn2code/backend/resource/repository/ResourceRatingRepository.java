package com.learn2code.backend.resource.repository;

import com.learn2code.backend.resource.model.ResourceRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ResourceRatingRepository extends JpaRepository<ResourceRating, Long> {
    Optional<ResourceRating> findByUserIdAndResourceId(Long userId, Long resourceId);
}