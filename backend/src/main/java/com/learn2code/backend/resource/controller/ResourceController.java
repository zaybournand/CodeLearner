package com.learn2code.backend.resource.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learn2code.backend.resource.model.Resource;
import com.learn2code.backend.resource.service.ResourceService;
import com.learn2code.backend.resource.dto.RateResourceRequest;

@RestController
@RequestMapping("/api/v1/resources")
public class ResourceController {

    @Autowired
    private ResourceService resourceService;

    @GetMapping("/{topic}")
    public List<Resource> getResource(@PathVariable String topic) {
        return resourceService.getResourcesByTopic(topic);
    }

    @PostMapping
    public Resource addResource(@RequestBody Resource resource) {
        return resourceService.addResource(resource);
    }

    @PutMapping("/{id}/rate")
    public ResponseEntity<Resource> rateResource(
            @PathVariable Long id,
            @RequestBody RateResourceRequest payload) {

        if (payload.score() == null || payload.userId() == null) {
            return ResponseEntity.badRequest().build();
        }
        Resource updated = resourceService.rateResource(id, payload.score(), payload.userId());
        return ResponseEntity.ok(updated);
    }
}
