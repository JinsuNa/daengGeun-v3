package com.project.daeng_geun.repository;

import com.project.daeng_geun.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    //    Native Query 사용
//    댕근찾기에서 사용할 랜덤 카드 2장 뽑아 오는 코드
    @Query(value = "SELECT * FROM users ORDER BY RAND() LIMIT 2", nativeQuery = true)
    List<User> findRandomUsers();

    //    main페이지에 노출될 like를 받은 top3 댕댕이
    @Query(value = "SELECT * FROM users ORDER BY like_count DESC LIMIT 3", nativeQuery = true)
    List<User> topLikeCount();
}
