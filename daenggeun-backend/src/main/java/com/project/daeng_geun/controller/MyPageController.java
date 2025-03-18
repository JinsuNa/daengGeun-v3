package com.project.daeng_geun.controller;

import com.project.daeng_geun.dto.UserDTO;
import com.project.daeng_geun.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
public class MyPageController {

    private final MyPageService myPageService;

    // 🔹 내 정보 조회
    @GetMapping("/{userId}")
    public ResponseEntity<UserDTO> getMyProfile(@PathVariable Long userId) {
        return ResponseEntity.ok(myPageService.getMyProfile(userId));
    }

    // 🔹 내 정보 수정
    @PutMapping("/{userId}")
    public ResponseEntity<UserDTO> updateMyProfile(@PathVariable Long userId, @RequestBody UserDTO updatedUser) {
        return ResponseEntity.ok(myPageService.updateMyProfile(userId, updatedUser));
    }

    // 🔹 반려견 정보 수정
    @PutMapping("/{userId}/pet")
    public ResponseEntity<UserDTO> updatePetInfo(@PathVariable Long userId, @RequestBody UserDTO updatedUser) {
        return ResponseEntity.ok(myPageService.updatePetInfo(userId, updatedUser));
    }
}
