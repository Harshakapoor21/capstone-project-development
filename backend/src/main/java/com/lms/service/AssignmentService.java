package com.lms.service;

import com.lms.entity.Assignment;
import com.lms.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    public Assignment createAssignment(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    public List<Assignment> getAssignmentsByModule(Long moduleId) {
        return assignmentRepository.findByModuleId(moduleId);
    }

    public void deleteAssignment(Long id) {
        assignmentRepository.deleteById(id);
    }
}