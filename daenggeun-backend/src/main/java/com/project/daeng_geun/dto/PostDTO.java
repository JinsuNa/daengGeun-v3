package com.project.daeng_geun.dto;

import com.project.daeng_geun.entity.Post;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PostDTO {

    private Long postId;
    private String title;
    private String content;
    private String category;

    private int viewCount;    // 조회수 추가
    private int commentCount; // 댓글 수 추가

    public static PostDTO fromEntity(Post post) {
        return PostDTO.builder()
                .postId(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .category(post.getCategory())
                .viewCount(post.getViewCount())      //
                .commentCount(post.getComments().size())  // 댓글 리스트 개수 반환
                .build();
    }
}