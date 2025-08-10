package org.bhakti.service;

import lombok.RequiredArgsConstructor;
import org.bhakti.Exception.PinNotSetException;
import org.bhakti.dto.QuizSubmissionRequest;
import org.bhakti.dto.WinDTO;
import org.bhakti.entity.Pin;
import org.bhakti.entity.Question;
import org.bhakti.entity.QuizQuestions;
import org.bhakti.entity.Win;
import org.bhakti.entity.Win.AnsweredQuestion;
import org.bhakti.repository.PinRepository;
import org.bhakti.repository.QuestionRepository;
import org.bhakti.repository.WinRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class QuizService {


    private final QuestionRepository questionRepository;


    private final WinRepository winRepository;


    private final PinRepository pinRepository;

    public QuizQuestions getAllQuestionsGroupedByLevel(Pin pin) throws PinNotSetException {
        if (verifyPin(pin)) {
            List<Question> allQuestions = questionRepository.findAll();
            Map<Integer, List<Question>> questionsByLevel = new HashMap<>();

            for (Question question : allQuestions) {
                questionsByLevel
                        .computeIfAbsent(question.getLevel(), k -> new java.util.ArrayList<>())
                        .add(question);
            }

            QuizQuestions quizQuestions = new QuizQuestions();

            // Shuffle and select random questions for each level
            List<Question> level1Questions = questionsByLevel.getOrDefault(1, java.util.Collections.emptyList());
            List<Question> level2Questions = questionsByLevel.getOrDefault(2, java.util.Collections.emptyList());
            List<Question> level3Questions = questionsByLevel.getOrDefault(3, java.util.Collections.emptyList());

            quizQuestions.setLevel1Questions(getRandomQuestions(level1Questions, 3));
            quizQuestions.setLevel2Questions(getRandomQuestions(level2Questions, 2));
            quizQuestions.setLevel3Questions(getRandomQuestions(level3Questions, 1));

            return quizQuestions;
        } else {
            throw new PinNotSetException("Pin verification failed");
        }
    }

    // Helper method to get random questions
    private List<Question> getRandomQuestions(List<Question> questions, int count) {
        if (questions.size() <= count) {
            return questions; // Return all questions if the list size is less than or equal to count
        }
        Collections.shuffle(questions); // Shuffle the list
        return questions.subList(0, count); // Select the first 'count' questions
    }

    public WinDTO submitFinalQuiz(QuizSubmissionRequest request, String pin) throws PinNotSetException {
        if(verifyPin(new Pin("1", pin))) { // Assuming "1" is the ID for the PIN document
            Win win = new Win();
            win.setMobileNumber(request.getMobileNumber());

            // Map AnsweredQuestionDTO to AnsweredQuestion
            List<AnsweredQuestion> answeredQuestions = request.getAnswers().stream()
                    .map(dto -> new AnsweredQuestion(dto.getQuestionText(), dto.getAnswerText()))
                    .collect(Collectors.toList());
            win.setQuestionsAttempted(answeredQuestions);
            win.setName(request.getName());
            win.setLevelCleared(request.getLevelCleared());
            win.setPrizeCode(request.getPrizeCode());
            win.setPrizeDispatched(false); // Assuming the prize is not dispatched initially
            win.setSubmittedAt(LocalDateTime.now()); // Sets the current timestamp); // Sets the current timestamp // Ensure `setTimestamp` exists in `Win`
            winRepository.save(win);
            return new WinDTO(win);
        } else {
            throw new PinNotSetException("Pin verification failed");
        }

    }

    public List<WinDTO> getWinsInTimeRangeAndMobileNumber(LocalDateTime startTime, LocalDateTime endTime, String mobileNumber) {
        if (mobileNumber == null || mobileNumber.isEmpty()) {
            return winRepository.findBySubmittedAtBetween(startTime, endTime).stream()
                    .map(WinDTO::new)
                    .collect(Collectors.toList());
        }
        return winRepository.findBySubmittedAtBetweenAndMobileNumber(startTime, endTime, mobileNumber).stream().map(WinDTO::new)
                .collect(Collectors.toList());
    }

    public Boolean verifyPin(Pin pin) throws PinNotSetException {
        String actualPin= pinRepository.findById("1")
                .orElseThrow(() -> new PinNotSetException("Pin not set"))
                .getPinValue(); // Ensure `getPinValue` exists in `Pin`
        if (pin.getPinText().equalsIgnoreCase(actualPin)){
            return true;
        } else {
            throw new PinNotSetException("Pin verification failed");
        }
    }

    public void resetPin() {
        String randomPin = String.format("%04d", new Random().nextInt(10000)); // Generate random 4-digit PIN
        Pin pin = pinRepository.findById("1").orElse(new Pin("1", randomPin)); // Fetch or create the 0th document
        pin.setPinText(randomPin); // Update the PIN value
        pinRepository.save(pin); // Save the updated PIN

    }

    public String getPin() throws PinNotSetException {
        return pinRepository.findById("1")
                .orElseThrow(() -> new PinNotSetException("Pin not set"))
                .getPinValue(); // Retrieve the PIN value from the 0th document
    }


    public Boolean dispatchPrize(String prizeCode) {
        Win win = winRepository.findByPrizeCode(prizeCode);
        if (win != null) {
            win.setPrizeDispatched(true); // Assuming you have a field to mark the prize as dispatched
            winRepository.save(win);
            return true; // Prize successfully dispatched
        }
        return false; // No win found with the given prize code
    }
}