package org.bhakti.entity;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Data
@Document(collection="questions")
public class Question {
    @Id
    private String id;
    private int level;
    private String questionText;
    private List<String> options;
    private int correctOptionIndex;
}