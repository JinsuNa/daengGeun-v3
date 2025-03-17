package com.project.daeng_geun.dto;

import com.project.daeng_geun.entity.Comment;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CommentDTO {

    private Long commentId;
    private String content;
    private String username; // 작성자 닉네임 or 이메일
    private LocalDateTime createdAt;

    public static CommentDTO fromEntity(Comment comment) {
        return CommentDTO.builder()
                .commentId(comment.getId())
                .content(comment.getContent())
                .username(comment.getUser().getEmail()) // 또는 getUsername()
                .createdAt(comment.getCreatedAt())
                .build();
    }
}
