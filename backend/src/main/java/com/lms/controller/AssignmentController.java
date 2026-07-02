package com.lms.controller;

import com.lms.entity.Assignment;
import com.lms.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
@CrossOrigin(origins = "http://localhost:5173")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @PostMapping
    public Assignment createAssignment(@RequestBody Assignment assignment) {
        return assignmentService.createAssignment(assignment);
    }

    @GetMapping
    public List<Assignment> getAllAssignments() {
        return assignmentService.getAllAssignments();
    }

    @GetMapping("/module/{moduleId}")
    public List<Assignment> getAssignmentsByModule(@PathVariable Long moduleId) {
        return assignmentService.getAssignmentsByModule(moduleId);
    }

    @DeleteMapping("/{id}")
    public String deleteAssignment(@PathVariable Long id) {
        assignmentService.deleteAssignment(id);
        return "Assignment deleted successfully!";
    }
}