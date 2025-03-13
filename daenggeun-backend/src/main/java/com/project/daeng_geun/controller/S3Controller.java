package com.project.daeng_geun.controller;

import com.project.daeng_geun.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/s3")  // 경로 변경 (S3 관련 API는 /api/s3 가 적절)
@RequiredArgsConstructor
public class S3Controller {
    private final S3Service s3Service;

    // Presigned URL 요청 API (GET 요청)
    @GetMapping("/presigned-url")
    public ResponseEntity<String> getPresignedUrl(@RequestParam String fileName) {
        //  파일명 검증 (불필요한 문자 제거)
        if (fileName == null || fileName.isBlank()) {
            return ResponseEntity.badRequest().body("파일명이 필요합니다.");
        }

        // Presigned URL 발급
        String presignedUrl = s3Service.createPresignedUrl(fileName);
        return ResponseEntity.ok(presignedUrl);
    }
}
