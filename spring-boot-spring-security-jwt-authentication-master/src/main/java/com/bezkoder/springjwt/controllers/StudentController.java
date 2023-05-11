package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.Student;
import com.bezkoder.springjwt.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    StudentRepository studentRepository;

    @PostMapping
    public Student saveStudent(@RequestBody Student student){
        return studentRepository.save(student);
    }

    @GetMapping
    public List<Student> getAllStudents(){
        return studentRepository.findAll();
    }
}
