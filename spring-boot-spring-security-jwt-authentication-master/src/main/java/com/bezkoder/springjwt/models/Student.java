package com.bezkoder.springjwt.models;

import net.bytebuddy.dynamic.loading.InjectionClassLoader;

import javax.persistence.*;

@Entity
@Table(name = "student",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "firstName"),
            @UniqueConstraint(columnNames = "lastName")
    }
)
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    public String firstName;
    public String lastName;
    public int age;

    public Student() {
    }

    public Student(Long id,String firstName, String lastName, int age) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
}
