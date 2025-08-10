package org.bhakti.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "wins")
public class Win {

    @Id
    private String id;
    private String mobileNumber;
    private String name;
    private List<AnsweredQuestion> questionsAttempted;
    private int levelCleared;
    private String prizeCode;
    private boolean isPrizeDispatched=false;
    private LocalDateTime submittedAt;

    @Data
    @AllArgsConstructor
    public static class AnsweredQuestion {
        private String questionText;
        private String answerText;
        // Getters & Setters
    }

    // Getters and Setters
}
