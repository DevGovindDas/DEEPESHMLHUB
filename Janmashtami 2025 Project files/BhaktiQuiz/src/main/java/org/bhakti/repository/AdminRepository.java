package org.bhakti.repository;

import org.bhakti.entity.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends MongoRepository<Admin, String> {
    Optional<Admin> findByNameAndPassword(String name, String mobileNumber);
    Optional<Admin> findByName(String name);
}
