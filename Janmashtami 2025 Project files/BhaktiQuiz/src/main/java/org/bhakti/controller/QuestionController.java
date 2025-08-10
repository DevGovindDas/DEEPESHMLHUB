package org.bhakti.controller;

import org.bhakti.Exception.IdDataInvalidException;
import org.bhakti.Exception.QuestionWithIdExistException;
import org.bhakti.Exception.QuestionWithIdNotExistException;
import org.bhakti.entity.Question;
import org.bhakti.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PostMapping("/add")
    public Question addQuestion(@RequestBody Question question) throws QuestionWithIdExistException, IdDataInvalidException {
        return questionService.addQuestion(question);
    }
    @PostMapping
    public List<Question> addQuestions(@RequestBody List<Question> questions) {
        return questionService.saveQuestions(questions);
    }

    @PutMapping("/update/{id}")
    public Question updateQuestion(@PathVariable String id, @RequestBody Question question) {
        return questionService.updateQuestion(id, question);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteQuestion(@PathVariable String id) {
        questionService.deleteQuestion(id);
    }

    @GetMapping("/getAll")
    public List<Question> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    @GetMapping("/get/{id}")
    public Question getQuestionById(@PathVariable String id) throws QuestionWithIdNotExistException {
        return questionService.getQuestionById(id);
    }
}