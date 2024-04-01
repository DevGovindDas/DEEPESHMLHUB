package com.metlife.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.engine.jdbc.Size;

@Data
@Entity
@Table(name = "author")
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int authorId;
    @Column
    private String authorName;
    @Column
    private String emailId;
}
