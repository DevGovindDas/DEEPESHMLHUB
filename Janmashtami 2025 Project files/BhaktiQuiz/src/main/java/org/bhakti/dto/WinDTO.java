package org.bhakti.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bhakti.entity.Win;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "wins")
public class WinDTO {

    private String mobileNumber;
    private String name;
    private List<AnsweredQuestion> questionsAttempted;
    private int levelCleared;
    private String prizeCode;
    private LocalDateTime submittedAt;
    @JsonProperty("isPrizeDispatched")
    private boolean isPrizeDispatched;

    @Data
    @AllArgsConstructor
    public static class AnsweredQuestion {
        private String questionText;
        private String answerText;
        // Getters & Setters
    }

    public WinDTO(Win win) {
        this.mobileNumber = win.getMobileNumber();
        this.name = win.getName();
        this.questionsAttempted = win.getQuestionsAttempted().stream()
                .map(q -> new AnsweredQuestion(q.getQuestionText(), q.getAnswerText()))
                .collect(Collectors.toList());
        this.levelCleared = win.getLevelCleared();
        this.prizeCode = win.getPrizeCode();
        this.submittedAt = win.getSubmittedAt();
        this.isPrizeDispatched = win.isPrizeDispatched();
    }
    // Getters and Setters
}
