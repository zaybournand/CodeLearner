package com.learn2code.backend.dashboard.controller;

import com.learn2code.backend.dashboard.dto.DashboardDTO;
import com.learn2code.backend.dashboard.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/stats")
    public List<DashboardDTO> getDashboardStats(@RequestParam Long userId) {
        return dashboardService.getUserStats(userId);
    }
}
