package com.lms.controller;

import com.lms.entity.Progress;
import com.lms.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(origins = "http://localhost:5173")
public class ProgressController {

    @Autowired
    private ProgressService progressService;

    @PostMapping
    public Progress saveProgress(@RequestBody Progress progress) {
        return progressService.saveProgress(progress);
    }

    @GetMapping
    public List<Progress> getAllProgress() {
        return progressService.getAllProgress();
    }

    @GetMapping("/student/{email}")
    public List<Progress> getStudentProgress(@PathVariable String email) {
        return progressService.getStudentProgress(email);
    }

    @GetMapping("/assignment/{assignmentId}")
    public List<Progress> getAssignmentProgress(@PathVariable Long assignmentId) {
        return progressService.getAssignmentProgress(assignmentId);
    }

    @DeleteMapping("/{id}")
    public String deleteProgress(@PathVariable Long id) {
        progressService.deleteProgress(id);
        return "Progress deleted successfully!";
    }
}