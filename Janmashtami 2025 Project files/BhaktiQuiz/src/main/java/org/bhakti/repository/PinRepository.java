package org.bhakti.repository;

import org.bhakti.entity.Pin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PinRepository extends MongoRepository<Pin, String> {
    // Additional query methods can be defined here if needed
}
