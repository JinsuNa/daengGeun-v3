package com.project.daeng_geun.service;

import com.project.daeng_geun.dto.PostDTO;
import com.project.daeng_geun.entity.Post;
import com.project.daeng_geun.entity.User;
import com.project.daeng_geun.repository.PostRepository;
import com.project.daeng_geun.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    // 전체 게시글 조회
    public List<PostDTO> getAllPosts() {
        return postRepository.findAll().stream()
                .map(PostDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // 게시글 상세 조회 + 조회수 증가
    public PostDTO getPostById(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));

        post.setViewCount(post.getViewCount() + 1);  // 조회수 증가
        postRepository.save(post);

        return PostDTO.fromEntity(post);
    }

    // 게시글 작성
    public PostDTO createPost(PostDTO postDTO, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        Post post = Post.builder()
                .title(postDTO.getTitle())
                .content(postDTO.getContent())
                .category(postDTO.getCategory())
                .viewCount(0)
                .user(user)
                .build();

        Post savedPost = postRepository.save(post);
        return PostDTO.fromEntity(savedPost);
    }

    // 게시글 수정
    public PostDTO updatePost(Long id, Post postRequest) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));

        post.setTitle(postRequest.getTitle());
        post.setContent(postRequest.getContent());
        post.setCategory(postRequest.getCategory());

        Post updatedPost = postRepository.save(post);
        return PostDTO.fromEntity(updatedPost);
    }

    // 게시글 삭제
    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }

    // 카테고리별 게시글 조회
    public List<PostDTO> getPostsByCategory(String category) {
        return postRepository.findByCategory(category).stream()
                .map(PostDTO::fromEntity)
                .collect(Collectors.toList());
    }
}
