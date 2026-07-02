package com.lms.controller;

import com.lms.entity.Module;
import com.lms.repository.ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.lms.repository.AssignmentRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RestController
@RequestMapping("/api/modules")
public class ModuleController {

    @Autowired
    private ModuleRepository moduleRepository;

    @Autowired
private AssignmentRepository assignmentRepository;

    // Create module
    @PostMapping
    public Module createModule(@RequestBody Module module) {
        return moduleRepository.save(module);
    }

    // Get all modules
    @GetMapping
    public List<Module> getAllModules() {
        return moduleRepository.findAll();
    }

    
    // Get module by id
    @GetMapping("/{id}")
    public Module getModuleById(@PathVariable Long id) {
        return moduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Module not found"));
    }
@DeleteMapping("/{id}")
@Transactional
public String deleteModule(@PathVariable Long id) {

    assignmentRepository.deleteByModuleId(id);

    moduleRepository.deleteById(id);

    return "Module deleted";
}
}