package org.bhakti.entity;

import lombok.Data;

import java.util.List;

@Data
public class QuizQuestions {
    private List<Question> level1Questions;
    private List<Question> level2Questions;
    private List<Question> level3Questions;
}
