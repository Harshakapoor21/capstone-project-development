package com.lms.controller;

import com.lms.entity.Module;
import com.lms.repository.ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/modules")
public class ModuleController {

    @Autowired
    private ModuleRepository moduleRepository;

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

    // Delete module
    @DeleteMapping("/{id}")
    public String deleteModule(@PathVariable Long id) {
        moduleRepository.deleteById(id);
        return "Module deleted";
    }
}