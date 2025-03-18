package com.project.daeng_geun.repository;

import com.project.daeng_geun.entity.Match;
import com.project.daeng_geun.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;


public interface MatchRepository extends JpaRepository<Match, Long> {
    List<Match> findBySenderAndReceiverOrderByCreatedAtAsc(User Sender, User receiver);
}
