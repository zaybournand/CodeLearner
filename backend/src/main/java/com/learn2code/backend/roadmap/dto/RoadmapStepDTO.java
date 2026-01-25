package com.learn2code.backend.roadmap.dto;

public class RoadmapStepDTO {

    private final Long id;
    private final String title;
    private final String description;
    private final boolean completed;

    public RoadmapStepDTO(Long id, String title, String description, boolean completed) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
    }

    // Getters are required for JSON serialization
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public boolean isCompleted() {
        return completed;
    }
}
