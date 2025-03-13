package com.project.daeng_geun.controller;

import com.project.daeng_geun.dto.LoginRequestDTO;
import com.project.daeng_geun.dto.UserDTO;
import com.project.daeng_geun.entity.User;
import com.project.daeng_geun.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    //  회원가입 API
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestPart("user") UserDTO userDTO, @RequestPart(value = "image", required = false) MultipartFile image) {
        return userService.register(userDTO, image);
    }

    // 로그인 API
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequestDTO loginRequest) {
        return userService.login(loginRequest);
    }

    // 모든 사용자 조회
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // 특정 사용자 조회
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // 사용자 정보 수정
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody UserDTO updatedUser) {
        return userService.updateUser(id, updatedUser);
    }

    // 사용자 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        return userService.deleteUser(id);
    }
}
