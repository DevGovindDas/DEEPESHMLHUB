package org.bhakti.repository;

import org.bhakti.entity.Win;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface WinRepository extends MongoRepository<Win, String> {
    List<Win> findBySubmittedAtBetween(LocalDateTime startTime, LocalDateTime endTime);

    List<Win> findBySubmittedAtBetweenAndMobileNumber(LocalDateTime startTime, LocalDateTime endTime, String mobileNumber);
    Win findByPrizeCode(String prizeCode);
}