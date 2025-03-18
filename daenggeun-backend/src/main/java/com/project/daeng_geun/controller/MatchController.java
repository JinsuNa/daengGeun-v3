package com.project.daeng_geun.controller;

import com.project.daeng_geun.dto.ChatDTO;
import com.project.daeng_geun.dto.MatchDTO;
import com.project.daeng_geun.entity.Match;
import com.project.daeng_geun.entity.User;
import com.project.daeng_geun.repository.MatchRepository;
import com.project.daeng_geun.repository.UserRepository;
import com.project.daeng_geun.service.MatchService;
import com.project.daeng_geun.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/match")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3000")
public class MatchController {
    private final MatchService matchService;
    private final UserService userService;
    private final MatchRepository matchRepository;
    private final UserRepository userRepository;

    @GetMapping("/random")
    public ResponseEntity<List<MatchDTO>> getRandomUsers() {
        List<MatchDTO> users = matchService.getRandomUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/like/{id}")
    public MatchDTO likeCount(@PathVariable("id") Long id) {
        return matchService.likeCount(id);
    }

    @GetMapping("/like/{id}")
    public MatchDTO getLike(@PathVariable("id") Long id) {
        return matchService.getLike(id);
    }

    @GetMapping("/top-liked")
    public ResponseEntity<List<MatchDTO>> getTopLikeCount() {
        List<MatchDTO> topDogs = matchService.getTopLikeCount();
        return ResponseEntity.ok(topDogs);
    }

    //    채팅 controlelr
    @GetMapping("/{sendId}/{receiverId}")
    public List<ChatDTO> getChatHistory(@PathVariable("sendId") Long senderId, @PathVariable("receiverId") Long receiverId) {
        User sender = userRepository.findById(senderId).orElse(null);
        User receiver = userRepository.findById(receiverId).orElse(null);

        if (sender == null || receiver == null) {
            log.warn("발신자 또는 사용자가 존재하지 않습니다.");
            return List.of();
        }
        log.info("채팅 내역 조회: {} ↔ {}", senderId, receiverId);
        return matchRepository.findBySenderAndReceiverOrderByCreatedAtAsc(sender, receiver)
                .stream()
                .map(ChatDTO::fromEntity) // 🚀 ChatDTO로 변환하여 응답
                .toList();
    }
}
