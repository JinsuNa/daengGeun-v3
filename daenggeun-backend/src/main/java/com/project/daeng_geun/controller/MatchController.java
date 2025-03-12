package com.project.daeng_geun.controller;

import com.project.daeng_geun.dto.MatchDTO;
import com.project.daeng_geun.entity.User;
import com.project.daeng_geun.service.MatchService;
import com.project.daeng_geun.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/match")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3000")
public class MatchController {
    private final MatchService matchService;
    private final UserService userService;

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
}
