package com.lms.service;

import com.lms.entity.Progress;
import com.lms.repository.ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgressService {

    @Autowired
    private ProgressRepository progressRepository;

    public Progress saveProgress(Progress progress) {

    var existingProgress = progressRepository
            .findByStudentEmailAndAssignmentId(
                    progress.getStudentEmail(),
                    progress.getAssignment().getId()
            );

    if (existingProgress.isPresent()) {

        Progress existing = existingProgress.get();
        existing.setCompleted(progress.isCompleted());

        return progressRepository.save(existing);
    }

    return progressRepository.save(progress);
}

    public List<Progress> getStudentProgress(String studentEmail) {
        return progressRepository.findByStudentEmail(studentEmail);
    }

    public List<Progress> getAssignmentProgress(Long assignmentId) {
        return progressRepository.findByAssignmentId(assignmentId);
    }

    public List<Progress> getAllProgress() {
        return progressRepository.findAll();
    }

    public void deleteProgress(Long id) {
        progressRepository.deleteById(id);
    }
}