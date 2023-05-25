package com.quokka.backend.repository;

import com.quokka.backend.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    List<Student> findByUserAccountId(Long userAccountId);

    List<Student> findByInstructorId(Long instructorId);

    List<Student> findByTeachingAssistantId(Long teachingAssistantId);

    List<Student> findByCourseCode(String courseCode);
}
