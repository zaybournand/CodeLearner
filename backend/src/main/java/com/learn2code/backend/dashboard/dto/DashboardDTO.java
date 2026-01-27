package com.learn2code.backend.dashboard.dto;

public class DashboardDTO {

    private final String topic;
    private final int totalSteps;
    private final int completedSteps;
    private final int percentage;

    public DashboardDTO(String topic, int totalSteps, int completedSteps) {
        this.topic = topic;
        this.totalSteps = totalSteps;
        this.completedSteps = completedSteps;
        // Avoid division by zero: if totalSteps is 0, percentage is 0
        this.percentage = (totalSteps > 0) ? (int) ((double) completedSteps / totalSteps * 100) : 0;
    }

    // Getters (Required for JSON response)
    public String getTopic() {
        return topic;
    }

    public int getTotalSteps() {
        return totalSteps;
    }

    public int getCompletedSteps() {
        return completedSteps;
    }

    public int getPercentage() {
        return percentage;
    }
}
