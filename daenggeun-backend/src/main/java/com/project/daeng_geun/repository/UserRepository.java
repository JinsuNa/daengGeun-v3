package com.project.daeng_geun.repository;

import com.project.daeng_geun.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
