package com.lms.repository;

import com.lms.entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    List<Assignment> findByModuleId(Long moduleId);

    @Transactional
    @Modifying
    @Query("DELETE FROM Assignment a WHERE a.module.id = :moduleId")
    void deleteByModuleId(@Param("moduleId") Long moduleId);
}