package com.metlife.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Locale;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @Column
    private String name;
    @Column(unique = true)
    private String userName;
    @Column
    private String password;
    @Column
    private String role;
    @Column
    private int wrongPasswordAttempts;
    @Column
    private LocalDateTime lastBlockedTime;
    @Column
    private boolean isLoggedIn;
    @Column
    private String sessionId;
}
