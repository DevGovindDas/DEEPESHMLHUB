package org.bhakti.dto;

import lombok.Data;

import java.util.List;

@Data
public class QuizSubmissionRequest {

    private String mobileNumber;
    private String name;
    private int levelCleared;
    private String prizeCode;
    private List<AnsweredQuestionDTO> answers;

    @Data
    public static class AnsweredQuestionDTO {
        private String questionText;
        private String answerText;
        // Getters & Setters
    }

    // Getters and Setters
}
