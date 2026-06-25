package com.lms.controller;

import com.lms.entity.Progress;
import com.lms.repository.ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    @Autowired
    private ProgressRepository progressRepository;

    @PostMapping
    public Progress saveProgress(@RequestBody Progress progress) {
        return progressRepository.save(progress);
    }

    @GetMapping
    public List<Progress> getAllProgress() {
        return progressRepository.findAll();
    }

    @GetMapping("/{id}")
    public Progress getProgressById(@PathVariable Long id) {
        return progressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Progress not found"));
    }

    @DeleteMapping("/{id}")
    public String deleteProgress(@PathVariable Long id) {
        progressRepository.deleteById(id);
        return "Progress deleted";
    }
}