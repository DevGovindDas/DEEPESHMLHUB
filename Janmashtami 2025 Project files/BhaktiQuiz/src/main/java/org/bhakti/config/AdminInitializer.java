package org.bhakti.config;

import lombok.RequiredArgsConstructor;
import org.bhakti.entity.Admin;
import org.bhakti.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class AdminInitializer implements CommandLineRunner {

    private final AdminRepository adminRepository;

    @Value("${admin.initial.id}")
    private String initialAdminId;

    @Value("${admin.initial.name}")
    private String initialAdminName;

    @Value("${admin.initial.password}")
    private String initialAdminPassword;

    @Override
    public void run(String... args) throws Exception {
        if (!adminRepository.existsById(initialAdminId)) {
            Admin initialAdmin = new Admin();
            initialAdmin.setId(initialAdminId);
            initialAdmin.setName(initialAdminName);
            initialAdmin.setPassword(initialAdminPassword);
            adminRepository.save(initialAdmin);
        }
    }
}