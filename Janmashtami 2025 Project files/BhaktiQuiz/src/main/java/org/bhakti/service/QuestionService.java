package org.bhakti.service;

import lombok.RequiredArgsConstructor;
import org.bhakti.Exception.IdDataInvalidException;
import org.bhakti.Exception.QuestionWithIdExistException;
import org.bhakti.Exception.QuestionWithIdNotExistException;
import org.bhakti.entity.Question;
import org.bhakti.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class QuestionService {

    private final QuestionRepository questionRepository;


    public Question addQuestion(Question question) throws QuestionWithIdExistException, IdDataInvalidException {
        if (question.getId() == null) {
            // Insert the question directly for auto ID generation
            return questionRepository.insert(question);
        } else if (question.getId().isEmpty()) {
            // Throw exception if ID is empty
            throw new IdDataInvalidException("Question ID cannot be empty.");
        } else {
            // Check if the ID already exists
            Question existingQuestion = questionRepository.findById(question.getId()).orElse(null);
            if (existingQuestion != null) {
                throw new QuestionWithIdExistException("Question with ID " + question.getId() + " already exists.");
            }
            // Insert the question with the provided ID
            return questionRepository.insert(question);
        }
    }

    // Add multiple questions
    public List<Question> saveQuestions(List<Question> questions) {
        return questionRepository.saveAll(questions);
    }

    // Update a question by ID
    public Question updateQuestion(String id, Question updatedQuestion) {
        return questionRepository.findById(id).map(existingQuestion -> {
            existingQuestion.setQuestionText(updatedQuestion.getQuestionText());
            existingQuestion.setLevel(updatedQuestion.getLevel());
            existingQuestion.setOptions(updatedQuestion.getOptions());
            existingQuestion.setCorrectOptionIndex(updatedQuestion.getCorrectOptionIndex());
            return questionRepository.save(existingQuestion);
        }).orElseThrow(() -> new RuntimeException("Question not found with ID: " + id));
    }

    // Delete a question by ID
    public void deleteQuestion(String id) {
        questionRepository.deleteById(id);
    }

    // Retrieve all questions
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    // Retrieve a question by ID
    public Question getQuestionById(String id) throws QuestionWithIdNotExistException {
        return questionRepository.findById(id)
                .orElseThrow(() -> new QuestionWithIdNotExistException("Question not found with ID: " + id));
    }

}