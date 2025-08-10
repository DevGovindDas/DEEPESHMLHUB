package org.bhakti.controller;

import lombok.RequiredArgsConstructor;
import org.bhakti.Exception.PinNotSetException;
import org.bhakti.dto.QuizSubmissionRequest;
import org.bhakti.dto.WinDTO;
import org.bhakti.entity.Pin;
import org.bhakti.entity.QuizQuestions;
import org.bhakti.entity.Win;
import org.bhakti.service.QuizService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/quiz")
@CrossOrigin(origins = {"http://localhost:5173", "http://192.168.31.37:5173"})
public class QuizController {

    private final QuizService quizService;

    // Load all questions for all levels after PIN verification

    // Submit final quiz results with win details
    @PostMapping("/submit")
    public WinDTO submitQuiz(@RequestBody QuizSubmissionRequest request, @RequestHeader("pin") String pin) throws PinNotSetException {
        return quizService.submitFinalQuiz(request, pin);
    }

    @PostMapping("/questions")
    public QuizQuestions getQuiZQuestions(@RequestBody Pin pin) throws PinNotSetException {
        return quizService.getAllQuestionsGroupedByLevel(pin);
    }

    // Reset the PIN with a random 4-digit text
    @GetMapping("/resetPin")
    public void resetPin() {
        quizService.resetPin();
    }

    // Get the PIN from the 0th document
    @GetMapping("/getPin")
    public String getPin() throws PinNotSetException {
        return quizService.getPin();
    }

    @GetMapping("/winInRange")
    public List<WinDTO> getWinsInTimeRange(
            @RequestParam("lapsedMinutes") String lapsedMinutes,
            @RequestParam(value = "mobileNumber", required = false) String mobileNumber) {
        LocalDateTime startTime = LocalDateTime.now().minusMinutes(Long.parseLong(lapsedMinutes));
        LocalDateTime endTime = LocalDateTime.now();
        List<WinDTO> res=quizService.getWinsInTimeRangeAndMobileNumber(startTime, endTime, mobileNumber);
        System.out.println(res);
        return res;
    }

    @GetMapping("/dispatchPrize/{prizeCode}")
    public Boolean dispatchPrize(@PathVariable String prizeCode) {
        return quizService.dispatchPrize(prizeCode);
    }
}
