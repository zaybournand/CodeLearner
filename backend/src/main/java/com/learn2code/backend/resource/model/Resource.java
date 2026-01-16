package com.learn2code.backend.resource.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "resources")

public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String url;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String topic;

    private String addedBy;

    private Double averageRating = 0.0;
    private int totalVotes = 0;
    private long sumRating = 0;

    public Resource() {
    }

    public Resource(String title, String url, String description, String topic, String addedBy) {
        this.title = title;
        this.url = url;
        this.description = description;
        this.topic = topic;
        this.addedBy = addedBy;
    }

    public void addRating(int score) {
        if (score < 0 || score > 10) {
            return;
        }
        this.sumRating += score;
        this.totalVotes += 1;
        this.averageRating = (double) this.sumRating / this.totalVotes;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getAddedBy() {
        return addedBy;
    }

    public void setAddedBy(String addedBy) {
        this.addedBy = addedBy;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public int getTotalVotes() {
        return totalVotes;
    }

}
